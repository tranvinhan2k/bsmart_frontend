import { UseControllerReturn } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { TextField } from '@mui/material';

interface TimeInputProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}
function TimeInput({ controller, placeholder }: TimeInputProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = controller;
  const [timeInput, setTimeInput] = useState<Dayjs | null>();

  const convertToSeconds = (day: Dayjs | null) => {
    if (day) {
      const hours = day.get('hours');
      const minutes = day.get('minutes');
      const seconds = day.get('seconds');
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      onChange(totalSeconds);
      console.log(totalSeconds);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        value={timeInput}
        onChange={(paramValue: Dayjs | null) => {
          console.log('second', paramValue);
          setTimeInput(paramValue);
          convertToSeconds(paramValue);
        }}
        renderInput={(props) => <TextField {...props} />}
        views={['hours', 'minutes', 'seconds']}
        ampm={false}
      />
    </LocalizationProvider>
  );
}
export default TimeInput;
