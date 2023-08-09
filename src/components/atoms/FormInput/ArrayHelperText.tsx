import { Typography } from '@mui/material';
import { UseControllerReturn } from 'react-hook-form';

interface TextInputProps {
  controller: UseControllerReturn<any, string>;
}

function ArrayHelperText({ controller }: TextInputProps) {
  const {
    fieldState: { error },
  } = controller;
  return (
    <Typography component="h3" color="red">
      {error?.message}
    </Typography>
  );
}

export default ArrayHelperText;
