import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function FAQSection() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { question: t("faq1q"), answer: t("faq1a") },
    { question: t("faq2q"), answer: t("faq2a") },
    { question: t("faq3q"), answer: t("faq3a") },
    { question: t("faq4q"), answer: t("faq4a") },
    { question: t("faq5q"), answer: t("faq5a") },
    { question: t("faq6q"), answer: t("faq6a") }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section py-5">
      <style>
        {`
          .faq-section {
            background: #000;
            color: #fff;
          }
          .faq-item {
            background: #2d2d2d;
            margin-bottom: 10px;
            padding: 20px;
            cursor: pointer;
            border-radius: 5px;
          }
          .faq-question {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 20px;
            font-weight: 500;
          }
          .faq-answer {
            margin-top: 15px;
            font-size: 16px;
            color: #bbb;
          }
        `}
      </style>

      <div className="container">
        <h4 className="mb-4">{t("faqTitle")}</h4>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="faq-item"
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq.question}
              <span>{activeIndex === index ? "✕" : "+"}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQSection;
