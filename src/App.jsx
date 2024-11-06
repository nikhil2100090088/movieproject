import "./App.css";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Poster from "./components/Poster";
import WatchList from "./components/WatchList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [watchlist, setWatchlist] = useState([]);

  const handleAddWatchlist = (movieObj) => {
    if (!watchlist.some(movie => movie.id === movieObj.id)) {
      setWatchlist([...watchlist, movieObj]);
      console.log([...watchlist, movieObj]);
    } else {
      console.log('Movie already in watchlist');
    }
  };

  const handleRemoveFromWatchList = (movieObj) => {
    const filteredWatchList = watchlist.filter((movie) => movie.id !== movieObj.id);
    setWatchlist(filteredWatchList);
    console.log(filteredWatchList);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/movieproject/"
            element={
              <>
                <Poster />
                <Movies
                  watchlist={watchlist}
                  handleAddWatchlist={handleAddWatchlist}
                  handleRemoveFromWatchList={handleRemoveFromWatchList}
                />
              </>
            }
          />
          <Route path="/watchlist" element={<WatchList watchlist={watchlist} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
