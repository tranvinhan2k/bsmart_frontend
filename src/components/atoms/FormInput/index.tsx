import { InputLabel, Stack } from '@mui/material';
import { Control, useController, UseControllerReturn } from 'react-hook-form';
import { SX_INPUT_LABEL } from '~/components/atoms/FormInput/styles';
import { OptionPayload } from '~/models';
import DatePickerInput from './DatePickerInput';
import DropdownInput from './DropdownInput';
import FileInput from './FileInput';
import HourPickerInput from './HourPickerInput';
import ImageInput from './ImageInput';
import ModuleInput from './ModuleInput';
import MultilineInput from './MultilineInput';
import MultiSelectInput from './MultiSelectInput';
import NumberInput from './NumberInput';
import PasswordInput from './PasswordInput';
import RadioGroupInput from './RadioGroupInput';
import TagsInput from './TagsInput';
import TextInput from './TextInput';

export type FormInputVariant =
  | 'text'
  | 'number'
  | 'multiline'
  | 'dropdown'
  | 'radioGroup'
  | 'image'
  | 'multiSelect'
  | 'time'
  | 'file'
  | 'tags'
  | 'modules'
  | 'password'
  | 'date';

interface FormInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  variant?: FormInputVariant;
  data?: OptionPayload[];
}

const generateFormInput = (
  variant: FormInputVariant,
  controller: UseControllerReturn<any, string>,
  placeholder: string,
  data: OptionPayload[]
) => {
  switch (true) {
    case variant === 'text':
      return <TextInput controller={controller} placeholder={placeholder} />;
    case variant === 'multiline':
      return (
        <MultilineInput controller={controller} placeholder={placeholder} />
      );
    case variant === 'password':
      return (
        <PasswordInput controller={controller} placeholder={placeholder} />
      );
    case variant === 'number':
      return <NumberInput controller={controller} placeholder={placeholder} />;
    case variant === 'image':
      return <ImageInput controller={controller} placeholder={placeholder} />;
    case variant === 'file':
      return <FileInput controller={controller} placeholder={placeholder} />;
    case variant === 'radioGroup':
      return <RadioGroupInput controller={controller} data={data} />;
    case variant === 'multiSelect':
      return <MultiSelectInput controller={controller} data={data} />;
    case variant === 'tags':
      return <TagsInput controller={controller} placeholder={placeholder} />;
    case variant === 'modules':
      return <ModuleInput controller={controller} placeholder={placeholder} />;
    case variant === 'date':
      return (
        <DatePickerInput controller={controller} placeholder={placeholder} />
      );
    case variant === 'time':
      return (
        <HourPickerInput controller={controller} placeholder={placeholder} />
      );
    case variant === 'dropdown':
      return (
        <DropdownInput
          controller={controller}
          placeholder={placeholder}
          data={data}
        />
      );

    default:
      return null;
  }
};

export default function FormInput({
  control,
  name,
  label = '',
  defaultValue,
  variant = 'text',
  placeholder = '',
  data = [],
}: FormInputProps) {
  const controller = useController({ name, defaultValue, control });

  return (
    <Stack flexGrow={1} marginBottom={1}>
      <>
        <InputLabel sx={SX_INPUT_LABEL}>{label}</InputLabel>
        {generateFormInput(variant, controller, placeholder, data)}
      </>
    </Stack>
  );
}

FormInput.defaultProps = {
  label: '',
  defaultValue: '',
  placeholder: '',
  variant: 'text',
  data: [],
};
