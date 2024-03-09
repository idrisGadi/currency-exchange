import React from 'react';
import { CurrencySelect } from './components/CurrencySelect';

export const Exchange: React.FC = () => {
  return (
    <div className='mx-auto flex w-fit gap-4'>
      <input
        type='number'
        id='Quantity'
        inputMode='numeric'
        value='1'
        className='h-12 w-32 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm lg:text-lg [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none'
      />
      <CurrencySelect />
    </div>
  );
};
