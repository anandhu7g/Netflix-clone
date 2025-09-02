import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png"; 
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav
      className="navbar netflix-navbar"
      style={{
        position: "absolute",
        top: 20,
        left: 0,
        width: "100%",
        background: "transparent",
        padding: "0.5rem 2rem",
        zIndex: 10,
        borderBottom: "none",
      }}
    >
      <div className="d-flex align-items-center justify-content-between w-100 px-3">
        {/* Logo */}
        <NavLink to="/" onClick={() => window.location.reload()}>
          <img
            src={logo}
            alt="Netflix Logo"
            style={{ height: "25px", width: "auto", cursor: "pointer" }}
          />
        </NavLink>

        {/* Right Section: Language + Sign In */}
        <div className="d-flex align-items-center gap-3">
          {/* Language Dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-dark dropdown-toggle"
              type="button"
              id="languageDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                background: "transparent",
                border: "1px solid #7a7676ff",
                color: "#fff",
              }}
            >
            {i18n.language === "en"
              ? t("english").charAt(0).toUpperCase() + t("english").slice(1)
              : t("hindi").charAt(0).toUpperCase() + t("hindi").slice(1)}
            </button>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li>
                <button className="dropdown-item" onClick={() => changeLanguage("en")}> 
                  {t("english").charAt(0).toUpperCase() + t("english").slice(1)}
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => changeLanguage("hi")}> 
                  {t("hindi").charAt(0).toUpperCase() + t("hindi").slice(1)}
                </button>
              </li>
            </ul>
          </div>

          {/* Sign In Button */}
          <NavLink
            className="btn px-3"
            to="/signin"
            style={{ backgroundColor: "#e50914", color: "#fff" }}
          >
            {t("signIn")}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
