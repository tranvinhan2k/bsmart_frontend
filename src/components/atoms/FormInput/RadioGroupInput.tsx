import { UseControllerReturn } from 'react-hook-form';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from '@mui/material';
import { OptionPayload } from '~/models';
import { Color } from '~/assets/variables';

interface RadioGroupInputProps {
  controller: UseControllerReturn<any, string>;
  data: OptionPayload[];
}
function RadioGroupInput({ controller, data }: RadioGroupInputProps) {
  const defaultProps = {
    options: data,
    getOptionLabel: (option: OptionPayload) => option.label || '',
  };
  const {
    field: { value, onChange: controllerOnChange, onBlur, ref },
    fieldState: { invalid, error },
  } = controller;

  return (
    <>
      <RadioGroup
        row
        value={value}
        onChange={controllerOnChange}
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        color={Color.orange}
      >
        {data.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.value}
            control={<Radio />}
            label={item.label}
          />
        ))}
      </RadioGroup>
      {invalid && (
        <FormHelperText error={invalid}>{error?.message}</FormHelperText>
      )}
    </>
  );
}
export default RadioGroupInput;
