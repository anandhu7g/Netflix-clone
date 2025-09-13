import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import EmailForm from "./EmailForm";

function FAQSection() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const faqs = [
    { question: t("faq1q"), answer: t("faq1a") },
    { question: t("faq2q"), answer: t("faq2a") },
    { question: t("faq3q"), answer: t("faq3a") },
    { question: t("faq4q"), answer: t("faq4a") },
    { question: t("faq5q"), answer: t("faq5a") },
    { question: t("faq6q"), answer: t("faq6a") },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter a valid email");
      return;
    }
    navigate("/signin", { state: { mode: "signup", email } });
  };

  return (
    <section className="faq-section py-2">
      <div className="container mb-5">
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

        {/* ✅ Pass state + handlers into EmailForm */}
        <div className="footer-input mt-5">
          <p
            style={{
              fontSize: "1.1rem",
              color: "white",
              textAlign: "center",
              marginTop: "12px",
            }}
          >
            {t("footerReady")}
          </p>
          <div className="faq-email-wrapper">
            <EmailForm
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              buttonText={t("getStarted")}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
<style>
{`
.faq-section {
  background: #000;
  color: #fff;
}

/* FAQ items */
.faq-item {
  background: rgba(32, 30, 30, 1);
  margin-bottom: 10px;
  padding: 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.2s ease;
}

.faq-item:hover {
  background: rgba(50, 48, 48, 1);
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

/* Footer email form */
.footer-input {
  margin-top: 20px;
}

.faq-email-wrapper form {
  display: flex;
  gap: 10px; /* gap between input and button */
  flex-wrap: wrap; /* allow wrapping on very small screens */
  align-items: center;
}

.faq-email-wrapper input {
  flex: 1 1 auto; 
  max-width: 70%; 
  min-width: 0; 
  height: 55px;
  padding: 0 15px;
  border-radius: 4px;
  border: 1px solid #7a7676ff;
  background: #141313ff;
  color: white;
}

.faq-email-wrapper input::placeholder {
  color: #c7bdbdff;
}

.faq-email-wrapper button {
  height: 55px; /* same height as input */
  padding: 0 20px; /* normal width */
  border-radius: 4px;
  background: #e50914;
  color: white;
  border: none;
  cursor: pointer;
  flex-shrink: 0;   
  white-space: nowrap;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .faq-section h4 {
    font-size: 1.5rem;
  }
  .faq-item {
    padding: 18px;
  }
  .faq-question {
    font-size: 18px;
  }
  .faq-answer {
    font-size: 15px;
  }
}

@media (max-width: 768px) {
  .faq-section h4 {
    font-size: 1.3rem;
    text-align: center;
  }
  .faq-item {
    padding: 15px;
  }
  .faq-question {
    font-size: 17px;
  }
  .faq-answer {
    font-size: 14px;
  }
  .faq-email-wrapper form {
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .faq-section h4 {
    font-size: 1.1rem;
  }
  .faq-item {
    padding: 12px;
  }
  .faq-question {
    font-size: 16px;
  }
  .faq-answer {
    font-size: 13px;
  }
  .faq-email-wrapper form {
    flex-direction: column; /* stack input & button */
    gap: 10px;
  }
}
`}
</style>

    </section>
  );
}

export default FAQSection;

