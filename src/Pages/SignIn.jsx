import { useState } from "react";
import heroImg from "../assets/netflix-hero.jpg";
import { Eye, EyeOff } from "lucide-react";

function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false); // toggle state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // only for signup
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      // --- Signup ---
      try {
        // 1. Check if passwords match
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          return;
        }

        // 2. Get existing users
        const resUsers = await fetch("http://localhost:5000/users");
        const users = await resUsers.json();

        // 3. Check if email already exists
        const emailExists = users.some((u) => u.email === email);
        if (emailExists) {
          setError("Email already registered. Please sign in.");
          return;
        }

        // 4. Generate next numeric ID
        const newId =
          users.length > 0 ? Math.max(...users.map((u) => Number(u.id))) + 1 : 1;

        // 5. Create new user object
        const newUser = { id: newId, name, email, password };

        // 6. Save to db.json
        const res = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        if (res.ok) {
          setError("");
          localStorage.setItem("user", JSON.stringify(newUser));
          alert("User registered successfully!");
          setIsSignUp(false);
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setName("");
        } else {
          setError("Could not sign up. Try again.");
        }
      } catch (err) {
        console.error(err);
        setError("Server error. Try again later.");
      }
    } else {
      // --- Signin ---
      try {
        // 1. Get users
        const resUsers = await fetch("http://localhost:5000/users");
        const users = await resUsers.json();

        // 2. Find user with matching email & password
        const foundUser = users.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          setError(""); // clear error on success
          localStorage.setItem("user", JSON.stringify(foundUser));
          window.location.href = "/Dashboard";
        } else {
          setError("Invalid email or password");
        }
      } catch (err) {
        console.error(err);
        setError("Server error. Try again later.");
      }
    }
};

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{
        minHeight: "100vh",
        background: `url(${heroImg}) center/cover no-repeat`,
        position: "relative",
      }}
    >
      <style>
        {`
          input::placeholder {
            color: #b3b3b3 !important; 
            opacity: 1 !important; 
            font-size: 17px;  
          }
        /* 🔧 Fix Chrome autofill background */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
          -webkit-text-fill-color: #fff !important;
          caret-color: #fff !important;
          transition: background-color 5000s ease-in-out 0s; 
        }
          a:hover {
            text-decoration: underline;
          }
        `}
      </style>

      {/* Background Overlay */}
      <div
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

      {/* Form */}
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

          {/* Signup extra field */}
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
                padding: "15px 45px 15px 15px", // extra space on right for icon
                background: "transparent",
                border: "1px solid #7a7676ff",
                borderRadius: "4px",
                color: "white",
                fontSize: "17px",
                lineHeight: "1.5",
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)", // ✅ keeps it centered
                cursor: "pointer",
                color: "#aaa",
                fontSize: "20px", // adjust size as needed
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

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

          {/* Submit Button */}
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

          {/* Show only in Sign In mode */}
          {!isSignUp && (
            <>
              {/* Divider */}
              <div className="text-center my-3">OR</div>

              {/* Sign-in code button */}
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

              {/* Forgot password */}
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

          {/* Remember me + Toggle Signup/Signin link */}
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

            {/* reCAPTCHA note */}
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
    </div>
  );
}

export default SignIn;


