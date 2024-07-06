import React from 'react';

export default function TopButtons({ setQuery }) {
  const cities = [
    { id: 1, title: 'Mumbai' },
    { id: 2, title: 'Kolkata' },
    { id: 3, title: 'Bangalore' },
    { id: 4, title: 'Hyderabad' },
  ];

  return (
    <div className='flex flex-wrap justify-around my-6'>
      {cities.map((city) => (
        <button
          key={city.id}
          className='text-white font-bold drop-shadow-2xl shadow-black text-lg py-2 px-4 transition ease-out hover:text-sky-400 mb-2 mx-2'
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}
