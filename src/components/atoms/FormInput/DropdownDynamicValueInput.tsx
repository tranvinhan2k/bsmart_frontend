import { UseControllerReturn } from 'react-hook-form';
import { TextField, Autocomplete } from '@mui/material';
import {
  DropdownDynamicValueInputBooleanDataPayload,
  DropdownDynamicValueInputStringDataPayload,
  DropdownDynamicValueInputNumberDataPayload,
} from '~/models';
import { SX_TEXT_INPUT_FORM } from '~/styles';

interface DropdownDynamicValueInputProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
  data: (
    | DropdownDynamicValueInputBooleanDataPayload
    | DropdownDynamicValueInputNumberDataPayload
    | DropdownDynamicValueInputStringDataPayload
  )[];
}
function DropdownDynamicValueInput({
  controller,
  placeholder,
  data,
}: DropdownDynamicValueInputProps) {
  const defaultProps = {
    options: data,
    getOptionLabel: (
      option:
        | DropdownDynamicValueInputBooleanDataPayload
        | DropdownDynamicValueInputNumberDataPayload
        | DropdownDynamicValueInputStringDataPayload
    ) => option.label || '',
  };
  const {
    field: { value, onChange: controllerOnChange, onBlur, ref },
    fieldState: { invalid, error },
  } = controller;
  const onChange: any = (
    e: any,
    newValue:
      | DropdownDynamicValueInputBooleanDataPayload
      | DropdownDynamicValueInputNumberDataPayload
      | DropdownDynamicValueInputStringDataPayload
  ) => {
    controllerOnChange(newValue);
  };

  return (
    <Autocomplete
      {...defaultProps}
      disablePortal
      fullWidth
      size="small"
      isOptionEqualToValue={(option, optionValue) =>
        option.id === optionValue.id
      }
      value={
        typeof value === 'boolean' ||
        typeof value === 'string' ||
        typeof value === 'number'
          ? data.find((item) => item.value === value)
          : value
      }
      inputValue={data.find((item) => item.id === value)?.label}
      onChange={onChange}
      onBlur={onBlur}
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
export default DropdownDynamicValueInput;
