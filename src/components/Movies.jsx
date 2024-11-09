// Movies.jsx
import React, { useEffect, useState, useRef } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';

const Movies = ({ searchQuery, watchlist, handleAddWatchlist, handleRemoveFromWatchList }) => {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef(null);

  const API_KEY = '4cf5c7edf5a7a80e0b71d77f1a8b2a5d';

  // Function to fetch movies from the API
  const fetchMovies = async () => {
    if (loading) return;
    setLoading(true);

    const endpoint = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${pageNo}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNo}`;

    try {
      const response = await axios.get(endpoint);
      setMovies((prev) => [...prev, ...response.data.results]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch movies when page number or search query changes
  useEffect(() => {
    setMovies([]); // Reset movies when search query changes
    setPageNo(1); // Reset to first page for new search query
    fetchMovies();
  }, [searchQuery]);

  useEffect(() => {
    if (pageNo > 1) fetchMovies(); // Avoid initial fetch trigger
  }, [pageNo]);

  // Infinite scroll observer
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

  return (
    <div className="p-4">
      <div className="text-2xl m-10 font-bold text-center">
        {searchQuery ? `Results for "${searchQuery}"` : "Trending Movies"}
      </div>
      <div className="flex flex-wrap justify-around gap-10">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movieObj={movie}
            poster_path={movie.poster_path}
            name={movie.original_title}
            watchlist={watchlist}
            handleAddWatchlist={handleAddWatchlist}
            handleRemoveFromWatchList={handleRemoveFromWatchList}
          />
        ))}
      </div>

      {loading && <p className="text-center py-4">Loading more movies...</p>}
      <div ref={loadMoreRef} className="h-1" />
    </div>
  );
};

export default Movies;
