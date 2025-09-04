import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";
import TvShows from "./Pages/TvShows";
import SignIn from "./Pages/SignIn";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with default Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TvShows />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>

        {/* Dashboard with its own Navbar */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

