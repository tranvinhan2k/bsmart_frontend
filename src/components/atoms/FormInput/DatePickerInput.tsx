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
  disabled?: boolean;
}
function DatePickerInput({
  controller,
  placeholder,
  disabled = false,
}: DatePickerInputProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = controller;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disabled={disabled}
        inputFormat="DD/MM/YYYY"
        value={value}
        onChange={(newValue: Dayjs | null) => {
          if (newValue && isValidDate(newValue))
            onChange(newValue?.toISOString());
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
