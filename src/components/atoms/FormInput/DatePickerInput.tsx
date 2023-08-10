import { TextField } from '@mui/material';
import { UseControllerReturn } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { SX_TEXT_INPUT_FORM } from '~/styles';
import { isValidDate } from '~/utils/date';

interface DatePickerInputProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}
function DatePickerInput({ controller, placeholder }: DatePickerInputProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = controller;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        inputFormat="DD/MM/YYYY"
        value={value}
        onChange={(newValue: Dayjs | null) => {
          const oldValue = newValue?.add(12, 'hour');
          if (oldValue && isValidDate(oldValue))
            console.log('value', newValue, oldValue.toISOString());

          onChange(oldValue?.toISOString());
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
export default DatePickerInput;
