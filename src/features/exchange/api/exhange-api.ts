import { useQuery } from '@tanstack/react-query';
interface ApiResponse {
  success: boolean;
  terms: string;
  privacy: string;
  timestamp: number;
  date: string;
  base: string;
  rates: Record<string, number>;
}

const fetchExchangeRate = async ({ baseCurrency }: { baseCurrency: string }) => {
  try {
    const res: Response = await fetch(
      `https://api.fxratesapi.com/latest?base=${baseCurrency}&resolution=1h&amount=1&format=json`,
    );
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: ApiResponse = await res.json();
    const rates = data.rates;
    return rates;
  } catch (error) {
    console.error('fetch rate', error);
  }
};

export const useExchangeRate = (baseValue: string) => {
  return useQuery({
    queryKey: ['exchangeRate', baseValue],
    queryFn: () => fetchExchangeRate({ baseCurrency: baseValue }),
    staleTime: 60 * 60 * 1000, // 1Hour
    gcTime: 60 * 60 * 1000, // 1Hour
    refetchOnWindowFocus: false,
  });
};
