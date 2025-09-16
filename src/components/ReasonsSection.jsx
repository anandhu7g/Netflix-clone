import React from "react";
import { useTranslation } from "react-i18next";
import { Tv, Download, Smartphone, Sparkles } from "lucide-react";

function ReasonsSection() {
  const { t } = useTranslation();
  return (
    <section className="reasons-section py-5">
      <div className="container-fluid">
        <h4 className="reasons-heading mb-4 reason-heading">{t("reasonsTitle")}</h4>

        <div className="reason-card">
          <div className="reason-text">
            <h5>{t("reasonEnjoyTV")}</h5>
            <p>{t("reasonEnjoyTVDesc")}</p>
          </div>
          <Tv size={45} className="reason-icon text-danger" />
        </div>

        <div className="reason-card">
          <div className="reason-text">
            <h5>{t("reasonDownload")}</h5>
            <p>{t("reasonDownloadDesc")}</p>
          </div>
          <Download size={45} className="reason-icon text-pink-500" />
        </div>

        <div className="reason-card">
          <div className="reason-text">
            <h5>{t("reasonWatchEverywhere")}</h5>
            <p>{t("reasonWatchEverywhereDesc")}</p>
          </div>
          <Smartphone size={45} className="reason-icon text-warning" />
        </div>

        <div className="reason-card">
          <div className="reason-text">
            <h5>{t("reasonKids")}</h5>
            <p>{t("reasonKidsDesc")}</p>
          </div>
          <Sparkles size={45} className="reason-icon text-info" />
        </div>
      </div>
      <style>
        {`
        .reasons-section {
          background: #000;
          color: #fff;
          margin-left: 40px;  
          margin-right: 40px;
        }
        .reason-card {
          background: linear-gradient(135deg, #2b124fff, #0d111c);
          border-radius: 15px;
          padding: 20px;
          margin-bottom: 15px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          min-height: 140px;
        }

        .reason-text h5 {
          font-weight: 700;
          margin-bottom: 0.3rem;
          font-size: 20px;
        }

        .reason-text p {
          margin: 0;
          color: #bbb;
          font-size: 15px;
        }

        .reason-icon {
          flex-shrink: 0;
        }

        /* ✅ Responsive adjustments */
        @media (max-width: 768px) {
          .reasons-section {
            width: 100%;
            margin-left: 0;
            margin-right: 0;
          }
          .reason-card {
            flex-direction: column;
            text-align: center;
            align-items: center;
            padding: 15px;
          }
          .reason-text h5 {
            font-size: 18px;
          }
          .reason-text p {
            font-size: 14px;
          }
          .reason-icon {
            margin-top: 10px;
          }
          .reasons-heading {
            text-align: center;   /* centers text */
            margin: 0 auto;       /* optional: makes sure it stays in middle */
          }
        }

        @media (max-width: 480px) {
          .reasons-section {
            width: 100%;
            margin-left: 0;
            margin-right: 0;
          }
          .reason-card {
            padding: 12px;
          }
          .reason-text h5 {
            font-size: 16px;
          }
          .reason-text p {
            font-size: 13px;
          }
          .reason-icon {
            width: 32px;
            height: 32px;
          }
          .reason-heading{
            font-size: 1.2rem;
          }
        }
        `}
      </style>
    </section>
  );
}

export default ReasonsSection;
