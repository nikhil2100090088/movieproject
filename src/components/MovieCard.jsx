// MovieCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movieObj, poster_path, name, handleAddWatchlist, handleRemoveFromWatchList, watchlist }) {
  const navigate = useNavigate();
  const imageUrl = `https://image.tmdb.org/t/p/original${poster_path}`;

  function doesContain(movieObj) {
    return watchlist.some(watchlistMovie => watchlistMovie.id === movieObj.id);
  }

  const handleNavigateToDetail = (e) => {
    e.stopPropagation(); // Prevent other onClick events
    navigate(`/movie/${movieObj.id}`); // Redirect to the movie detail page
  };

  return (
    <div className="relative w-[250px]">
      <div 
        className="relative h-[50vh] bg-center bg-cover rounded-xl cursor-pointer"
        style={{ backgroundImage: `url(${imageUrl})` }}
        onClick={handleNavigateToDetail}
      >
        {doesContain(movieObj) ? (
          <div 
            onClick={(e) => { 
              e.stopPropagation();
              handleRemoveFromWatchList(movieObj);
            }} 
            className="absolute top-2 right-2 flex justify-center h-8 w-8 items-center rounded-lg" 
            style={{ border: "1px solid black" }}
          >
            &#10060;
          </div>
        ) : (
          <div 
            onClick={(e) => { 
              e.stopPropagation();
              handleAddWatchlist(movieObj);
            }} 
            className="absolute top-2 right-2 flex justify-center h-8 w-8 items-center rounded-lg" 
            style={{ border: "1px solid black" }}
          >
            &#128525;
          </div>
        )}
      </div>
      <div className="text-white text-center py-2 bg-gray-900/80 rounded-b-xl">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
