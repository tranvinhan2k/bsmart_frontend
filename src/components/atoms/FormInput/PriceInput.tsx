import { UseControllerReturn } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { SX_TEXT_INPUT_FORM } from '~/styles';

interface PriceInputProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}
function PriceInput({ controller, placeholder }: PriceInputProps) {
  const {
    field: { value, onChange: controllerOnChange, onBlur, ref },
    fieldState: { invalid, error },
  } = controller;
  const [price, setPrice] = useState(value);

  const onChange = (e: any) => {
    let input = e.target.value.replace(/[\D\s._-]+/g, '');
    input = input ? parseInt(input, 10) : 0;
    controllerOnChange(input);
  };

  useEffect(() => {
    if (value) {
      setPrice(value === 0 ? '' : value.toLocaleString('en-US'));
    } else {
      setPrice(0);
    }
  }, [value]);

  return (
    <TextField
      sx={SX_TEXT_INPUT_FORM}
      placeholder={placeholder}
      onWheel={(e: any) => e.target.blur()}
      fullWidth
      size="small"
      InputProps={{ inputProps: { min: 0 } }}
      value={price}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
    />
  );
}
export default PriceInput;
