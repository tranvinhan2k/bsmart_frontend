import {
  FormControl,
  InputLabel,
  Stack,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';
import {
  SX_INPUT_LABEL,
  SX_TEXT_INPUT_FORM,
} from '~/components/atoms/FormInput/styles';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  name: string;
  label?: string;
  defaultValue?: string;
}

export default function FormInput({
  control,
  name,
  label,
  defaultValue,
  onChange,
  ...rest
}: FormInputProps & TextFieldProps) {
  const {
    field: { value, onChange: controllerOnChange, onBlur, ref },
    fieldState: { error, invalid },
  } = useController({ name, defaultValue, control });

  const handleChange = (e: any) => {
    controllerOnChange(e);
    onChange?.(e.target.value);
  };

  return (
    <Stack>
      <InputLabel sx={SX_INPUT_LABEL}>{label}</InputLabel>
      <TextField
        sx={SX_TEXT_INPUT_FORM}
        fullWidth
        size="small"
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        inputRef={ref}
        error={invalid}
        helperText={error?.message}
        {...rest}
      />
    </Stack>
  );
}

FormInput.defaultProps = {
  label: '',
  defaultValue: '',
};
