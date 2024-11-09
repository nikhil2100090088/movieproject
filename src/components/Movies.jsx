// Movies.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const Movies = ({ searchQuery, watchlist, handleAddWatchlist, handleRemoveFromWatchList }) => {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(''); // Empty genre for "All"
  const [notification, setNotification] = useState('');
  const loadMoreRef = useRef(null);

  const API_KEY = '4cf5c7edf5a7a80e0b71d77f1a8b2a5d';

  // List of genres with their respective IDs
  const genres = [
    { name: 'All', id: '' },
    { name: 'Action', id: 28 },
    { name: 'Adventure', id: 12 },
    { name: 'Animation', id: 16 },
    { name: 'Comedy', id: 35 },
    { name: 'Crime', id: 80 },
    { name: 'Documentary', id: 99 },
    { name: 'Drama', id: 18 },
    { name: 'Family', id: 10751 },
    { name: 'Fantasy', id: 14 },
    { name: 'History', id: 36 },
    { name: 'Horror', id: 27 },
    { name: 'Music', id: 10402 },
    { name: 'Mystery', id: 9648 },
    { name: 'Romance', id: 10749 },
    { name: 'Science Fiction', id: 878 },
    { name: 'Thriller', id: 53 },
    { name: 'War', id: 10752 },
    { name: 'Western', id: 37 },
  ];

  // Function to fetch movies from the API based on genre or search query
  const fetchMovies = async () => {
    if (loading) return;
    setLoading(true);

    const endpoint = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${pageNo}`
      : `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=${pageNo}${genre ? `&with_genres=${genre}` : ''}`;

    try {
      const response = await axios.get(endpoint);
      setMovies((prev) => (pageNo === 1 ? response.data.results : [...prev, ...response.data.results]));
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch movies when page number, search query, or genre changes
  useEffect(() => {
    setMovies([]); // Reset movies when search query or genre changes
    setPageNo(1); // Reset to the first page for new search query or genre
    fetchMovies();
  }, [searchQuery, genre]);

  useEffect(() => {
    if (pageNo > 1) fetchMovies(); // Avoid initial fetch trigger
  }, [pageNo]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) setPageNo((prev) => prev + 1);
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [loading]);

  // Show notification when a movie is added to the watchlist
  const showAddNotification = (movieName) => {
    setNotification(`Added "${movieName}" to Watchlist!`);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  // Show notification when a movie is removed from the watchlist
  const showRemoveNotification = (movieName) => {
    setNotification(`Removed "${movieName}" from Watchlist!`);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  return (
    <div className="p-4">
      <div className="text-2xl m-10 font-bold text-center">
        {searchQuery ? `Results for "${searchQuery}"` : "Trending Movies"}
      </div>

      {/* Genre Selection - Responsive Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        {genres.map((g) => (
          <button
            key={g.id}
            onClick={() => setGenre(g.id)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors 
              ${genre === g.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}
              hover:bg-blue-500 hover:text-white`}
          >
            {g.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-around gap-10">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movieObj={movie}
              poster_path={movie.poster_path}
              name={movie.original_title}
              watchlist={watchlist}
              handleAddWatchlist={(movie) => { handleAddWatchlist(movie); showAddNotification(movie.original_title); }}
              handleRemoveFromWatchList={(movie) => { handleRemoveFromWatchList(movie); showRemoveNotification(movie.original_title); }}
            />
          ))
        ) : (
          <p className="text-center">No movies found.</p>
        )}
      </div>

      {loading && <p className="text-center py-4">Loading more movies...</p>}
      <div ref={loadMoreRef} className="h-1" />

      {/* Notification Popup */}
      {notification && (
        <div className="fixed top-4 right-4 bg-yellow-500 text-white p-4 rounded-lg shadow-lg">
          {notification}
        </div>
      )}
    </div>
  );
};

export default Movies;
