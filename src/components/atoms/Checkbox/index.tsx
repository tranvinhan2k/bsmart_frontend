import { Stack, Checkbox as MUICheckbox, Typography } from '@mui/material';
import React from 'react';
import { MetricSize } from '~/assets/variables';
import {
  SX_CHECKBOX,
  SX_CHECKBOX_STACK,
  SX_CHECKBOX_TYPOGRAPHY,
} from '~/components/atoms/Checkbox/styles';

interface CheckBoxProps {
  children: string;
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
      <Typography sx={SX_CHECKBOX_TYPOGRAPHY}>{children}</Typography>
    </Stack>
  );
}
