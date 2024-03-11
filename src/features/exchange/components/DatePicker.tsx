import React, { useState, useEffect } from 'react';

interface DatePickerProps {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}

export const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, setSelectedDate }) => {
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  const formatDate = (date: Date): string => {
    const formatedDate = date.toISOString().split('T')[0];
    return formatedDate;
  };

  useEffect(() => {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - 90); // Only accept date upto past 90days

    const formatedToday = formatDate(today);
    const formatedPastDate = formatDate(pastDate);

    setMaxDate(formatedToday);
    setMinDate(formatedPastDate);
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className='relative min-h-12 max-w-sm cursor-default overflow-hidden rounded-lg bg-white  text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
      <input
        id='date'
        type='date'
        name='date'
        aria-label='Select date'
        className='block h-full w-full appearance-none rounded-lg p-3'
        placeholder='Select Date'
        value={selectedDate}
        max={maxDate}
        min={minDate}
        onChange={handleDateChange}
      />
    </div>
  );
};
