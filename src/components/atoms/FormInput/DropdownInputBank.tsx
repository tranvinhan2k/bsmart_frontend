import { UseControllerReturn } from 'react-hook-form';
import { Box, TextField, Autocomplete } from '@mui/material';
// import { BankLinking } from '~/models';
import { SX_TEXT_INPUT_FORM } from '~/styles';
import { BankLinking } from '~/models/form';

interface DropdownInputProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
  data: BankLinking[];
}
function DropdownInput({ controller, placeholder, data }: DropdownInputProps) {
  const defaultProps = {
    options: data,
    getOptionLabel: (option: BankLinking) => option.name || '',
  };
  const {
    field: { value, onChange: controllerOnChange, onBlur, ref },
    fieldState: { invalid, error },
  } = controller;
  const onChange: any = (e: any, newValue: BankLinking) => {
    controllerOnChange(newValue);
  };
  return (
    <Autocomplete
      {...defaultProps}
      disablePortal
      id="combo-box-demo"
      fullWidth
      size="small"
      isOptionEqualToValue={(option, optionValue) =>
        option.id === optionValue.id
      }
      value={value !== '' ? value : null}
      onChange={onChange}
      onBlur={onBlur}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="80"
            src={option.logo}
            srcSet={`${option.logo} 2x`}
            alt=""
          />
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          sx={SX_TEXT_INPUT_FORM}
          inputRef={ref}
          error={invalid}
          placeholder={placeholder}
          helperText={error?.message}
          {...params}
        />
      )}
    />
  );
}
export default DropdownInput;
