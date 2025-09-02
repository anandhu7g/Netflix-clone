import React from "react";
import { useTranslation } from "react-i18next";

function FooterSection() {
  const { t, i18n } = useTranslation();
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };
  return (
    <footer className="footer-section py-5">
      <style>
        {`
          .footer-section {
            background: #000;
            color: #757575;
            font-size: 14px;
          }

          .footer-top {
            margin-bottom: 20px;
          }

          .footer-links {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
            margin-bottom: 20px;
          }

          .footer-links a {
            color: #757575;
            text-decoration: none;
          }

          .footer-links a:hover {
            text-decoration: underline;
          }

          .language-select {
            background: transparent;
            border: 1px solid #757575;
            color: #757575;
            padding: 5px 10px;
            border-radius: 3px;
            margin-top: 10px;
          }

          .footer-input {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
          }

          .footer-input input {
            flex: 1;
            padding: 8px;
            border: 1px solid #757575;
            border-radius: 3px;
            background: #111;
            color: #fff;
          }

          .footer-input button {
            padding: 8px 15px;
            background: #e50914;
            border: none;
            border-radius: 3px;
            color: #fff;
            cursor: pointer;
          }

          .footer-input button:hover {
            background: #f6121d;
          }

          .footer-bottom {
            margin-top: 20px;
            font-size: 13px;
          }
        `}
      </style>

    <div className="container">
        <div className="footer-wrapper" style={{
            display: "flex",
            flexDirection: "column",  
            alignItems: "center",      
            justifyContent: "center", 
            }}>
      <p style={{ marginTop: "1rem", fontSize: "1.1rem", color:"white" }}>
        {t("footerReady")}
      </p>
            <div className="footer-input">
        <input type="email" placeholder={t("emailPlaceholder")} style={{ maxWidth: "300px", borderRadius: "5px", marginRight: "10px", height:"60px",
          border: "1px solid #7a7676ff", padding:"20px", fontSize: "18px", marginBottom:"4rem"
          }} />
        <button
          type="submit"
          className="btn btn-danger btn-lg"
          style={{ borderRadius: "5px", fontWeight: "bold", height:"60px", }}
        >
          {t("getStarted")}
        </button>
            </div>
        </div>
        <div className="footer-top" style={{ fontSize: "1.1rem" }}>
          {t("footerQuestions")} <a href="tel:000-800-919-1743">000-800-919-1743</a>
        </div>

        <div className="footer-links" style={{ fontSize: "1rem", }}>
          <a href="#">{t("footerLinks.faq")}</a>
          <a href="#">{t("footerLinks.account")}</a>
          <a href="#">{t("footerLinks.investor")}</a>
          <a href="#">{t("footerLinks.ways")}</a>
          <a href="#">{t("footerLinks.privacy")}</a>
          <a href="#">{t("footerLinks.corporate")}</a>
          <a href="#">{t("footerLinks.speed")}</a>
          <a href="#">{t("footerLinks.only")}</a>
          <a href="#">{t("footerLinks.help")}</a>
          <a href="#">{t("footerLinks.media")}</a>
          <a href="#">{t("footerLinks.jobs")}</a>
          <a href="#">{t("footerLinks.terms")}</a>
          <a href="#">{t("footerLinks.cookie")}</a>
          <a href="#">{t("footerLinks.contact")}</a>
          <a href="#">{t("footerLinks.legal")}</a>
        </div>

        <select className="language-select" value={i18n.language} onChange={handleLanguageChange}>
          <option value="en">{t("english")}</option>
          <option value="hi">{t("hindi")}</option>
        </select>

  <div className="footer-bottom mt-3" style={{ fontSize: "1rem"}}>{t("footerIndia")}</div>
      </div>
    </footer>
  );
}

export default FooterSection;
