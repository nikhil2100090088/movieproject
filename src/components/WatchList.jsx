import React from 'react'

const WatchList = () => {
  return (
    <div className='flex flex-col items-center my-4'>
      <input 
        type="text" 
        placeholder='Search Movies' 
        className='h-[3rem] w-[18rem] border border-gray-300 mb-4'
      />
      
      <table className='border-collapse border border-gray-200 w-full text-center'>
        <thead className='border-b-2'>
          <tr>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Popularity</th>
            <th className='px-4 py-2'>Ratings</th>
            <th className='px-4 py-2'>Genre</th>
          </tr>
        </thead>
        <tbody>
          {/* Table rows will go here */}
        </tbody>
      </table>
    </div>
  )
}

export default WatchList
