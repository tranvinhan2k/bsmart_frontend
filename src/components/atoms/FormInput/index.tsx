import { Stack, Typography } from '@mui/material';
import { Control, useController, UseControllerReturn } from 'react-hook-form';
import { BankLinking, FormInputVariant } from '~/models/form';
import { OptionPayload } from '~/models';
import { SX_INPUT_LABEL } from '~/components/atoms/FormInput/styles';
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
// eslint-disable-next-line import/no-cycle
import TimeTableInput from './TimeTableInput';
import DropdownInputBank from './DropdownInputBank';

interface FormInputProps {
  banks?: BankLinking[];
  control: Control<any>;
  data?: OptionPayload[];
  defaultValue?: any;
  helperText?: string;
  label?: string;
  name: string;
  placeholder?: string;
  previewImgHeight?: number | '100%';
  previewImgWidth?: number | '100%';
  variant?: FormInputVariant;
}

const generateFormInput = (
  banks: BankLinking[],
  controller: UseControllerReturn<any, string>,
  data: OptionPayload[],
  helperText: string,
  placeholder: string,
  previewImgHeight: number | '100%',
  previewImgWidth: number | '100%',
  variant: FormInputVariant
) => {
  switch (true) {
    case variant === 'text':
      return <TextInput controller={controller} placeholder={placeholder} />;
    case variant === 'multiline':
      return (
        <MultilineInput controller={controller} placeholder={placeholder} />
      );
    case variant === 'timetable':
      return (
        <TimeTableInput controller={controller} placeholder={placeholder} />
      );
    case variant === 'password':
      return (
        <PasswordInput
          controller={controller}
          placeholder={placeholder}
          helperText={helperText}
        />
      );
    case variant === 'number':
      return <NumberInput controller={controller} placeholder={placeholder} />;
    case variant === 'image':
      return (
        <ImageInput
          controller={controller}
          previewImgHeight={previewImgHeight}
          previewImgWidth={previewImgWidth}
        />
      );
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
    case variant === 'dropdownBanks':
      return (
        <DropdownInputBank
          controller={controller}
          placeholder={placeholder}
          data={banks}
        />
      );
    default:
      return null;
  }
};

export default function FormInput({
  banks = [],
  control,
  data = [],
  defaultValue,
  helperText = '',
  label = '',
  name,
  placeholder = '',
  previewImgHeight = '100%',
  previewImgWidth = '100%',
  variant = 'text',
}: FormInputProps) {
  const controller = useController({ name, defaultValue, control });

  return (
    <Stack flexGrow={1} marginBottom={1}>
      <Typography sx={SX_INPUT_LABEL}>{label}</Typography>
      {generateFormInput(
        banks,
        controller,
        data,
        helperText,
        placeholder,
        previewImgHeight,
        previewImgWidth,
        variant
      )}
    </Stack>
  );
}

FormInput.defaultProps = {
  banks: [],
  data: [],
  defaultValue: '',
  helperText: '',
  label: '',
  placeholder: '',
  previewImgHeight: '100%',
  previewImgWidth: '100%',
  variant: 'text',
};
