import { UseControllerReturn } from 'react-hook-form';
import { TextField, Autocomplete } from '@mui/material';
import { OptionPayload } from '~/models';

interface DropdownInputProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
  data: OptionPayload[];
}
function DropdownInput({ controller, placeholder, data }: DropdownInputProps) {
  const defaultProps = {
    options: data,
    getOptionLabel: (option: OptionPayload) => option.label || '',
  };
  const {
    field: { value, onChange: controllerOnChange, onBlur, ref },
    fieldState: { invalid, error },
  } = controller;
  const onChange: any = (e: any, newValue: OptionPayload) => {
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
      renderInput={(params) => (
        <TextField
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
