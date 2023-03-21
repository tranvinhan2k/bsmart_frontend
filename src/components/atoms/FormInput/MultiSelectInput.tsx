import { UseControllerReturn } from 'react-hook-form';
import { FormControlLabel, Stack, Checkbox } from '@mui/material';
import { OptionPayload } from '~/models';

interface MultiSelectInputProps {
  controller: UseControllerReturn<any, string>;
  data: OptionPayload[];
}
function MultiSelectInput({ controller, data }: MultiSelectInputProps) {
  const {
    field: { value, onChange: controllerOnChange },
  } = controller;

  return (
    <Stack flexDirection="row">
      {data.map((option) => (
        <FormControlLabel
          key={option.id}
          control={
            <Checkbox
              name={`${option.id}`}
              value={option.id}
              checked={value.includes(option.id)}
              onChange={(e) => {
                const { checked, value: eventValue } = e.target;
                const values = new Set(eventValue);
                if (checked) {
                  values.add(value);
                } else {
                  values.delete(value);
                }
                controllerOnChange(Array.from(values));
              }}
            />
          }
          label={option.label}
        />
      ))}
    </Stack>
  );
}
export default MultiSelectInput;
