import { UseControllerReturn } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { SX_TEXT_INPUT_FORM } from '~/styles';

interface NumberInputProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}
function NumberInput({ controller, placeholder }: NumberInputProps) {
  const {
    field: { value, onChange: controllerOnChange, onBlur, ref },
    fieldState: { invalid, error },
  } = controller;
  const onChange = (e: any) => {
    controllerOnChange(e.target.value);
  };
  return (
    <TextField
      sx={SX_TEXT_INPUT_FORM}
      placeholder={placeholder}
      onWheel={(e: any) => e.target.blur()}
      fullWidth
      type="number"
      size="small"
      InputProps={{ inputProps: { min: 0 } }}
      value={value}
      onFocus={() => {
        if (value === 0) {
          controllerOnChange('');
        }
      }}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
    />
  );
}
export default NumberInput;
