import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import MovieDetails from "./pages/MovieDetails";
import Layout from "./components/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>Page Not Found</div>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "watchlist",
        element: <Watchlist />,
      },
      {
        path: "movie/:imdbID",
        element: <MovieDetails />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
