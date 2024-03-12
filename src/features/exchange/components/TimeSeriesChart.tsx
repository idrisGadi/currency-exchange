import { useMemo } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { enGB } from 'date-fns/locale';
import { useTimeseriesData } from '../api/exhange-api';
import { Currency } from '../types';

ChartJS.register(...registerables);

export const TimeSeriesChart = ({
  selectedBase,
  selectedCompare,
  date,
}: {
  selectedBase: Currency;
  selectedCompare: Currency[];
  date: string;
}) => {
  const { isLoading, data: timeseriesData } = useTimeseriesData(
    selectedBase.code,
    selectedCompare.map((currency) => currency.code),
    date,
  );

  const graphOptions = useMemo(() => {
    if (timeseriesData) {
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
        scales: {
          x: {
            display: true,
            adapters: {
              date: { locale: enGB },
              type: 'time',
              distribution: 'linear',
              time: {
                parser: 'yyyy-MM-dd',
                unit: 'month',
              },
              title: {
                display: true,
                text: 'Date',
              },
            },
          },
        },
      };

      const labels = Object.keys(timeseriesData);
      const dataSeries = selectedCompare.map((currency) => {
        return {
          label: currency.name,
          data: labels.map((date) => timeseriesData?.[date]?.[currency.code]),
        };
      });

      const data = {
        labels: labels.map((item) => item.split('T')[0]),
        datasets: dataSeries.map((item) => ({
          label: item.label,
          data: item.data,
          tension: 0.4,
        })),
      };

      return { options, data };
    }
  }, [timeseriesData, selectedCompare]);

  if (isLoading || !graphOptions) {
    return (
      <div className='h-[500px] w-full rounded-lg border-2 bg-white p-2 shadow-md'>
        <div className='h-full animate-pulse'>
          <div className='h-full w-full rounded-lg bg-gray-300'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='h-full min-h-[500px] w-full rounded-lg border-transparent bg-white p-4 shadow-md'>
      <Line
        options={graphOptions?.options}
        data={graphOptions?.data}
      />
    </div>
  );
};
