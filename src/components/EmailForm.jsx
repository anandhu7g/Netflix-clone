import React from "react";

function EmailForm({ value, onChange, placeholder, buttonText, onSubmit }) {
  return (
    <form
      className="d-flex justify-content-center align-items-center mt-3 email-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(e);
      }}
    >
      <input
        type="email"
        className="email-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      <button type="submit" className="email-btn">
        {buttonText}
      </button>

      <style jsx>{`
        .email-form {
          gap: 10px;
          flex-wrap: nowrap; /* stay in one line until small screen */
        }

        .email-input {
          flex: 1 1 70%; /* input takes 70% max, shrinks if needed */
          min-width: 0;
          height: 55px;
          padding: 0 15px;
          border-radius: 4px;
          border: 1px solid #7a7676ff !important;
          background: #141313ff;
          color: white;
        }

        .email-btn {
          flex: 0 0 auto; /* natural width */
          height: 55px;
          line-height: 55px; 
          padding: 0 20px;
          border-radius: 4px;
          background: #e50914;
          color: white;
          border: none;
          white-space: nowrap;
        }

        /* Only wrap and stack vertically on small screens */
        @media (max-width: 480px) {
          .email-form {
            flex-direction: column;
            align-items: stretch;
          }
          .email-input {
            width: 100%;
            font-size: 14px;
            height: 55px !important;
            min-height: 55px !important; 
            box-sizing: border-box; 
          }
          .email-btn {
            width: auto;       /* button natural width */
            height: 55px;
            line-height: 55px;
            margin-top: 10px;
          }
        }
      `}</style>
    </form>
  );
}

export default EmailForm;



