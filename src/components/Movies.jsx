import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';
import Pagination from './Pagination';

const Movies = ({ watchlist, handleAddWatchlist, handleRemoveFromWatchList }) => {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handlePrev = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=4cf5c7edf5a7a80e0b71d77f1a8b2a5d&language=en-US&page=${pageNo}`
      )
      .then((res) => {
        setMovies(res.data.results);
        console.log(res.data.results);
      });
  }, [pageNo]);

  return (
    <div className="p-5">
      <div className="text-2xl m-5 font-bold text-center">Trending Movies</div>
      <div className="flex flex-row flex-wrap justify-around gap-6">
        {movies.map((movieObj) => (
          <MovieCard
            key={movieObj.id}
            movieObj={movieObj}
            poster_path={movieObj.poster_path}
            name={movieObj.original_title}
            watchlist={watchlist}
            handleAddWatchlist={handleAddWatchlist}
            handleRemoveFromWatchList={handleRemoveFromWatchList}
          />
        ))}
      </div>
      <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev} />
    </div>
  );
};

export default Movies;
