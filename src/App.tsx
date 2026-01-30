import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import MovieDetails from "./pages/MovieDetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-[#141414] text-gray-100 font-sans">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/movie/:imdbID" element={<MovieDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
