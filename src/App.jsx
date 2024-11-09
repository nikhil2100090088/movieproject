import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import Poster from "./components/Poster";
import WatchList from "./components/WatchList";
import MovieDetail from "./components/MovieDetail";

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddWatchlist = (movieObj) => {
    if (!watchlist.some((movie) => movie.id === movieObj.id)) {
      setWatchlist([...watchlist, movieObj]);
    }
  };

  const handleRemoveFromWatchList = (movieObj) => {
    setWatchlist(watchlist.filter((movie) => movie.id !== movieObj.id));
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <BrowserRouter>
      <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <Routes>
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
        <Route
          path="/watchlist"
          element={
            <WatchList
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              watchlist={watchlist}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
            />
          }
        />
        <Route
          path="/movie/:id"
          element={
            <MovieDetail
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              handleAddWatchlist={handleAddWatchlist}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
