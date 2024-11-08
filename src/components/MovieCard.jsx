import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function MovieCard({ movieObj, poster_path, name }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const imageUrl = `https://image.tmdb.org/t/p/original${poster_path}`;
  const navigate = useNavigate(); // hook for redirection

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNavigateToDetail = (e) => {
    e.stopPropagation(); // Prevent card flip when navigating
    navigate(`/movie/${movieObj.id}`); // Redirect to the movie detail page
  };

  return (
    <div className="relative w-[250px]">
      <div className="relative h-[50vh] rounded-xl transition-transform duration-500 transform-style-3d perspective" onClick={handleFlip}>
        {/* Front Side - Movie Poster */}
        <div className={`absolute inset-0 bg-center bg-cover rounded-xl backface-hidden`} style={{ backgroundImage: `url(${imageUrl})` }} />
        
        {/* Back Side - (Optional) You can add this if you want to flip back */}
        <div className="absolute inset-0 bg-gray-800 text-white p-4 rounded-xl rotate-y-180 backface-hidden">
          <h3 className="text-lg font-bold mb-2">{name}</h3>
        </div>
      </div>

      {/* Movie Title below the image, click to navigate to movie detail page */}
      <div onClick={handleNavigateToDetail} className="text-white text-center py-2 bg-gray-900/80 rounded-b-xl cursor-pointer">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
