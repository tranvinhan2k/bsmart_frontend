import { UseControllerReturn } from 'react-hook-form';
import { TextField } from '@mui/material';

interface MultilineInputProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}
function MultilineInput({ controller, placeholder }: MultilineInputProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = controller;

  return (
    <TextField
      placeholder={placeholder}
      fullWidth
      size="small"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      multiline
      rows={4}
    />
  );
}
export default MultilineInput;
