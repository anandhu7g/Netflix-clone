import React from "react";
import { useTranslation } from "react-i18next";
import { Tv, Download, Smartphone, Sparkles } from "lucide-react"; // icons

function ReasonsSection() {
  const { t } = useTranslation();
  return (
    <section className="reasons-section py-5">
      <style>
        {`
        .reasons-section {
            background: #000;
            color: #fff;
        }
        .reason-card {
            background: linear-gradient(135deg, #2b124fff, #0d111c);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height:190px;
            position: relative; 
        }
        .reason-text h5 {
            font-weight: 700;
            margin-bottom: 0.3rem;
            font-size: 22px;
        }
        .reason-text p {
            margin: 0;
            color: #bbb;
        }
        .reason-text{
            position: absolute;
            top: 30px;
            left: 20px;
        }
        .reason-icon {
            font-size: 30px;
            position: absolute;
            bottom: 20px;
            right: 20px;
        }
        `}
      </style>

      <div className="container">
        <h4 className="mb-4">{t("reasonsTitle")}</h4>
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
    </section>
  );
}

export default ReasonsSection;