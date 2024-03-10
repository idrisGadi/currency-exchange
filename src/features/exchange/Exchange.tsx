import React, { useState } from 'react';
import { CurrencySelect } from './components/CurrencySelect';
import { useExchangeRate } from './api/exhange-api';

interface Currency {
  code: string;
  name: string;
  decimal_digits: number;
  name_plural: string;
  rounding: number;
  symbol: string;
  symbol_native: string;
}

const defaultCurrency = {
  code: 'GBP',
  name: 'British Pound Sterling',
  decimal_digits: 2,
  name_plural: 'British pounds sterling',
  rounding: 0,
  symbol: '£',
  symbol_native: '£',
};

export const Exchange: React.FC = () => {
  const [selected, setSelected] = useState<Currency>(defaultCurrency);
  const { data } = useExchangeRate(selected.code);
  return (
    <div className='mx-auto flex w-full flex-col gap-10'>
      <div className='flex gap-4'>
        <input
          type='number'
          id='Quantity'
          inputMode='numeric'
          value='1'
          className='h-12 w-32 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm lg:text-lg [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none'
        />
        <CurrencySelect
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
          <thead className='text-left'>
            <tr>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>Symbol</th>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>Currency</th>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>Date</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200'>
            <tr>
              <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>$</td>
              <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>USD</td>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>{data?.USD}</td>
            </tr>

            <tr>
              <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>€</td>
              <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>EUR</td>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>{data?.EUR}</td>
            </tr>

            <tr>
              <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>¥</td>
              <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>JPY</td>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>{data?.JPY}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
