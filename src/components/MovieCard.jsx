// import React from 'react'

// const MovieCard = ({poster_path}) => {
//   return (
//     <div className='h-[33vh] w-[100px] bg-center bg-cover rounded-xl  hover:scale-110 duration-300 hover:cursor-pointer' style={{backgroundImage : 'url(https://image.tmdb.org/t/p/original ${poster_path})'}}>

//     </div>
//   )
// }

// export default MovieCard

// import React from 'react';

// function MovieCard({ poster_path , name}) {
//   return (
//     <div
//       className='h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300'
//       style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${poster_path})` }}
//     >
//       {/* Content of the movie card */}
//       <div className='text-white text-xl w-full p-2 text-center bg-gray-900/80'>
//         {name}
//       </div>

//     </div>
//   );
// }


import React from 'react';

function MovieCard({ poster_path, name }) {
  const imageUrl = `https://image.tmdb.org/t/p/original${poster_path}`;

  return (
    <div
      className='relative h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300'
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Overlay div for text */}
      <div className='absolute bottom-0 left-0 right-0 text-white  p-2 bg-gray-900/80'>
        <div className='text-center'>{name}</div>
      </div>
    </div>
  );
}

export default MovieCard;


