import { UseControllerReturn } from 'react-hook-form';
import { TextField, Typography } from '@mui/material';
import { SX_TEXT_INPUT_FORM } from '~/styles';

interface TextInputProps {
  disabled?: boolean;
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}

function ArrayHelperText({
  disabled = false,
  controller,
  placeholder,
}: TextInputProps) {
  const {
    field: { value, onChange: controllerOnChange, onBlur, ref, name },
    fieldState: { invalid, error },
  } = controller;
  const onChange = (e: any) => {
    controllerOnChange(e.target.value);
  };

  return (
    <Typography component="h3" color="red">
      {error?.message}
    </Typography>
  );
}

export default ArrayHelperText;
