// Movies.js (or your file that renders the movie cards)
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard'; // Import MovieCard component here
import axios from 'axios';
import Pagination from './Pagination';

const Movies = ({ searchQuery, watchlist, handleAddWatchlist, handleRemoveFromWatchList }) => {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const API_KEY = '4cf5c7edf5a7a80e0b71d77f1a8b2a5d';

  const handlePrev = () => {
    if (pageNo > 1) setPageNo(pageNo - 1);
  };

  const handleNext = () => setPageNo(pageNo + 1);

  const fetchMovies = async () => {
    try {
      const endpoint = searchQuery
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${pageNo}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNo}`;

      const response = await axios.get(endpoint);
      setMovies(response.data.results);
      setIsSearching(!!searchQuery);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [pageNo, searchQuery]);

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

      {!isSearching && (
        <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev} />
      )}
    </div>
  );
};

export default Movies;
