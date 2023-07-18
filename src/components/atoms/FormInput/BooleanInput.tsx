import { UseControllerReturn } from 'react-hook-form';
import { FormControlLabel, Switch } from '@mui/material';
import { useEffect } from 'react';

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
  } = controller;

  const onChange = (e: any) => {
    controllerOnChange(e.target.checked);
  };

  useEffect(() => {
    if (value === undefined) {
      controllerOnChange(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <FormControlLabel
      disabled={disabled}
      control={<Switch checked={!!value} onChange={onChange} />}
      label={placeholder}
    />
  );
}
export default BooleanInput;
