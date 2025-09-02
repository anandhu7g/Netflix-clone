import { useState } from "react";
import heroImg from "../assets/netflix-hero.jpg";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add signup logic here
    alert("Signup submitted!");
  };

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{
        minHeight: "100vh",
        background: `url(${heroImg}) center/cover no-repeat`,
        position:"relative",
      }}
    >
      <style>
        {`
          input::placeholder {
            color: #b3b3b3 !important; 
            opacity: 1 !important; 
            font-size: 17px  
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
            Sign In
          </h1>
          {error && <p className="text-danger mb-3">{error}</p>}

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              className="form-control form-control-lg bg-transparent text-light"
              id="email"
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
          <div className="mb-3">
            <input
              type="password"
              className="form-control form-control-lg bg-transparent text-light"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                borderRadius: "5px",
                height: "60px",
                border: "1px solid #7a7676ff",
              }}
            />
          </div>

          {/* Sign In button */}
          <button
            type="submit"
            className="btn btn-lg w-100"
            style={{
              fontWeight: "bold",
              backgroundColor: "#e50914",
              color: "white",
            }}
          >
            Sign In
          </button>

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
            <a href="/forgot-password" style={{ color: "white", fontSize: "19px" }}>
              Forgot password?
            </a>
          </div>

          {/* Remember me + Signup */}
          <div className="d-flex flex-column text-secondary gap-3 mt-5">
            <div style={{ color: "white" }}>
              <input type="checkbox" id="rememberMe" defaultChecked />{" "}
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <div>
              New to Netflix?{" "}
              <a
                href="/signup"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Sign up now.
              </a>
            </div>
            {/* reCAPTCHA note */}
            <p className="text-secondary" style={{ fontSize: "13px" }}>
              This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
              <a href="#" style={{ color: "#0071eb" }}>
                Learn more.
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* Footer Section */}
      <footer
        className="text-secondary py-4 px-5 mt-5"
        style={{ backgroundColor: "rgba(32, 30, 30, 1)", zIndex: 2 }}
      >
        <p className="mb-3" style={{ color:"#afb1b2ff"}}>
          Questions? Call{" "}
          <a href="tel:000-800-919-1743" style={{ color: "inherit" }}>
            000-800-919-1743
          </a>{" "}
          (Toll-Free)
        </p>
        <div className="row">
          <div className="col-6 col-md-3 mb-2">
            <a href="#" style={{ color:"#afb1b2ff"}}>FAQ</a>
          </div>
          <div className="col-6 col-md-3 mb-2">
            <a href="#" style={{ color:"#afb1b2ff"}}>Help Centre</a>
          </div>
          <div className="col-6 col-md-3 mb-2">
            <a href="#" style={{ color:"#afb1b2ff"}}>Terms of Use</a>
          </div>
          <div className="col-6 col-md-3 mb-2">
            <a href="#" style={{ color:"#afb1b2ff"}}>Privacy</a>
          </div>
          <div className="col-6 col-md-3 mb-2">
            <a href="#" style={{ color:"#afb1b2ff"}}>Cookie Preferences</a>
          </div>
          <div className="col-6 col-md-3 mb-2">
            <a href="#" style={{ color:"#afb1b2ff"}}>Corporate Information</a>
          </div>
        </div>

        {/* Language selector */}
        <div className="mt-3">
          <select
            className="form-select bg-transparent text-secondary"
            style={{ width: "150px"}}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>
      </footer>
    </div>
  );
}

export default SignIn;
