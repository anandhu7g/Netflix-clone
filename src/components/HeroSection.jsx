import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import heroImg from "../assets/netflix-hero.jpg";


function HeroSection() {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  return (
    <section
      className="hero-section d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        minHeight: "80vh",
        width: "100%",
        position: "relative",
        color: "#fff",
        background: `url(${heroImg}) center/cover no-repeat`,
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.75)",
        zIndex: 1
      }}></div>
      <div className="hero-content p-4" style={{ zIndex: 2, position: "relative" }}>
        <h1 style={{ fontWeight: "bold", fontSize: "2.8rem" }}>
          {t("navbarTitle")}
        </h1>
        <h3 style={{ fontWeight: "normal", marginTop: "1rem", fontSize: "1.5rem" }}>
          {t("navbarSubtitle")}
        </h3>
        <p style={{ marginTop: "1.5rem", fontSize: "1.1rem" }}>
          {t("navbarDesc")}
        </p>
        <form
          className="d-flex justify-content-center align-items-center mt-3"
          style={{ maxWidth: "500px", margin: "0 auto" }}
          onSubmit={e => e.preventDefault()}
        >
          <input
            type="email"
            className="form-control form-control-lg"
            placeholder={t("emailPlaceholder") || "Email address"}
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ maxWidth: "300px", borderRadius: "0", marginRight: "10px" }}
            required
          />
          <button
            type="submit"
            className="btn btn-danger btn-lg"
            style={{ borderRadius: "0", fontWeight: "bold" }}
          >
            {t("getStarted")}
          </button>
        </form>
      </div>
      {/* SVG Curve with Red Gradient Stroke */}
      <svg
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "60px",
          zIndex: 2,
        }}
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="redCurveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(229,9,20,0)" />
            <stop offset="50%" stopColor="#e50914" />
            <stop offset="100%" stopColor="rgba(229,9,20,0)" />
          </linearGradient>

          <radialGradient id="centerSpread" cx="50%" cy="0%" r="180%">
            <stop offset="0%" stopColor="#0b2169ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
          </radialGradient>

          <linearGradient id="downFade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="black" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Dark gradient fill under curve */}
        <path
          d="M0,10 Q50,0 100,10 L100,10 L100,10 L0,10 Z"
          fill="url(#centerSpread)"
        />
        <path
          d="M0,10 Q50,0 100,10 L100,10 L100,10 L0,10 Z"
          fill="url(#downFade)"
        />

        {/* Red curve stroke (unchanged) */}
        <path
          d="M0,10 Q50,0 100,10"
          stroke="url(#redCurveGradient)"
          strokeWidth="0.8"
          fill="none"
        />
      </svg>
    </section>
  );
}

export default HeroSection;
