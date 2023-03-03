import { UseControllerReturn } from 'react-hook-form';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { OptionPayload } from '~/models';

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
    <RadioGroup
      row
      value={value}
      onChange={controllerOnChange}
      aria-labelledby="demo-row-radio-buttons-group-label"
      name="row-radio-buttons-group"
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
  );
}
export default RadioGroupInput;
