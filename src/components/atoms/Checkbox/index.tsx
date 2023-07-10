import { Stack, Checkbox as MUICheckbox, Typography } from '@mui/material';
import { FontFamily, FontSize } from '~/assets/variables';
import {
  SX_CHECKBOX,
  SX_CHECKBOX_STACK,
} from '~/components/atoms/Checkbox/styles';

interface CheckBoxProps {
  children?: string;
  isChecked: boolean;
  onCheck: () => void;
}

export default function Checkbox({
  children,
  isChecked,
  onCheck,
}: CheckBoxProps) {
  return (
    <Stack sx={SX_CHECKBOX_STACK}>
      <MUICheckbox sx={SX_CHECKBOX} checked={isChecked} onChange={onCheck} />
      <Typography
        sx={{
          fontSize: FontSize.small_14,
          fontFamily: FontFamily.regular,
        }}
      >
        {children}
      </Typography>
    </Stack>
  );
}

Checkbox.defaultProps = {
  children: '',
};
