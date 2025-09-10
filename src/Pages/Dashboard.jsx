import React, { useEffect, useState } from "react";
import heroBg from "../assets/dashboard_hero.jpeg";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import { Play, Info, Bell } from "lucide-react";

import Row from "../components/Row";
import requests from "../services/request";
import axios from "../services/axios";
import FooterSection from "../components/FooterSection";
import Player from "../components/Player";
import MovieInfoModal from "../components/MovieInfoModal";

function Dashboard() {
  const [heroMovie, setHeroMovie] = useState(null);
  const [playingMovie, setPlayingMovie] = useState(null);
  const [infoMovie, setInfoMovie] = useState(null);
  const [myList, setMyList] = useState([]);
  const [activeTab, setActiveTab] = useState("Home");
  const tabs = ["Home", "TV Shows", "Movies", "New & Popular", "My List"];

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch a random hero movie
  useEffect(() => {
    async function fetchHero() {
      try {
        const request = await axios.get(requests.fetchTrending);
        const results = request.data.results;
        if (results && results.length > 0) {
          setHeroMovie(results[Math.floor(Math.random() * results.length)]);
        }
      } catch (err) {
        console.error("Error fetching hero movie:", err);
      }
    }
    fetchHero();
  }, []);

  // Fetch My List
  useEffect(() => {
    async function fetchMyList() {
      if (!user) return;
      try {
        const res = await axios.get(`http://localhost:5000/users/${user.id}`);
        setMyList(res.data.myList || []);
      } catch (err) {
        console.error("Error fetching My List:", err);
      }
    }

    if (activeTab === "My List") fetchMyList();
  }, [activeTab, user]);

  if (!heroMovie) {
    return (
      <div className="dashboard text-white bg-black min-vh-100 d-flex justify-content-center align-items-center" style={{ fontSize: "2rem" }}>
        Loading movies...
      </div>
    );
  }

  return (
    <div className="dashboard text-white bg-black min-vh-100">
      <div
        className="dashboard-wrapper"
        style={{ pointerEvents: infoMovie || playingMovie ? "none" : "auto" }}
      >
        {/* Navbar */}
        <nav className="d-flex justify-content-between align-items-center px-5 py-4" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,1), transparent)", position: "absolute", top: 0, width: "100%", zIndex: 10 }}>
          <div className="d-flex align-items-center gap-5">
            <img src={logo} alt="Logo" style={{ height: "35px" }} />
            {tabs.map((tab) => (
              <a
                key={tab}
                href="#"
                className={activeTab === tab ? "text-warning" : "text-white"}
                style={{ fontWeight: 500, textDecoration: "none" }}
                onClick={(e) => { e.preventDefault(); setActiveTab(tab); }}
              >
                {tab}
              </a>
            ))}
          </div>
          <div className="d-flex align-items-center gap-4">
            <Bell size={20} />
            <img src={profile} alt="Profile" style={{ width: "32px", borderRadius: "4px" }} />
          </div>
        </nav>

        {/* Hero Section */}
        <div className="position-relative d-flex align-items-center" style={{ height: "80vh", background: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}) center/cover no-repeat, url(${heroBg}) center/cover no-repeat` }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.4), transparent)" }}></div>
          <div className="position-absolute m-5" style={{ zIndex: 2, bottom: "30px", left: "30px", maxWidth: "600px" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>{heroMovie.title || heroMovie.name}</h1>
            <p>{heroMovie.overview?.slice(0, 150)}...</p>
            <div className="d-flex gap-3 mt-3">
              <button className="btn btn-light" onClick={() => setPlayingMovie(heroMovie)}><Play size={22} /> Play</button>
              <button className="btn btn-secondary" onClick={() => setInfoMovie(heroMovie)}><Info size={22} /> More Info</button>
            </div>
          </div>
        </div>

        {/* Movie Rows */}
        <div className="px-5">
          {(activeTab === "Home" || activeTab === "New & Popular") && <>
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} onInfoClick={setInfoMovie} />
            {activeTab === "Home" && <Row title="Top Rated" fetchUrl={requests.fetchTopRated} onInfoClick={setInfoMovie} />}
          </>}
          {activeTab === "TV Shows" && <>
            <Row title="Popular TV Shows" fetchUrl={requests.fetchTVPopular} onInfoClick={setInfoMovie} />
            <Row title="Top Rated TV Shows" fetchUrl={requests.fetchTVTopRated} onInfoClick={setInfoMovie} />
          </>}
          {activeTab === "Movies" && <>
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} onInfoClick={setInfoMovie} />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} onInfoClick={setInfoMovie} />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} onInfoClick={setInfoMovie} />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} onInfoClick={setInfoMovie} />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} onInfoClick={setInfoMovie} />
          </>}
          {activeTab === "My List" && <Row title="My List" propMovies={myList} onInfoClick={setInfoMovie} />}
        </div>

        <FooterSection />
      </div>

      {/* Modals */}
      {infoMovie && <MovieInfoModal movie={infoMovie} onClose={() => setInfoMovie(null)} onPlay={(m) => setPlayingMovie(m)} onInfoClick={(m) => setInfoMovie(m)} user={user} myList={myList} setMyList={setMyList} />}
      {playingMovie && <Player movie={playingMovie} onClose={() => setPlayingMovie(null)} />}
    </div>
  );
}

export default Dashboard;







