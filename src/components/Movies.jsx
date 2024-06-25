import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import axios from 'axios'

const Movies = () => {

    const [movies , setMovies] = useState( [])


     useEffect(()=>{
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=4cf5c7edf5a7a80e0b71d77f1a8b2a5d&language=en-US&page=1').then(function(res){ 
             setMovies(res.data.results)
             console.log(res.data.results)
     })
     } , [])



  return (
    <div className='p-5'>
        <div className='text-2xl m-5 font-bold text-center '>
            Trending Movies

        </div>
        <div className='flex flex-row flex-wrap justify-around gap-6'>
            
            {movies.map((movieObj)=>{
                return <MovieCard poster_path={movieObj.poster_path} name={movieObj.original_title}  />
            })}
            

        </div>
    </div>
  )
}

export default Movies
// https://api.themoviedb.org/3/movie/popular?api_key=4cf5c7edf5a7a80e0b71d77f1a8b2a5d&language=en-US&page=1