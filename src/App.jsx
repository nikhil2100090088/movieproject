import React, { useState } from "react";
import "./App.css";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Poster from "./components/Poster";
import WatchList from "./components/WatchList";
import MovieDetail from "./components/MovieDetail"; // Import MovieDetail
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle adding movie to watchlist
  const handleAddWatchlist = (movieObj) => {
    if (!watchlist.some((movie) => movie.id === movieObj.id)) {
      setWatchlist([...watchlist, movieObj]); // Update watchlist state
    }
  };

  // Handle removing movie from watchlist
  const handleRemoveFromWatchList = (movieObj) => {
    const filteredWatchlist = watchlist.filter(
      (movie) => movie.id !== movieObj.id
    );
    setWatchlist(filteredWatchlist); // Update watchlist state
  };

  // Handle search query change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <BrowserRouter>
      <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <Routes>
        {/* Route for home page, showing Movies and Poster if no search */}
        <Route
          path="/movieproject/"
          element={
            <>
              {searchQuery === "" && <Poster />}
              <Movies
                searchQuery={searchQuery}
                watchlist={watchlist}
                handleAddWatchlist={handleAddWatchlist}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
              />
            </>
          }
        />
        {/* Route for Watchlist */}
        <Route
          path="/watchlist"
          element={
            <WatchList
              watchlist={watchlist}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
            />
          }
        />
        {/* Route for Movie Detail page */}
        <Route
          path="/movie/:id"
          element={<MovieDetail handleAddWatchlist={handleAddWatchlist} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
