import React from "react";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

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
            background: rgba(32, 30, 30, 1);
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

          .social-icons {
            display: flex;
            gap: 30px;
            justify-content: flex-start;
            margin-bottom: 20px;
          }

          .social-icons a {
            color: #757575;
            transition: color 0.3s;
          }

          .social-icons a:hover {
            color: #fff;
          }

          .footer-bottom {
            margin-top: 20px;
            font-size: 18px;
            text-align: left;
          }

          .copyright {
            margin-top: 30px;
            font-size: 16px;
            color: #aaa;
            text-align: center;
          }
        `}
      </style>

      <div className="container">
        {/* ✅ Social Media Icons */}
        <div className="social-icons">
          <a href="https://www.facebook.com/NetflixIN" target="_blank" rel="noopener noreferrer">
            <Facebook size={24} />
          </a>
          <a href="https://www.instagram.com/netflix_in/" target="_blank" rel="noopener noreferrer">
            <Instagram size={24} />
          </a>
          <a href="https://x.com/netflix" target="_blank" rel="noopener noreferrer">
            <Twitter size={24} />
          </a>
          <a href="https://www.youtube.com/@Netflix" target="_blank" rel="noopener noreferrer">
            <Youtube size={24} />
          </a>
        </div>

        <div className="footer-top" style={{ fontSize: "1.1rem" }}>
          {t("footerQuestions")} <a href="tel:000-800-919-1743">000-800-919-1743</a>
        </div>

        <div className="footer-links" style={{ fontSize: "1rem" }}>
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

        <select
          className="language-select"
          value={i18n.language}
          onChange={handleLanguageChange}
        >
          <option value="en">{t("english")}</option>
          <option value="hi">{t("hindi")}</option>
        </select>

        <div className="footer-bottom mt-3">
          {t("footerIndia")}
        </div>

        {/* ✅ Copyright */}
        <div className="copyright">
          © {new Date().getFullYear()} Netflix, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
