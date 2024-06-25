import React from 'react';

const Poster = () => {
  return (
    <div className='relative h-[200vhgit] md:h-[110vh] bg-cover bg-center' style={{backgroundImage: 'url(https://wallpapers.com/images/high/jr-ntr-in-simple-white-shirt-gy771e2pvlndhso4.webp)'}}>
      <div className='absolute bottom-0 w-full text-white text-center bg-black bg-opacity-50'>
        <p className='py-4'>Jr.ntr</p>
      </div>
    </div>
  );
}

export default Poster;
