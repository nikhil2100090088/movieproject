// MovieCard.jsx
import React, { useState } from "react";

function MovieCard({ movieObj, poster_path, name, watchlist, handleAddWatchlist, handleRemoveFromWatchList }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const imageUrl = `https://image.tmdb.org/t/p/original${poster_path}`;
  const isInWatchlist = watchlist.some(movie => movie.id === movieObj.id);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleClickWatchlist = (e) => {
    e.stopPropagation(); // Prevent flip on watchlist click
    if (isInWatchlist) {
      handleRemoveFromWatchList(movieObj);
    } else {
      handleAddWatchlist(movieObj);
    }
  };

  return (
    <div className="relative w-[250px]">
      <div className="relative h-[50vh] rounded-xl transition-transform duration-500 transform-style-3d perspective" onClick={handleFlip}>
        {/* Front Side - Movie Poster */}
        <div className={`absolute inset-0 bg-center bg-cover rounded-xl backface-hidden`} style={{ backgroundImage: `url(${imageUrl})` }}>
          <div onClick={handleClickWatchlist} className="absolute top-2 right-2 flex justify-center h-8 w-8 items-center rounded-lg bg-white cursor-pointer z-10 border border-black">
            {isInWatchlist ? "✖️" : "😍"}
          </div>
        </div>

        {/* Back Side - Movie Overview */}
        <div className="absolute inset-0 bg-gray-800 text-white p-4 rounded-xl rotate-y-180 backface-hidden">
          <h3 className="text-lg font-bold mb-2">{name}</h3>
          <p className="text-sm">{movieObj.overview}</p>
        </div>
      </div>

      {/* Movie Title below the image */}
      <div className="text-white text-center py-2 bg-gray-900/80 rounded-b-xl">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
