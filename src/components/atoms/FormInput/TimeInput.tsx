import { UseControllerReturn } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers';
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        value={value}
        onChange={onChange}
        renderInput={(props) => <TextField {...props} />}
        views={['hours', 'minutes', 'seconds']}
      />
    </LocalizationProvider>
  );
}
export default TimeInput;
