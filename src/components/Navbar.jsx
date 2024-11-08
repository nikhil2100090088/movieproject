import React from 'react';
import { Link } from 'react-router-dom';
import { FaFilm } from 'react-icons/fa'; // Movie camera icon from Font Awesome

const CineHubNavbar = ({ searchQuery, onSearchChange, onSearch }) => {
  return (
    <div className="flex items-center justify-between px-8 py-4 bg-black text-white shadow-lg relative">
      {/* Navbar Background with Black Color */}

      <div className="flex items-center space-x-8 relative z-10">
        {/* CineHub Name with Movie Camera Icon */}
        <Link
          to="/movieproject/"
          className="flex items-center text-4xl font-bold text-white hover:text-yellow-400 transition-all duration-300 ease-in-out"
        >
          <FaFilm className="mr-2 text-3xl" /> {/* Movie camera icon */}
          CineHub
        </Link>

        {/* Home Link */}
        <Link
          to="/movieproject/"
          className="text-lg font-medium text-white hover:text-yellow-400 transition-colors duration-300 ease-in-out"
        >
          Home
        </Link>

        {/* Watchlist Link */}
        <Link
          to="/watchlist"
          className="text-lg font-medium text-white hover:text-yellow-400 transition-colors duration-300 ease-in-out"
        >
          Watchlist
        </Link>
      </div>

          {/* Search Bar */}
          <form onSubmit={onSearch} className="flex items-center justify-center bg-black p-2 rounded-full shadow-lg w-1/3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search for movies..."
          className="bg-transparent text-white border-2 border-gray-600 px-4 py-2 w-full rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r-full hover:bg-blue-700 transition duration-300"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default CineHubNavbar;