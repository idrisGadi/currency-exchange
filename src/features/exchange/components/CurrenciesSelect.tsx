import React, { Fragment, Dispatch, SetStateAction } from 'react';
import { Transition, Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import { currencies } from '../utils/currencies';
import { Currency } from '../types';

interface CurrenciesSelectProp {
  selected: Currency[];
  selectedBase: Currency;
  setSelected: Dispatch<SetStateAction<Currency[]>>;
}

export const CurrenciesSelect: React.FC<CurrenciesSelectProp> = ({
  selected,
  setSelected,
  selectedBase,
}) => {
  return (
    <div className='w-full max-w-screen-md'>
      <Listbox
        value={selected}
        onChange={(currency) => {
          if (currency.length < 3 || currency.length > 7) {
            return;
          }
          setSelected(currency);
        }}
        multiple
      >
        <div className='relative'>
          <Listbox.Button className='relative min-h-12 w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
            <span className='block truncate'>
              {selected.map((curreny) => curreny.code).join(', ')}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
              {currencies.map((currency) => (
                <Listbox.Option
                  key={currency.code}
                  disabled={currency === selectedBase}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-teal-600 text-white' : 'text-gray-900'
                    }`
                  }
                  value={currency}
                >
                  {({ active, selected, disabled }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'} ${disabled ? 'text-gray-400' : ''}`}
                      >
                        {currency.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <CheckIcon
                            className='h-5 w-5'
                            aria-hidden='true'
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
