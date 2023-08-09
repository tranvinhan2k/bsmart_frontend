import { UseControllerReturn } from 'react-hook-form';
import { FormHelperText, Rating, Stack, TextField } from '@mui/material';
import { SX_TEXT_INPUT_FORM } from '~/styles';
import { Color } from '~/assets/variables';

interface RatingInputProps {
  disabled?: boolean;
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}
function RatingInput({
  disabled = false,
  controller,
  placeholder,
}: RatingInputProps) {
  const {
    field: { value, onChange: controllerOnChange, onBlur, ref },
    fieldState: { invalid, error },
  } = controller;
  const onChange = (e: any, paramValue: number | null) => {
    if (paramValue) {
      controllerOnChange(paramValue);
    }
  };

  return (
    <Stack>
      <Rating
        size="large"
        sx={{
          '.MuiRating-iconEmpty .MuiSvgIcon-root': {
            color: invalid ? Color.red : Color.grey,
          },
        }}
        readOnly={disabled}
        value={value}
        onChange={onChange}
      />
      {invalid && <FormHelperText error>{error?.message || ''}</FormHelperText>}
    </Stack>
  );
}
export default RatingInput;
