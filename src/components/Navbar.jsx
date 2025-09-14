import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png"; 
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isSignInPage = location.pathname === "/signin";

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav
      className="navbar netflix-navbar d-flex align-items-center justify-content-between w-100"
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
      <div className="d-flex align-items-center justify-content-between w-100 flex-wrap" style={{ rowGap: "5px" }}>
        {/* Logo */}
        <img
          src={logo}
          alt="Netflix Logo"
          style={{ height: "23px", width: "auto", marginRight:"10px" }}
        />

        {/* Right Section: Language + Sign In */}
        {!isSignInPage && (
          <div className="d-flex align-items-center gap-3 action-section">
            {/* Language Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-dark dropdown-toggle lang-btn"
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
                {/* Full text for desktop */}
                <span className="desktop-label">
                  {i18n.language === "en"
                    ? t("english").charAt(0).toUpperCase() + t("english").slice(1)
                    : t("hindi").charAt(0).toUpperCase() + t("hindi").slice(1)}
                </span>

                {/* Short text for mobile */}
                <span className="mobile-label">
                  {i18n.language === "en" ? "EN" : "हिं"}
                </span>
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
              className="btn px-3 signin-btn"
              to="/signin"
              style={{ backgroundColor: "#e50914", color: "#fff" }}
            >
              {t("signIn")}
            </NavLink>
          </div>
        )}
      </div>

      <style>{`
        /* Default */
        .lang-btn .desktop-label {
          display: inline;
        }
        .lang-btn .mobile-label {
          display: none;
        }
        @media (min-width: 960px) {
          .navbar img {
            height: 40px !important;
          }
        }
        @media (max-width: 600px) {
          .lang-btn .desktop-label {
            display: none;
          }
          .lang-btn .mobile-label {
            display: inline;
            font-weight: 600;
            font-size: 0.9rem;
          }
        }

        /* Shrink buttons on <480px */
        @media (max-width: 480px) {
          .signin-btn {
            padding: 0.20rem 0.6rem !important;
            font-size: 0.8rem !important;
          }
          .lang-btn {
            font-size: 0.8rem !important;
            padding: 0.16rem 0.6rem !important;
          }
        }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;

