import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import heroImg from "../assets/netflix-hero.jpg";
import { Eye, EyeOff } from "lucide-react";
import { api } from "../api";

function SignIn() {
  const location = useLocation();

  // ---------------- STATE ----------------
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // ---------------- PREFILL (from redirect) ----------------
  useEffect(() => {
    if (location.state) {
      const { mode, email: prefillEmail } = location.state;
      if (mode === "signup") setIsSignUp(true);
      if (prefillEmail) setEmail(prefillEmail);
    }
  }, [location.state]);

  // ---------------- SUBMIT HANDLER ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isSignUp) {
      // SIGN UP FLOW
      try {
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          return;
        }

        // 1. Fetch users
        console.log("API base URL:", api.defaults.baseURL);
        const resUsers = await api.get("/users");
        const users = resUsers.data;

        // 2. Check duplicate
        if (users.some((u) => u.email === email)) {
          setError("Email already registered. Please sign in.");
          return;
        }

        // 3. Create new user
        const newUser = { name, email, password };
        const res = await api.post("/users", newUser);
        const savedUser = res.data;

        localStorage.setItem("user", JSON.stringify(savedUser));
        alert("User registered successfully!");
        setIsSignUp(false);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setName("");
      } catch (err) {
        console.error("Signup error:", err);
        if (err.response) {
          console.error("Response:", err.response.status, err.response.data);
        }
        setError("Server error. Try again later.");
      }
    } else {
      // SIGN IN FLOW
      try {
        console.log("API base URL:", api.defaults.baseURL);
        const resUsers = await api.get("/users");
        const users = resUsers.data;

        const foundUser = users.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          localStorage.setItem("user", JSON.stringify(foundUser));
          window.location.href = "/Dashboard";
        } else {
          setError("Invalid email or password");
        }
      } catch (err) {
        console.error("Signin error:", err);
        if (err.response) {
          console.error("Response:", err.response.status, err.response.data);
        } else if (err.request) {
          console.error("No response received:", err.request);
        }
        setError("Server error. Try again later.");
      }
    }
  };

  // ---------------- RENDER ----------------
  return (
    <div
      className="signup-content d-flex flex-column justify-content-between signin-container"
      style={{
        minHeight: "100vh",
        background: `url(${heroImg}) center/cover no-repeat`,
        position: "relative",
      }}
    >
      {/* Background Overlay */}
      <div
        className="signin-overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.70)",
          zIndex: 1,
        }}
      ></div>

      {/* FORM */}
      <div
        className="d-flex justify-content-center align-items-center flex-grow-1"
        style={{ zIndex: 2 }}
      >
        <form
          onSubmit={handleSubmit}
          className="p-5 rounded shadow text-light"
          style={{
            minWidth: "350px",
            maxWidth: "500px",
            width: "100%",
            background: "rgba(0,0,0,0.75)",
            zIndex: 2,
            position: "relative",
            marginTop: "80px",
          }}
        >
          <h1 className="mb-4" style={{ fontWeight: "bold" }}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </h1>

          {error && <p className="text-danger mb-3">{error}</p>}

          {/* SIGN UP extra field */}
          {isSignUp && (
            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg bg-transparent text-light"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  borderRadius: "5px",
                  height: "60px",
                  border: "1px solid #7a7676ff",
                }}
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              className="form-control form-control-lg bg-transparent text-light"
              placeholder="Email or mobile number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                borderRadius: "5px",
                height: "60px",
                border: "1px solid #7a7676ff",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ position: "relative", marginBottom: "15px" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "15px 45px 15px 15px",
                background: "transparent",
                border: "1px solid #7a7676ff",
                borderRadius: "4px",
                color: "white",
                fontSize: "17px",
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#aaa",
                fontSize: "20px",
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* Confirm Password */}
          {isSignUp && (
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "15px",
                marginBottom: "15px",
                background: "transparent",
                border: "1px solid #7a7676ff",
                borderRadius: "4px",
                color: "white",
                fontSize: "17px",
              }}
            />
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-lg w-100"
            style={{
              fontWeight: "bold",
              backgroundColor: "#e50914",
              color: "white",
            }}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>

          {/* Only Sign In extras */}
          {!isSignUp && (
            <>
              <div className="text-center my-3">OR</div>
              <button
                type="button"
                className="btn btn-lg w-100 mb-3"
                style={{
                  backgroundColor: "rgba(109,109,110,0.6)",
                  color: "white",
                  fontSize: "19px",
                  fontWeight: "bold",
                }}
              >
                Use a sign-in code
              </button>
              <div className="text-center mb-3">
                <a
                  href="/forgot-password"
                  style={{ color: "white", fontSize: "19px" }}
                >
                  Forgot password?
                </a>
              </div>
            </>
          )}

          {/* Remember + Toggle Signin/Signup */}
          <div className="d-flex flex-column text-secondary gap-3 mt-5">
            {!isSignUp && (
              <div style={{ color: "white" }}>
                <input type="checkbox" id="rememberMe" defaultChecked />{" "}
                <label htmlFor="rememberMe">Remember me</label>
              </div>
            )}

            <div>
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSignUp(false);
                      setError("");
                      setEmail("");
                      setPassword("");
                      setName("");
                    }}
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      textDecoration: "none",
                    }}
                  >
                    Sign in now.
                  </a>
                </>
              ) : (
                <>
                  New to Netflix?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSignUp(true);
                      setError("");
                      setEmail("");
                      setPassword("");
                      setName("");
                    }}
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      textDecoration: "none",
                    }}
                  >
                    Sign up now.
                  </a>
                </>
              )}
            </div>

            <p className="text-secondary" style={{ fontSize: "13px" }}>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.{" "}
              <a href="#" style={{ color: "#0071eb" }}>
                Learn more.
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* Inline Styles */}
      <style>
        {`
          input::placeholder {
            color: #b3b3b3 !important; 
            opacity: 1 !important; 
            font-size: 17px;  
          }
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
            -webkit-text-fill-color: #fff !important;
            caret-color: #fff !important;
            transition: background-color 5000s ease-in-out 0s; 
          }
          a:hover { text-decoration: underline; }
          @media (max-width: 600px) {
            .signin-container { background: #000 !important; }
            .signin-overlay { display: none !important; }
          }
        `}
      </style>
    </div>
  );
}

export default SignIn;



