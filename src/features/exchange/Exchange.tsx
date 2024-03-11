import React, { useState } from 'react';
import { CurrencySelect } from './components/CurrencySelect';
import { CurrenciesSelect } from './components/CurrenciesSelect';
import { DatePicker } from './components/DatePicker';
import { useExchangeRate } from './api/exhange-api';
import { Currency } from './types';
import { defaultCurrency, defaultCompareCurrencies } from './utils/default-values';

export const Exchange: React.FC = () => {
  const [selectedBase, setSelectedBase] = useState<Currency>(defaultCurrency);
  const [selectedCompare, setSelectedCompare] = useState<Currency[]>(defaultCompareCurrencies);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState(1);
  const { data } = useExchangeRate(selectedBase.code);
  return (
    <div className='mx-auto flex w-full flex-col gap-10'>
      <div className='flex flex-wrap gap-4'>
        <input
          type='number'
          id='Quantity'
          inputMode='numeric'
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className='h-12 w-32 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm lg:text-lg [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none'
        />
        <CurrencySelect
          selected={selectedBase}
          setSelected={setSelectedBase}
        />
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <div>
        <CurrenciesSelect
          selected={selectedCompare}
          setSelected={setSelectedCompare}
        />
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
          <thead className='text-left'>
            <tr>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>Symbol</th>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>Currency</th>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                {data
                  ? new Intl.DateTimeFormat('en-GB').format(new Date(data.timestamp * 1000))
                  : null}
              </th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200'>
            {selectedCompare.map((currency) => (
              <tr key={currency.code}>
                <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  {currency.symbol}
                </td>
                <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  {currency.name}
                </td>
                <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                  {data?.rates?.[currency.code] ? data?.rates?.[currency.code] * amount : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
