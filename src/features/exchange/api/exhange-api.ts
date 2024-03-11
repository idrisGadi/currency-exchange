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

const fetchExchangeRate = async ({
  baseCurrency,
  date,
}: {
  baseCurrency: string;
  date: string;
}) => {
  try {
    const res: Response = await fetch(
      `${import.meta.env.VITE_FXRATE_API_BASE_URL}/historical?api_key=${import.meta.env.VITE_FXRATE_API_KEY}&date=${date}&base=${baseCurrency}&resolution=1h&amount=1&format=json`,
    );
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: ApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error('fetch rate', error);
  }
};

export const useExchangeRate = (baseValue: string, date: string) => {
  return useQuery({
    queryKey: ['exchangeRate', baseValue, date],
    queryFn: () => fetchExchangeRate({ baseCurrency: baseValue, date }),
    staleTime: 60 * 60 * 1000, // 1Hour
    gcTime: 60 * 60 * 1000, // 1Hour
    refetchOnWindowFocus: false,
  });
};
