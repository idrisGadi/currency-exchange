import { useQuery } from '@tanstack/react-query';
interface ExchangeApiResponse {
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
    const url = `${import.meta.env.VITE_FXRATE_API_BASE_URL}/historical?api_key=${import.meta.env.VITE_FXRATE_API_KEY}&date=${date}&base=${baseCurrency}&resolution=1h&amount=1&format=json`;

    const res: Response = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: ExchangeApiResponse = await res.json();
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

interface TimeseriesApiResponse {
  success: boolean;
  terms: string;
  privacy: string;
  base: string;
  start_date: string;
  end_date: string;
  rates: Record<string, Record<string, number>>;
}

const formatDate = (date: Date): string => {
  const formatedDate = date.toISOString().split('T')[0];
  return formatedDate;
};

const fetchTimeseriesData = async ({
  base,
  compare,
  date,
}: {
  base: string;
  compare: string[];
  date: string;
}) => {
  try {
    const formatedCompare = compare.join(',');
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate());
    startDate.setDate(endDate.getDate() - 90); // past 7 seven days
    const formatedEndDate = formatDate(endDate);
    const formatedStartDate = formatDate(startDate);
    const url = `https://api.fxratesapi.com/timeseries?start_date=${formatedStartDate}&end_date=${formatedEndDate}&base=${base || 'USD'}&currencies=${formatedCompare}`;
    const res: Response = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: TimeseriesApiResponse = await res.json();
    const rates = data.rates;
    return rates;
  } catch (error) {
    console.error('fetch timeseries', error);
  }
};

export const useTimeseriesData = (base: string, compare: string[], date: string) => {
  return useQuery({
    queryKey: ['timeseries', base, compare, date],
    queryFn: () => fetchTimeseriesData({ base, compare, date }),
    staleTime: 60 * 60 * 1000, // 1Hour
    gcTime: 60 * 60 * 1000, // 1Hour
    refetchOnWindowFocus: false,
  });
};
