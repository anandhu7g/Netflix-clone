import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import heroImg from "../assets/netflix-hero.jpg";
import { useNavigate } from "react-router-dom";
import EmailForm from "./EmailForm";

function HeroSection() {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter a valid email");
      return;
    }
    navigate("/signin", { state: { mode: "signup", email } });
  };

  return (
    <section
      className="hero-section d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        color: "#fff",
        background: `url(${heroImg}) center/cover no-repeat`,
        overflow: "hidden",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.78)",
          zIndex: 1,
        }}
      ></div>

      {/* Content */}
      <div className="hero-content p-4">
        <h1 className="hero-title">{t("navbarTitle")}</h1>
        <h3 className="hero-subtitle">{t("navbarSubtitle")}</h3>
        <p className="hero-desc">{t("navbarDesc")}</p>

        <EmailForm
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("emailPlaceholder") || "Email address"}
          buttonText={t("getStarted")}
          onSubmit={handleSubmit}
        />
      </div>

      {/* SVG Curve */}
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

        <path
          d="M0,10 Q50,0 100,10 L100,10 L100,10 L0,10 Z"
          fill="url(#centerSpread)"
        />
        <path
          d="M0,10 Q50,0 100,10 L100,10 L100,10 L0,10 Z"
          fill="url(#downFade)"
        />
        <path
          d="M0,10 Q50,0 100,10"
          stroke="url(#redCurveGradient)"
          strokeWidth="0.8"
          fill="none"
        />
      </svg>

      {/* Responsive styles */}
      <style jsx>
      {`
        .hero-content {
          z-index: 2;
          position: relative;
          width: 55%;
          max-width: 600px;
        }

        .hero-title {
          font-weight: 900 !important;
          font-size: 3.2rem !important;
        }
        .hero-subtitle {
          font-weight: normal;
          margin-top: 1rem;
          font-size: 1.5rem;
        }
        .hero-desc {
          margin-top: 1.5rem;
          font-size: 1.1rem;
        }

        @media (max-width: 992px) {
          .hero-content {
            width: 55% !important;
          }
          .hero-title {
            font-weight: 650 !important;
            font-size: 2.2rem !important;
          }
          .hero-subtitle {
            font-size: 1.3rem !important;
          }
          .hero-desc {
            font-size: 1rem !important;
          }
        }

        @media (max-width: 768px) {
          .hero-section{
            width: 100% !important;
            padding: 0px;
            min-height: 75vh !important;
          }
          .hero-content {
            width: 70% !important;
            padding: 0px !important;
            margin: 0px !important;
          }
          .hero-title {
            font-size: 2rem !important;
          }
          .hero-subtitle {
            font-size: 1.2rem !important;
          }
          .hero-desc {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .hero-content {
            width: 80% !important;
          }
          .hero-title {
            font-size: 1.8rem !important;
          }
          .hero-subtitle {
            font-size: 1rem !important;
          }
          .hero-desc {
            font-size: 0.85rem !important;
          }
        }
      `}</style>
    </section>
  );
}

export default HeroSection;



