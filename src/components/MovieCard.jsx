import React from "react";

function MovieCard({ movieObj, poster_path, name, watchlist, handleAddWatchlist, handleRemoveFromWatchList }) {
  const imageUrl = `https://image.tmdb.org/t/p/original${poster_path}`;
  const isInWatchlist = watchlist.some(movie => movie.id === movieObj.id);

  const handleClick = () => {
    if (isInWatchlist) {
      handleRemoveFromWatchList(movieObj);
    } else {
      handleAddWatchlist(movieObj);
    }
  };

  return (
    <div
      className="relative h-[50vh] w-[250px] bg-center bg-cover rounded-xl hover:scale-110 duration-300"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div
        onClick={handleClick}
        className="absolute top-2 right-2 flex justify-center h-8 w-8 items-center rounded-lg bg-white cursor-pointer z-10"
        style={{ border: "1px solid black" }}
      >
        {isInWatchlist ? '✖️' : '😍'}
      </div>
      <div className="absolute bottom-0 left-0 right-0 text-white p-2 bg-gray-900/80">
        <div className="text-center">{name}</div>
      </div>
    </div>
  );
}

export default MovieCard;
