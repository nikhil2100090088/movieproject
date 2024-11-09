import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [cast, setCast] = useState([]);

  const API_KEY = '4cf5c7edf5a7a80e0b71d77f1a8b2a5d';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: { api_key: API_KEY, language: 'en-US' },
        });
        setMovie(movieResponse.data);

        // Fetch videos
        const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
          params: { api_key: API_KEY },
        });
        setVideos(videoResponse.data.results);

        // Fetch cast information
        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
          params: { api_key: API_KEY },
        });
        setCast(creditsResponse.data.cast.slice(0, 10));
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div className="bg-white text-black min-h-screen">
      {movie ? (
        <div>
          {/* Hero Section */}
          <div className="relative bg-cover bg-center h-[500px]" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}>
            <div className="absolute inset-0 bg-gradient-to-b from-white opacity-70"></div>
            <div className="relative z-10 flex items-center justify-start h-full p-8">
              <div className="flex flex-col md:flex-row items-center space-x-8">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-48 h-72 md:w-64 md:h-96 object-cover shadow-lg border-4 border-black rounded-md"
                />
                <div className="text-black mt-4 md:mt-0">
                  <h1 className="text-4xl md:text-5xl font-semibold">{movie.title}</h1>
                  <p className="text-lg md:text-xl mt-2">{movie.release_date} | {movie.runtime} mins</p>
                </div>
              </div>
            </div>
          </div>

          {/* Movie Info Section */}
          <div className="p-8 space-y-6">
            {/* Genres */}
            <div>
              <h2 className="text-2xl font-semibold">Genres</h2>
              <p className="text-lg">{movie.genres.map(genre => genre.name).join(', ')}</p>
            </div>

            {/* Production Companies */}
            <div>
              <h2 className="text-2xl font-semibold">Production Companies</h2>
              <p className="text-lg">{movie.production_companies.map(company => company.name).join(', ')}</p>
            </div>

            {/* Budget */}
            <div>
              <h2 className="text-2xl font-semibold">Budget</h2>
              <p className="text-lg">${movie.budget.toLocaleString()}</p>
            </div>

            {/* Revenue */}
            <div>
              <h2 className="text-2xl font-semibold">Revenue</h2>
              <p className="text-lg">${movie.revenue.toLocaleString()}</p>
            </div>

            {/* Director */}
            <div>
              <h2 className="text-2xl font-semibold">Director</h2>
              <p className="text-lg">
                {cast.find(member => member.job === 'Director')?.name || 'N/A'}
              </p>
            </div>

            {/* Tagline */}
            <div>
              <h2 className="text-2xl font-semibold">Tagline</h2>
              <p className="text-lg">{movie.tagline || 'No tagline available'}</p>
            </div>

            {/* Overview */}
            <div>
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="text-lg">{movie.overview}</p>
            </div>
          </div>

         {/* Videos Section (Limited to 4 Videos) */}
         <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Watch Trailers</h2>
            {videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {videos.slice(0, 4).map((video) => (
                  <div key={video.id} className="flex justify-center">
                    <iframe
                      title={video.name}
                      width="500"
                      height="280"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      className="rounded-lg shadow-lg"
                      allowFullScreen
                    ></iframe>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-lg mt-4">No trailers available.</p>
            )}
          </div>

          {/* Cast Section */}
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Cast</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
              {cast.map((actor) => (
                <div key={actor.cast_id} className="text-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                    alt={actor.name}
                    className="w-24 h-24 object-cover rounded-full mx-auto mb-2 transition-all hover:scale-105 hover:shadow-lg"
                  />
                  <p className="text-sm font-medium">{actor.name}</p>
                  <p className="text-xs text-gray-600">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-xl p-8">Loading...</p>
      )}
    </div>
  );
}

export default MovieDetail;
