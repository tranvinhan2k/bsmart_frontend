import {
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from '@mui/material';
import { UseControllerReturn } from 'react-hook-form';
import { FontFamily, FontSize } from '~/assets/variables';
import { RadioGroupDynamicValuePayload } from '~/models';

interface RadioGroupInputDynamicValueProps {
  controller: UseControllerReturn<any, string>;
  dataRadioGroupDynamicValue: RadioGroupDynamicValuePayload[];
}
function RadioGroupInputDynamicValue({
  controller,
  dataRadioGroupDynamicValue,
}: RadioGroupInputDynamicValueProps) {
  const {
    field: { value, onChange: controllerOnChange },
    fieldState: { invalid, error },
  } = controller;

  return (
    <>
      <RadioGroup
        row
        value={value}
        onChange={controllerOnChange}
        name="row-radio-buttons-group"
      >
        {dataRadioGroupDynamicValue.map((item) => (
          <FormControlLabel
            key={item.id}
            sx={{
              fontSize: FontSize.small_16,
              fontFamily: FontFamily.medium,
            }}
            value={item.value}
            control={<Radio color="secondary" />}
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
export default RadioGroupInputDynamicValue;
