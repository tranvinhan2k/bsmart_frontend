/* eslint-disable import/no-cycle */

import { Stack, Typography } from '@mui/material';
import { Control, useController, UseControllerReturn } from 'react-hook-form';
import { BankLinking, FormInputVariant } from '~/models/form';
import {
  DropdownDynamicValueInputBooleanDataPayload,
  DropdownDynamicValueInputNumberDataPayload,
  DropdownDynamicValueInputStringDataPayload,
  OptionPayload,
} from '~/models';
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
import TimeTableInput from './TimeTableInput';
import DropdownInputBank from './DropdownInputBank';
import FeedbackQuestionChoiceInput from './FeedbackQuestionChoiceInput';
import FeedbackTypeInput from './FeedbackTypeInput';
import DateTimePickerInput from './DateTimePickerInput';
import DropdownDynamicValueInput from './DropdownDynamicValueInput';
import EditorInput from './EditorInput';
import globalStyles from '~/styles';
import { FontFamily, FontSize } from '~/assets/variables';

interface FormInputProps {
  banks?: BankLinking[];
  control: Control<any>;
  data?: OptionPayload[];
  dataDropdownDynamicValue?: (
    | DropdownDynamicValueInputBooleanDataPayload
    | DropdownDynamicValueInputNumberDataPayload
    | DropdownDynamicValueInputStringDataPayload
  )[];
  defaultValue?: any;
  helperText?: string;
  label?: string;
  name: string;
  placeholder?: string;
  multilineRows?: number;
  previewImgHeight?: number | '100%';
  previewImgWidth?: number | '100%';
  variant?: FormInputVariant;
}

const generateFormInput = (
  banks: BankLinking[],
  controller: UseControllerReturn<any, string>,
  data: OptionPayload[],
  dataDropdownDynamicValue: (
    | DropdownDynamicValueInputBooleanDataPayload
    | DropdownDynamicValueInputNumberDataPayload
    | DropdownDynamicValueInputStringDataPayload
  )[],
  helperText: string,
  placeholder: string,
  multilineRows: number,
  previewImgHeight: number | '100%',
  previewImgWidth: number | '100%',
  variant: FormInputVariant
) => {
  switch (true) {
    case variant === 'text':
      return <TextInput controller={controller} placeholder={placeholder} />;
    case variant === 'feedbackQuestionChoice':
      return (
        <FeedbackQuestionChoiceInput
          controller={controller}
          placeholder={placeholder}
        />
      );
    case variant === 'multiline':
      return (
        <MultilineInput
          controller={controller}
          placeholder={placeholder}
          multilineRows={multilineRows}
        />
      );
    case variant === 'editor':
      return <EditorInput controller={controller} placeholder={placeholder} />;
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
    case variant === 'datetime':
      return (
        <DateTimePickerInput
          controller={controller}
          placeholder={placeholder}
        />
      );
    case variant === 'dropdown':
      return (
        <DropdownInput
          controller={controller}
          placeholder={placeholder}
          data={data}
        />
      );
    case variant === 'dropdownDynamicValue':
      return (
        <DropdownDynamicValueInput
          controller={controller}
          placeholder={placeholder}
          data={dataDropdownDynamicValue}
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
    case variant === 'feedbackTypeChoose':
      return (
        <FeedbackTypeInput
          data={data}
          controller={controller}
          placeholder={placeholder}
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
  dataDropdownDynamicValue = [],
  defaultValue,
  helperText = '',
  label = '',
  name,
  placeholder = '',
  multilineRows = 4,
  previewImgHeight = '100%',
  previewImgWidth = '100%',
  variant = 'text',
}: FormInputProps) {
  const controller = useController({ name, defaultValue, control });

  return (
    <Stack flexGrow={1}>
      <Typography
        sx={{
          fontSize: FontSize.small_14,
          fontFamily: FontFamily.regular,
        }}
      >
        {label}
      </Typography>
      {generateFormInput(
        banks,
        controller,
        data,
        dataDropdownDynamicValue,
        helperText,
        placeholder,
        multilineRows,
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
  dataDropdownDynamicValue: [],
  defaultValue: '',
  helperText: '',
  label: '',
  placeholder: '',
  multilineRows: 4,
  previewImgHeight: '100%',
  previewImgWidth: '100%',
  variant: 'text',
};
