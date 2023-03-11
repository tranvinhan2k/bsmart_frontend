import { UseControllerReturn } from 'react-hook-form';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { useState } from 'react';
import Icon from '../Icon';
import { SX_TEXT_INPUT_FORM } from '~/styles';

interface PasswordInputProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
  helperText: string
}
function PasswordInput({ controller, placeholder, helperText }: PasswordInputProps) {
  const {
    field: { value, onChange: controllerOnChange, onBlur, ref },
    fieldState: { invalid, error },
  } = controller;
  const onChange = (e: any) => {
    controllerOnChange(e.target.value);
  };

  // Add these variables to your component to track the state
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      sx={SX_TEXT_INPUT_FORM}
      placeholder={placeholder}
      fullWidth
      type={showPassword ? 'text' : 'password'}
      size="small"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      helperText={helperText || error?.message}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? (
                <Icon name="eye" size="medium" />
              ) : (
                <Icon name="eye-off" size="medium" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
export default PasswordInput;
