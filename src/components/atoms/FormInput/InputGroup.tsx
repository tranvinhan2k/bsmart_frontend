import { Stack } from '@mui/material';
import { Control } from 'react-hook-form';
import { OptionPayload } from '~/models';
import { FormInputVariant } from '~/models/form';
import FormInput from '.';

export interface InputData {
  name: string;
  placeholder: string;
  label: string;
  variant: FormInputVariant;
  data?: OptionPayload[];
}

interface Props {
  inputList: InputData[];
  control: Control<any>;
}

export default function InputGroup({ control, inputList }: Props) {
  return (
    <Stack>
      {inputList.map((item, index) => (
        <Stack key={item.name} marginTop={index !== 0 ? 2 : 0}>
          <FormInput
            data={item?.data}
            control={control}
            name={item.name}
            placeholder={item.placeholder}
            variant={item.variant}
          />
        </Stack>
      ))}
    </Stack>
  );
}
