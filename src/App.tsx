import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import MovieDetails from "./pages/MovieDetails";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/watchlist",
    element: <Watchlist />,
  },
  {
    path: "/movie/:imdbID",
    element: <MovieDetails />,
  },
]);
function App() {
  return (
    <div className="min-h-screen bg-[#141414] text-gray-100 font-sans">
      <Navbar />
      <main>
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;
