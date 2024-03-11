import { currencies } from './currencies';

const indexOfGBP = currencies.findIndex((item) => item.code === 'GBP');
const indexOfUSD = currencies.findIndex((item) => item.code === 'USD');
const indexOfEUR = currencies.findIndex((item) => item.code === 'EUR');
const indexOfJPY = currencies.findIndex((item) => item.code === 'JPY');
const indexOfCHF = currencies.findIndex((item) => item.code === 'CHF');
const indexOfCAD = currencies.findIndex((item) => item.code === 'CAD');
const indexOfAUD = currencies.findIndex((item) => item.code === 'AUD');
const indexOfZAR = currencies.findIndex((item) => item.code === 'ZAR');

export const defaultCurrency = currencies[indexOfGBP];

export const defaultCompareCurrencies = [
  currencies[indexOfUSD],
  currencies[indexOfEUR],
  currencies[indexOfJPY],
  currencies[indexOfCHF],
  currencies[indexOfCAD],
  currencies[indexOfAUD],
  currencies[indexOfZAR],
];
