import React, { useState, useEffect } from 'react';

function Watchlist({ watchlist, handleRemoveFromWatchList }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedWatchlist, setSortedWatchlist] = useState(watchlist);
  const [showNotification, setShowNotification] = useState(false);
  const [deletedMovieTitle, setDeletedMovieTitle] = useState('');

  useEffect(() => {
    setSortedWatchlist(watchlist);
  }, [watchlist]);

  const filteredWatchlist = sortedWatchlist.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortIncreasingByRating = () => {
    const sortedIncreasing = [...sortedWatchlist].sort(
      (movieA, movieB) => movieA.vote_average - movieB.vote_average
    );
    setSortedWatchlist(sortedIncreasing);
  };

  const sortDecreasingByRating = () => {
    const sortedDecreasing = [...sortedWatchlist].sort(
      (movieA, movieB) => movieB.vote_average - movieA.vote_average
    );
    setSortedWatchlist(sortedDecreasing);
  };

  const sortIncreasingByPopularity = () => {
    const sortedIncreasing = [...sortedWatchlist].sort(
      (movieA, movieB) => movieA.popularity - movieB.popularity
    );
    setSortedWatchlist(sortedIncreasing);
  };

  const sortDecreasingByPopularity = () => {
    const sortedDecreasing = [...sortedWatchlist].sort(
      (movieA, movieB) => movieB.popularity - movieA.popularity
    );
    setSortedWatchlist(sortedDecreasing);
  };

  const handleRemoveAndNotify = (movie) => {
    const deletedHistory = JSON.parse(localStorage.getItem('deletedHistory')) || [];
    const updatedHistory = [...deletedHistory, { ...movie, image: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` }];
    localStorage.setItem('deletedHistory', JSON.stringify(updatedHistory));

    handleRemoveFromWatchList(movie);
    setDeletedMovieTitle(movie.title);  // Set the title of the deleted movie
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
  };

  return (
    <>
      <div className='flex justify-center mb-4'>
        <input
          type='text'
          placeholder='Search Movies'
          className='h-[3rem] w-[16rem] bg-gray-800 text-white px-4 mt-9 rounded-lg shadow-md'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-lg m-8'>
        <table className='min-w-full text-center text-gray-900'>
          <thead className='bg-gray-800 text-white'>
            <tr>
              <th className='px-6 py-4 text-left'>Name</th>
              <th className='px-6 py-4'>
                <div className='flex items-center justify-center'>
                  <div onClick={sortIncreasingByRating} className='p-2 cursor-pointer'>
                    <i className='fa-solid fa-arrow-up'></i>
                  </div>
                  <div className='p-2'>Ratings</div>
                  <div onClick={sortDecreasingByRating} className='p-2 cursor-pointer'>
                    <i className='fa-solid fa-arrow-down'></i>
                  </div>
                </div>
              </th>
              <th className='px-6 py-4'>
                <div className='flex items-center justify-center'>
                  <div onClick={sortIncreasingByPopularity} className='p-2 cursor-pointer'>
                    <i className='fa-solid fa-arrow-up'></i>
                  </div>
                  <div className='p-2'>Popularity</div>
                  <div onClick={sortDecreasingByPopularity} className='p-2 cursor-pointer'>
                    <i className='fa-solid fa-arrow-down'></i>
                  </div>
                </div>
              </th>
              <th className='px-6 py-4'>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredWatchlist.map((movieObj) => (
              <tr
                className='border-b-2 transition-all hover:bg-gray-100'
                key={movieObj.id}
              >
                <td className='px-6 py-4 flex items-center'>
                  <img
                    className='h-[6rem] w-[10rem] rounded-md object-cover'
                    src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                    alt={movieObj.title}
                  />
                  <div className='mx-6'>{movieObj.title}</div>
                </td>
                <td className='px-6 py-4'>{movieObj.vote_average}</td>
                <td className='px-6 py-4'>{movieObj.popularity}</td>
                <td
                  className='px-6 py-4 text-red-600 cursor-pointer hover:text-red-800 transition-colors'
                  onClick={() => handleRemoveAndNotify(movieObj)}
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showNotification && (
        <div className='fixed top-0 right-0 mt-4 mr-4 bg-yellow-500 text-white p-4 rounded shadow-lg'>
          "{deletedMovieTitle}" -- Deleted Successfully 🗑️
        </div>
      )}
    </>
  );
}

export default Watchlist;
