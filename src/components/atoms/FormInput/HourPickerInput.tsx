import { TextField } from '@mui/material';
import { UseControllerReturn } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers';

interface HourPickerInputProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}
function HourPickerInput({ controller, placeholder }: HourPickerInputProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = controller;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        value={value}
        onChange={(newValue) => onChange(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={placeholder}
            onBlur={onBlur}
            error={invalid}
            helperText={error?.message}
          />
        )}
      />
    </LocalizationProvider>
  );
}
export default HourPickerInput;
