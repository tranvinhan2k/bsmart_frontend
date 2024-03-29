import { UseControllerReturn } from 'react-hook-form';
import { TextField } from '@mui/material';
import { SX_TEXT_INPUT_FORM } from '~/styles';

interface TextInputProps {
  disabled?: boolean;
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}
function TextInput({
  disabled = false,
  controller,
  placeholder,
}: TextInputProps) {
  const {
    field: { value, onChange: controllerOnChange, onBlur, ref },
    fieldState: { invalid, error },
  } = controller;
  const onChange = (e: any) => {
    controllerOnChange(e.target.value);
  };

  return (
    <TextField
      disabled={disabled}
      sx={SX_TEXT_INPUT_FORM}
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
    />
  );
}
export default TextInput;
