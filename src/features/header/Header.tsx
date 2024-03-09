import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className='w-fit'>
      <h1 className='p-2 text-6xl font-semibold'>Currency Exchange</h1>
      <p className='text-end text-sm font-light'>
        poweredby:{' '}
        <a
          href='https://fxratesapi.com/'
          target='_blank'
          rel='nooppner noreferrer'
          className='text-blue-500 underline underline-offset-2'
        >
          FXRatesAPI
        </a>
      </p>
    </div>
  );
};
