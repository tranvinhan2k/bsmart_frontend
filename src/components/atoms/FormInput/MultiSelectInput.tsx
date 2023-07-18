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
  );
}
export default MultiSelectInput;
