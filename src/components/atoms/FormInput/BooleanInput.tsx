import { UseControllerReturn } from 'react-hook-form';
import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import globalStyles from '~/styles';
import { FontFamily, FontSize } from '~/assets/variables';

interface BooleanInputProps {
  disabled?: boolean;
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}
function BooleanInput({
  disabled = false,
  controller,
  placeholder,
}: BooleanInputProps) {
  const {
    field: { value, onChange: controllerOnChange },
    fieldState: { invalid, error },
  } = controller;

  const onChange = (e: any) => {
    controllerOnChange(e.target.checked);
  };

  useEffect(() => {
    if (value === undefined || value === '') {
      controllerOnChange(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Stack>
      <Stack sx={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Checkbox
          sx={{
            margin: 0,
            padding: 0,
          }}
          disableRipple
          color="secondary"
          checked={!!value}
          onChange={onChange}
        />
        <Typography
          sx={{
            fontSize: FontSize.small_14,
            fontFamily: FontFamily.regular,
            marginLeft: 1,
          }}
          dangerouslySetInnerHTML={{
            __html: placeholder,
          }}
        />
      </Stack>
      {invalid && (
        <FormHelperText error>{(error as any)?.message}</FormHelperText>
      )}
    </Stack>
  );
}
export default BooleanInput;
