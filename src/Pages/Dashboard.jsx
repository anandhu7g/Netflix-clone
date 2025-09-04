import React, { useEffect, useState } from "react";
import heroBg from "../assets/dashboard_hero.jpeg"; // fallback background
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import { Play, Info, Search, Bell } from "lucide-react";

// Services
import Row from "../components/Row"; // make sure Row.jsx is inside components/
import requests from "../services/request";
import axios from "../services/axios";
import FooterSection from "../components/FooterSection";

function Dashboard() {
  const [heroMovie, setHeroMovie] = useState(null);

  // Fetch a random trending movie for the hero section
  useEffect(() => {
    async function fetchHero() {
      try {
        const request = await axios.get(requests.fetchTrending);
        console.log("TMDB response:", request.data);
        const results = request.data.results;
        if (results && results.length > 0) {
          setHeroMovie(results[Math.floor(Math.random() * results.length)]);
        } else {
          setHeroMovie(null);
        }
      } catch (error) {
        console.error("Error fetching hero movie:", error);
        setHeroMovie(null);
      }
    }
    fetchHero();
  }, []);

  if (!heroMovie) {
    return <div className="dashboard text-white bg-black min-vh-100 d-flex justify-content-center align-items-center" style={{fontSize: "2rem"}}>Loading or failed to load movies...</div>;
  }
  return (
    <div className="dashboard text-white bg-black min-vh-100">
      {/* Navbar */}
      <nav
        className="d-flex justify-content-between align-items-center px-5 py-4"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,1.0), transparent)",
          position: "absolute",
          top: 0,
          width: "100%",
          zIndex: 10,
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {/* Left side */}
        <div className="d-flex align-items-center gap-5">
          <img
            src={logo}
            alt="Netflix"
            style={{ height: "35px", objectFit: "contain" }}
          />
          {[
            "Home",
            "TV Shows",
            "Movies",
            "New & Popular",
            "My List",
            "Browse by Languages",
          ].map((item, index) => (
            <a
              key={index}
              href="#"
              style={{
                color: "white",
                fontWeight: "500",
                textDecoration: "none",
                fontSize: "16px",
                transition: "color 0.2s ease-in-out",
              }}
              onMouseOver={(e) => (e.target.style.color = "#b3b3b3")}
              onMouseOut={(e) => (e.target.style.color = "white")}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="d-flex align-items-center gap-4 text-white">
          <div>
            <Search size={20} />
            <span style={{ fontSize: "14px", marginLeft: "6px" }}>Children</span>
          </div>
          <Bell size={20} />
          <img
            src={profile}
            alt="Profile"
            style={{ width: "32px", borderRadius: "4px", cursor: "pointer" }}
          />
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="position-relative d-flex align-items-center"
        style={{
          height: "80vh",
          background: `url(https://image.tmdb.org/t/p/original${
            heroMovie?.backdrop_path || ""
          }) center/cover no-repeat, url(${heroBg}) center/cover no-repeat`,
        }}
      >
        {/* Left-to-right overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 75%)",
          }}
        ></div>

        {/* Content */}
        <div
          className="position-absolute text-white m-5"
          style={{
            zIndex: 2,
            maxWidth: "600px",
            bottom: "30px", // moves content to bottom
            left: "30px",
            fontSize: "10px",
          }}
        >
          {/* Movie Title */}
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>
            {heroMovie?.title || heroMovie?.name || heroMovie?.original_name}
          </h1>

          {/* Movie Overview */}
          <p className="fs-6" style={{ fontSize: "1rem", lineHeight: "1.4" }}>
            {heroMovie?.overview?.length > 150
              ? heroMovie.overview.slice(0, 150) + "..."
              : heroMovie?.overview}
          </p>

          <div className="d-flex gap-3 mt-3">
            <button
              className="btn btn-light d-flex align-items-center gap-2 px-4 py-2 fw-bold"
              style={{ fontSize: "18px" }}
            >
              <Play size={22} /> Play
            </button>
            <button
              className="btn btn-secondary d-flex align-items-center gap-2 px-4 py-2 fw-bold"
              style={{
                fontSize: "18px",
                backgroundColor: "rgba(109,109,110,0.7)",
                border: "none",
              }}
            >
              <Info size={22} /> More Info
            </button>
          </div>
          
        </div>
      </div>

      {/* Movie Rows */}
      <div className="px-5">
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      </div>
      
      {/* Footer */}
      <FooterSection/>
    </div>
  );
}

export default Dashboard;


