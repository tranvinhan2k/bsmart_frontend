import { TextField } from '@mui/material';
import { UseControllerReturn } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import { SX_TEXT_INPUT_FORM } from '~/styles';
import { isValidDate } from '~/utils/date';

interface DatePickerInputProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}
function DateTimePickerInput({
  controller,
  placeholder,
}: DatePickerInputProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = controller;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        // inputFormat="DD/MM/YYYY"
        value={value}
        onChange={(newValue) => {
          console.log(newValue);

          if (isValidDate(newValue)) onChange(newValue?.toISOString());
        }}
        renderInput={(params) => (
          <TextField
            sx={SX_TEXT_INPUT_FORM}
            {...params}
            variant="outlined"
            size="small"
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
export default DateTimePickerInput;
