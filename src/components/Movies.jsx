import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard'; // Import MovieCard component here
import axios from 'axios';

const Movies = ({ searchQuery, watchlist, handleAddWatchlist, handleRemoveFromWatchList }) => {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false); // To track loading state

  const API_KEY = '4cf5c7edf5a7a80e0b71d77f1a8b2a5d';

  // Function to fetch movies
  const fetchMovies = async () => {
    if (loading) return; // Prevent multiple API calls while loading
    setLoading(true);

    try {
      const endpoint = searchQuery
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${pageNo}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNo}`;

      const response = await axios.get(endpoint);
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]); // Append new movies
      setIsSearching(!!searchQuery);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [pageNo, searchQuery]);

  // Intersection Observer callback to detect when we reach the bottom of the page
  const loadMoreRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPageNo((prevPageNo) => prevPageNo + 1); // Increment page number to load next set of movies
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current); // Observe the load more element
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current); // Clean up observer
      }
    };
  }, [loading]);

  return (
    <div className="p-4">
      <div className="text-2xl m-10 font-bold text-center">Trending Movies</div>
      <div className="flex flex-row flex-wrap justify-around gap-10">
        {movies.map((movieObj) => (
          <Link key={movieObj.id} to={`/movie/${movieObj.id}`}>
            <MovieCard
              movieObj={movieObj}
              poster_path={movieObj.poster_path}
              name={movieObj.original_title}
              watchlist={watchlist}
              handleAddWatchlist={handleAddWatchlist}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
            />
          </Link>
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="text-center py-4">
          <p>Loading more movies...</p>
        </div>
      )}

      {/* This div is used as the trigger point for the intersection observer */}
      <div ref={loadMoreRef}></div>
    </div>
  );
};

export default Movies;