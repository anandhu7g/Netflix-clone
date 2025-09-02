import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import Movies from "./Pages/Movies"
import TvShows from "./Pages/TvShows"
import SignIn from "./Pages/SignIn"

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<TvShows />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
