import { UseControllerReturn } from 'react-hook-form';
import {
  FormControlLabel,
  Stack,
  Checkbox,
  FormHelperText,
} from '@mui/material';
import { OptionPayload } from '~/models';

interface MultiSelectInputProps {
  controller: UseControllerReturn<any, string>;
  data: OptionPayload[];
}
function MultiSelectInput({ controller, data }: MultiSelectInputProps) {
  const {
    field: { value, onChange: controllerOnChange },
    fieldState: { invalid, error },
  } = controller;

  return (
    <Stack>
      <Stack flexDirection="row">
        {data.map((option) => (
          <FormControlLabel
            key={option.id}
            control={
              <Checkbox
                color="secondary"
                name={`${option.value}`}
                value={option.value}
                checked={value.includes(option.value)}
                onChange={(e) => {
                  const eventValue = e.target.value;
                  let tmpValue = [...value];
                  if (e.target.checked) {
                    tmpValue = [...tmpValue, eventValue];
                  } else {
                    tmpValue = tmpValue.filter((item) => item !== eventValue);
                  }

                  controllerOnChange(tmpValue);
                }}
              />
            }
            label={option.label}
          />
        ))}
      </Stack>
      {invalid && (
        <FormHelperText error>{(error as any)?.message}</FormHelperText>
      )}
    </Stack>
  );
}
export default MultiSelectInput;
