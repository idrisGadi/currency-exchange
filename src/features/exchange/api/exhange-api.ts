import { useQuery } from '@tanstack/react-query';

const fetchExchangeRate = async ({ baseCurrency }: { baseCurrency: string }) => {
  try {
    const res = await fetch(
      `https://api.fxratesapi.com/latest?base=${baseCurrency}&currencies=USD,EUR,JPY&resolution=1m&amount=1&format=json`,
    );
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    // const rates = (await data.rates) as Record<string, number>;
    return data;
  } catch (error) {
    console.error('fetch rate', error);
  }
};

export const useExchangeRate = (baseValue: string) => {
  return useQuery({
    queryKey: ['exchangeRate', baseValue],
    queryFn: () => fetchExchangeRate({ baseCurrency: baseValue }),
  });
};
