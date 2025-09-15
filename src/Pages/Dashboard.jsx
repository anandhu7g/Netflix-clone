import React, { useEffect, useState, useRef } from "react";
import heroBg from "../assets/dashboard_hero.jpeg";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import { Play, Info, Bell, Menu, X } from "lucide-react";
import requests from "../services/request";
import Row from "../components/Row";
import axios from "../services/axios";
import FooterSection from "../components/FooterSection";
import Player from "../components/Player";
import MovieInfoModal from "../components/MovieInfoModal";
import { Link } from "react-router-dom";

function Dashboard({ theme }) {
  const [heroMovie, setHeroMovie] = useState(null);
  const [playingMovie, setPlayingMovie] = useState(null);
  const [infoMovie, setInfoMovie] = useState(null);
  const [myList, setMyList] = useState([]);
  const [certificationFilter, setCertificationFilter] = useState("ALL");
  const [activeTab, setActiveTab] = useState("Home");
  const [navOpacity, setNavOpacity] = useState(0);

  const [notifications, setNotifications] = useState([
    { id: 1, text: "🎬 New episode of Stranger Things is now streaming", read: false },
    { id: 2, text: "⭐ Because you watched Inception, try Tenet", read: false },
    { id: 3, text: "⏳ Dark Knight will leave on Sept 15", read: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false); 
  const user = JSON.parse(localStorage.getItem("user"));

  // Tabs logic
  const tabs = ["Home", "Movies", "New & Popular"];
  if (certificationFilter === "ALL" || certificationFilter === "R") {
    tabs.splice(1, 0, "TV Shows"); // Insert TV Shows
    tabs.push("My List"); // Show My List only for ALL or R
  }

  // Filtered My List
  const filteredMyList = myList.filter((movie) => {
    if (certificationFilter === "ALL") return true;
    if (certificationFilter === "R") return movie.adult === true;
    return movie.adult === false; // For G, PG, PG-13
  });

  // Fetch Hero Movie
  useEffect(() => {
    async function fetchHero() {
      try {
        const url = requests.fetchTrending(certificationFilter === "ALL" ? "" : certificationFilter);
        const res = await axios.get(url);
        const results = res.data.results;
        if (results?.length > 0) {
          setHeroMovie(results[Math.floor(Math.random() * results.length)]);
        }
      } catch (err) {
        console.error("Error fetching hero movie:", err);
      }
    }
    fetchHero();
  }, [certificationFilter]);

  // Fetch My List whenever tab is My List OR certification changes
  useEffect(() => {
    if (activeTab !== "My List") return;
    async function fetchMyList() {
      if (!user) return;
      try {
        const res = await axios.get(`http://localhost:5000/users/${user.id}`);
        setMyList(res.data.myList || []);
      } catch (err) {
        console.error("Error fetching My List:", err);
      }
    }
    fetchMyList();
  }, [activeTab, user, certificationFilter]);

  useEffect(() => {
    if ((activeTab === "TV Shows" || activeTab === "My List") && !(certificationFilter === "ALL" || certificationFilter === "R")) {
      setActiveTab("Home");
    }
  }, [certificationFilter, activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // 0 → 1 fade over 200px (tweak divisor for faster/slower fade)
      const opacity = Math.min(scrollTop / 200, 1);
      setNavOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }

    if (showNotifications && window.innerWidth >= 1100) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    if (window.innerWidth >= 1100) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (showMobileMenu) {
      // Disable body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Enable body scroll
      document.body.style.overflow = "auto";
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu]);

  if (!heroMovie) {
    return (
      <div className="dashboard text-white bg-black min-vh-100 d-flex justify-content-center align-items-center" style={{ fontSize: "2rem" }}>
        Loading movies...
      </div>
    );
  }

  return (
    <div className="dashboard min-vh-100"
      style={{
        backgroundColor: theme === "dark" ? "#000" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
      }}
    >
      <div className="dashboard-wrapper"
        style={{ pointerEvents: infoMovie || playingMovie ? "none" : "auto" }}
      >
        {/* Navbar */}
        <nav className="d-flex justify-content-between align-items-center px-3 py-4"
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 1000,
            transition: "background 0.3s ease-out",
            background: `rgba(0,0,0,${navOpacity})`,
          }}
        >
          {/* Left: Logo + Tabs */}
          <div className="d-flex align-items-center gap-5 nav-logo">
            <img src={logo} alt="Logo" className="logo-img" />
            {tabs.map((tab) => (
              <a
                key={tab}
                href="#"
                className={activeTab === tab ? "text-warning" : "text-white"}
                style={{ fontWeight: 500, textDecoration: "none" }}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tab);
                }}
              >
                {tab}
              </a>
            ))}
          </div>

          {/* Right nav - hidden <1100px */}
          <div className="nav-right d-none d-lg-flex align-items-center gap-4">
            {/* Certification Filter */}
            <select
              value={certificationFilter}
              onChange={(e) => setCertificationFilter(e.target.value)}
              style={{
                backgroundColor: "#141414",
                color: "#fff",
                border: "1px solid #555",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: "500",
                outline: "none",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='white' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
                backgroundSize: "16px",
              }}
            >
              <option value="ALL">All</option>
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="R">R</option>
            </select>

            {/* Notifications */}
            <div
              className="notification-wrapper position-relative"
              ref={notificationRef}
            >
              {/* Bell Icon with Badge */}
              <div style={{ position: "relative", display: "inline-block" }}>
                <Bell
                  size={22}
                  style={{ cursor: "pointer", color: "#fff"}}
                  onClick={() => setShowNotifications((prev) => !prev)}
                />
                {/* Badge for unread count */}
                {notifications.some((n) => !n.read) && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-6px",
                      background: "red",
                      color: "white",
                      fontSize: "12px",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontWeight: "bold",
                    }}
                  >
                    {notifications.filter((n) => !n.read).length}
                  </span>
                )}
              </div>

              {/* Dropdown */}
              {showNotifications && (
                <div
                  className="notification-dropdown"
                  style={{
                    position: "absolute",
                    top: "40px",
                    right: 0,
                    width: "300px",
                    background: "#141414",
                    color: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                    padding: "10px",
                    zIndex: 2000,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid #333",
                      paddingBottom: "6px",
                    }}
                  >
                    <h6 style={{ margin: 0 }}>Notifications</h6>
                    <button
                      onClick={() =>
                        setNotifications((prev) =>
                          prev.map((n) => ({ ...n, read: true }))
                        )
                      }
                      style={{
                        fontSize: "12px",
                        color: "#aaa",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Mark all as read
                    </button>
                  </div>

                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {notifications.map((n) => (
                      <li
                        key={n.id}
                        style={{
                          padding: "8px 0",
                          borderBottom: "1px solid #333",
                          fontWeight: n.read ? "normal" : "bold",
                        }}
                      >
                        {n.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="profile-wrapper position-relative" ref={profileRef}>
              <img
                src={profile}
                alt="Profile"
                style={{ width: "32px", borderRadius: "4px", cursor: "pointer" }}
                onClick={() => setShowProfileMenu((prev) => !prev)}
              />

              {showProfileMenu && (
                <div
                  className="profile-dropdown"
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    background: "#141414",
                    color: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                    padding: "10px",
                    minWidth: "180px",
                    zIndex: 2000,
                  }}
                >
                  <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    <li
                      style={{ padding: "8px", cursor: "pointer" }}
                    >
                      <Link to="/account" style={{ textDecoration: "none", color: "white" }}>
                        👤 Account
                      </Link>
                    </li>
                    <li
                      style={{ padding: "8px", cursor: "pointer" }}
                    >
                      <Link to="/settings" style={{ textDecoration: "none", color: "white" }}>
                        ⚙️ Settings
                      </Link>
                    </li>
                    <li
                      style={{ padding: "8px", cursor: "pointer" }}
                      onClick={() => setActiveTab("My List")}
                    >
                      📂 My List
                    </li>
                    <li style={{ padding: "8px", cursor: "pointer", color: "red" }}>
                      <button
                        onClick={() => setShowLogoutModal(true)}
                        style={{ background: "transparent", border: "none", color: "red", cursor: "pointer" }}
                      >
                        🚪 Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Hamburger - visible <1100px */}
          <div className="d-lg-none">
            {!showMobileMenu && (
              <Menu
                size={28}
                color={theme === "dark" ? "#fff" : "#111"}
                style={{ cursor: "pointer" }}
                onClick={() => setShowMobileMenu(true)}
              />
            )}
          </div>
        </nav>
        {/* Backdrop */}
        {showMobileMenu && (
          <div
            className="mobile-menu-backdrop"
            onClick={() => setShowMobileMenu(false)}
          ></div>
        )}

        {/* Drawer */}
        <div className={`mobile-menu d-lg-none ${showMobileMenu ? "open" : ""}`}>
          <X
            size={28}
            color={theme === "dark" ? "#fff" : "#111"}
            className="mobile-menu-close"
            onClick={() => setShowMobileMenu(false)}
          />

          {/* Tabs */}
          <div className="mb-3">
            {tabs.map((tab) => (
              <a
                key={tab}
                href="#"
                className={activeTab === tab ? "text-warning" : "text-white"}
                style={{
                  fontWeight: 500,
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "10px",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tab);
                  setShowMobileMenu(false);
                }}
              >
                {tab}
              </a>
            ))}
          </div>

          {/* Certification Filter */}
          <div className="mb-3">
            <select
              value={certificationFilter}
              onChange={(e) => setCertificationFilter(e.target.value)}
              style={{
                width: "100%",
                backgroundColor: "#222",
                color: "#fff",
                border: "1px solid #555",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              <option value="ALL">All</option>
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="R">R</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="mb-3">
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              style={{
                width: "100%",
                background: "transparent",
                color: "#fff",
                border: "1px solid #333",
                padding: "8px",
                borderRadius: "6px",
                textAlign: "left",
              }}
            >
              🔔 Notifications
            </button>
            {showNotifications && (
              <ul style={{ marginTop: "8px", paddingLeft: "16px" }}>
                {notifications.map((n) => (
                  <li key={n.id} style={{ marginBottom: "6px" }}>
                    {n.text}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Profile */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowProfileMenu((prev) => !prev)}
              style={{
                width: "100%",
                background: "transparent",
                color: "#fff",
                border: "1px solid #333",
                padding: "10px 12px",
                borderRadius: "6px",
                textAlign: "left",
                fontWeight: 500,
                cursor: "pointer",
                marginBottom:"0.1rem"
              }}
            >
              👤 Profile
            </button>
            {showProfileMenu && (
              <ul
                style={{
                  listStyle: "none",           // remove bullets
                  marginTop: "8px",
                  padding: "8px 0",             // padding inside the dropdown
                  background: "#222",           // dark background
                  borderRadius: "6px",
                  border: "1px solid #333",
                  position: "absolute",
                  top: "100%",                  // below the button
                  left: 0,
                  width: "100%",
                  zIndex: 2000,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                }} 
              >
                <li>
                  <Link to="/account" 
                    style={{
                    display: "block",
                    padding: "10px 12px",
                    color: "#fff",
                    textDecoration: "none",
                  }}
                  >
                    Account
                  </Link>
                </li>
                <li>
                  <Link to="/settings" 
                    style={{
                    display: "block",
                    padding: "10px 12px",
                    color: "#fff",
                    textDecoration: "none",
                  }}
                  >
                    Settings
                  </Link>
                </li>
                <li onClick={() => setActiveTab("My List")}
                  style={{
                    display: "block",
                    padding: "10px 12px",
                    cursor: "pointer",
                    color: "#fff",
                    textDecoration: "none",
                    borderBottom: "1px solid #333"
                  }}
                >My List</li>
                <li
                  onClick={() => setShowLogoutModal(true)}
                  style={{
                    display: "block",
                    padding: "10px 12px",
                    cursor: "pointer",
                    color: "red",
                    
                  }}
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
          <div style={{ height: "180px" }}></div>
        </div>

        {/* Hero Section */}
        <div className="hero-wrapper position-relative">
          {/* Hero Image */}
          <img
            src={
              heroMovie?.backdrop_path
                ? `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`
                : heroBg
            }
            alt={heroMovie?.title || heroMovie?.name || "Hero"}
            className="hero-img"
          />

          {/* Gradient overlay only for desktop */}
          <div className="hero-overlay"></div>

          {/* Hero Content */}
          <div className="hero-content" style={{ color: theme === "dark" ? "#e5d8d8ff" : "#111" }}>
            <h1 className="hero-title" style={{ color: theme === "dark" ? "#d2b1b1ff" : "#111" }}>
              {heroMovie?.title || heroMovie?.name || "Untitled"}
            </h1>
            <p className="hero-desc" style={{ color: theme === "dark" ? "#e5d8d8ff" : "#222" }}>
              {heroMovie?.overview
                ? heroMovie.overview.slice(0, 150)
                : "No description available"}
              ...
            </p>
            <div className="d-flex gap-3 mt-3">
              <button className={`btn ${theme === "dark" ? "btn-light" : "btn-dark"}`} 
                onClick={() => setPlayingMovie(heroMovie)}>
                <Play size={22} /> Play
              </button>
              <button className={`btn ${theme === "dark" ? "btn-secondary" : "btn-outline-secondary"}`} 
                onClick={() => setInfoMovie(heroMovie)}>
                <Info size={22} /> More Info
              </button>
            </div>
          </div>
        </div>

        {/* Movie Rows */}
        <div className="px-3" style={{marginBottom:"20px"}}>
          {(activeTab === "Home" || activeTab === "New & Popular") && (
            <>
              <Row title="Trending Now" fetchUrl={requests.fetchTrending(certificationFilter === "ALL" ? "" : certificationFilter)} onInfoClick={setInfoMovie} />
              {activeTab === "Home" && <Row title="Top Rated" fetchUrl={requests.fetchTopRated(certificationFilter === "ALL" ? "" : certificationFilter)} onInfoClick={setInfoMovie} />}
            </>
          )}

          {activeTab === "TV Shows" && (certificationFilter === "ALL" || certificationFilter === "R") && (
            <>
              <Row title="Popular TV Shows" fetchUrl={requests.fetchTVPopular()} onInfoClick={setInfoMovie} />
              <Row title="Top Rated TV Shows" fetchUrl={requests.fetchTVTopRated()} onInfoClick={setInfoMovie} />
            </>
          )}

          {activeTab === "Movies" && (
            <>
              <Row title="Action Movies" fetchUrl={requests.fetchActionMovies(certificationFilter === "ALL" ? "" : certificationFilter)} onInfoClick={setInfoMovie} />
              <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies(certificationFilter === "ALL" ? "" : certificationFilter)} onInfoClick={setInfoMovie} />
              <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies(certificationFilter === "ALL" ? "" : certificationFilter)} onInfoClick={setInfoMovie} />
              <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies(certificationFilter === "ALL" ? "" : certificationFilter)} onInfoClick={setInfoMovie} />
              <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries(certificationFilter === "ALL" ? "" : certificationFilter)} onInfoClick={setInfoMovie} />
            </>
          )}

          {activeTab === "My List" && (
            filteredMyList.length > 0 ? (
              <Row title="My List" propMovies={filteredMyList} onInfoClick={setInfoMovie} />
            ) : (
              <div className="px-5 mt-4 text-white" style={{ fontSize: "1.2rem" }}>
                No movies in added to List
              </div>
            )
          )}
        </div>

        <FooterSection />
      </div>

      {/* Modals */}
        {infoMovie && <MovieInfoModal movie={infoMovie} onClose={() => setInfoMovie(null)} onPlay={setPlayingMovie} onInfoClick={setInfoMovie} user={user} myList={myList} setMyList={setMyList} />}
        {playingMovie && <Player movie={playingMovie} onClose={() => setPlayingMovie(null)} />}
        {showLogoutModal && (
          <div
            className="modal-backdrop"
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 3000,
            }}
          >
            <div
              className="modal-card"
              style={{
                background: "#fff",
                color: "#000",
                padding: "2rem",
                borderRadius: "12px",
                minWidth: "300px",
                textAlign: "center",
              }}
            >
              <h3>Confirm Logout?</h3>
              <p>Are you sure you want to logout?</p>
              <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-around" }}>
                <button
                  className="btn-confirm"
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/"; // redirect to home
                  }}
                  style={{
                    background: "red",
                    color: "#fff",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => setShowLogoutModal(false)}
                  style={{
                    background: "#ccc",
                    color: "#000",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      <style>
      {`
        @media (max-width: 992px) {
          /* hide inline tabs on small screens */
          nav .d-flex.align-items-center.gap-5 a {
            display: none;
          }
          .mobile-menu {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;          /* full screen height */
            width: 70%;             /* drawer width */
            max-width: 320px;       /* optional: prevent extra wide drawer */
            background: #141414;
            display: block;
            
            padding: 4rem 1rem;
            padding-bottom: 6rem;
            box-sizing: border-box;
            z-index: 2000;
            overflow-y: auto;       /* scroll if content is long */

            /* animation */
            transform: translateX(-100%);  
            transition: transform 0.3s ease-in-out;
          }

          .mobile-menu.open {
            transform: translateX(0); /* slide in */
          }
          
          .mobile-menu-close {
            position: absolute;
            top: 20px;
            right: 20px;
            cursor: pointer;
            z-index: 2100;
          }

          .mobile-menu-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            background: rgba(0, 0, 0, 0.6);
            z-index: 1500;
          }

          .mobile-menu a {
            color: #fff;
            text-decoration: none;
            padding: 0.5rem 0;
            border-bottom: 1px solid #333;
          }

          .mobile-menu a.text-warning {
            color: #ffc107 !important; /* highlight active tab */
          }
        }

        .logo-img {
          height: 35px !important;  
          transition: height 0.2s ease; 
        }

        .hero-wrapper {
          height: 80vh;
          position: relative;
          overflow: hidden;
        }

        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.4), transparent);
        }

        .hero-content {
          position: absolute;
          bottom: 30px;
          left: 30px;
          max-width: 600px;
          z-index: 2;
          color: #e5d8d8ff;
        }

        .hero-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #d2b1b1ff;
        }

        .hero-desc {
          font-size: 1rem;
        }

        .hero-content .btn {
          padding: 8px 20px;
          font-size: 1rem;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* 📱 Mobile + Tablet Image Styles (same up to 768px) */
        @media (max-width: 768px) {

          .logo-img {
            height: 23px !important;
          }

          .hero-wrapper {
            height: auto;
            padding-top: 80px; /* constant gap below navbar */
            text-align: center;
          }

          .hero-img {
            width: 95% !important;
            height: auto !important;
            object-fit: contain !important;
            margin: 0 auto;
          }

          .hero-overlay {
            display: none; /* remove gradient on mobile & tablet */
          }

          .hero-content {
            position: static; /* move content below image */
            margin-top: 16px;
            padding: 0 12px;
            text-align: left;
          }

          .hero-content .btn {
            width: 100%;
            justify-content: center;
            padding: 6px 12px;
          }
        }

        /* 📱 Extra small (<480px) */
        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.2rem;
          }
          .hero-desc {
            font-size: 0.75rem;
          }
          .hero-content .btn {
            font-size: 0.8rem;
          }
        }

        /* 📱 Small tablets (481-768px) */
        @media (min-width: 481px) and (max-width: 768px) {
          .hero-title {
            font-size: 1.7rem;
          }
          .hero-desc {
            font-size: 1rem;
          }
          .hero-content .btn {
            font-size: 1rem;
          }
        }
      `}
      </style>
    </div>
  );
}

export default Dashboard;






















