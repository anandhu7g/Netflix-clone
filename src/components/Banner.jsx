function Banner({ movie }) {
  return (
    <div
      className="banner text-light d-flex flex-column justify-content-end p-4"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(20,20,20,1), rgba(20,20,20,0.2)), url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "650px",
        borderRadius: "10px",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>{movie?.title}</h1>
      <p style={{ maxWidth: "50%" }}>{movie?.overview}</p>
    </div>
  );
}

export default Banner;
