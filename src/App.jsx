import "./App.css";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Poster from "./components/Poster";
import WatchList from "./components/WatchList";
import MovieDetail from "./components/MovieDetail";  // Import the MovieDetail component
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddWatchlist = (movieObj) => {
    if (!watchlist.some((movie) => movie.id === movieObj.id)) {
      setWatchlist([...watchlist, movieObj]);
    }
  };

  const handleRemoveFromWatchList = (movieObj) => {
    const filteredWatchList = watchlist.filter((movie) => movie.id !== movieObj.id);
    setWatchlist(filteredWatchList);
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
        <Route path="/watchlist" element={<WatchList watchlist={watchlist} />} />
        <Route path="/movie/:id" element={<MovieDetail />} /> {/* Add new route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

