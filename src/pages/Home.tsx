import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import type { TSearchMovie } from "../types/movie";

export default function Home() {
  const [movies, setMovies] = useState<TSearchMovie[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("Avengers");

  const fetchMovies = async (term: string) => {
    try {
      setLoading(true);
      setError(null);
      const apiKey = import.meta.env.VITE_OMB_API_KEY;

      const res = await fetch(
        `https://www.omdbapi.com/?s=${term}&apikey=${apiKey}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        console.log(JSON.stringify(data.Search, null, 2));
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchMovies(searchTerm);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero / Search Section */}
      <div className="bg-linear-to-b from-gray-900 to-[#141414] py-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-6xl mb-6 tracking-tight">
            Find your next <span className="text-primary">favorite</span>
          </h1>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Search through our extensive collection of movies and series. Create
            your personal watchlist and never miss a show.
          </p>

          <form
            onSubmit={handleSearch}
            className="relative max-w-xl mx-auto group"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for movies, series..."
              className="w-full pl-12 pr-24 py-4 bg-gray-800/50 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:bg-gray-800 transition-all shadow-lg"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-primary-hover text-white px-6 rounded-full font-medium transition-colors cursor-pointer shadow-md"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white border-l-4 border-primary pl-4">
            {loading ? "Searching..." : `Results for "${searchTerm}"`}
          </h2>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-16 bg-gray-900/50 rounded-xl border border-white/5">
            <p className="text-red-400 text-lg mb-2">😕 {error}</p>
            <p className="text-gray-500">Try searching for something else.</p>
          </div>
        )}

        {!loading && !error && movies && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}

        {!loading && !error && (!movies || movies.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No movies found. Try a different search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
