import { UseControllerReturn } from 'react-hook-form';
import { TextField } from '@mui/material';

interface MultilineInputProps {
  controller: UseControllerReturn<any, string>;
  multilineRows: number;
  placeholder: string;
}
function MultilineInput({
  controller,
  multilineRows,
  placeholder,
}: MultilineInputProps) {
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
      inputProps={{ spellCheck: 'false' }}
      error={invalid}
      helperText={error?.message}
      multiline
      rows={multilineRows}
    />
  );
}
export default MultilineInput;
