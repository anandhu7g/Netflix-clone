import React from "react";
import axios from "axios";

function Settings({ theme, setTheme }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Save theme change to db.json + localStorage
  const updateTheme = async (newTheme) => {
    setTheme(newTheme);

    try {
      await axios.put(`http://localhost:5000/users/${user.id}`, {
        ...user,
        theme: newTheme,
      });

      const updatedUser = { ...user, theme: newTheme };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error(err);
      alert("Error updating theme");
    }
  };

  // Toggle button
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    updateTheme(newTheme);
  };

  return (
    <div
      className="settings-container"
      style={{ background: theme === "dark" ? "#000" : "#fff" }}
    >
      <div className="settings-card">
        <h2 className="settings-title">⚙️ Settings</h2>

        {/* Radio Buttons */}
        <div className="theme-options">
          <label>
            <input
              type="radio"
              value="light"
              checked={theme === "light"}
              onChange={(e) => updateTheme(e.target.value)}
            />
            Light
          </label>

          <label>
            <input
              type="radio"
              value="dark"
              checked={theme === "dark"}
              onChange={(e) => updateTheme(e.target.value)}
            />
            Dark
          </label>
        </div>

        {/* Toggle Button */}
        <button className="btn-toggle" onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>

      {/* Inline Styles */}
      <style jsx>{`
        .settings-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .settings-card {
          background: #fff;
          padding: 2rem 3rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          text-align: center;
          min-width: 320px;
          color: #000;
        }

        .settings-title {
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
        }

        .theme-options {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }

        .theme-options input {
          margin-right: 0.4rem;
        }

        .btn-toggle {
          background: #6c63ff;
          color: #fff;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-toggle:hover {
          background: #5548d6;
        }
      `}</style>
    </div>
  );
}

export default Settings;




