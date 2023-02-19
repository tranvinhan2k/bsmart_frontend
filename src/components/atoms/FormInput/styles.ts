import { SxProps, Theme } from '@mui/material';
import { Colors } from '~/assets/variables';

export const SX_CHECKBOX: SxProps<Theme> = {
  '&.Mui-checked': {
    color: Colors.orange,
  },
};

export const SX_INPUT_LABEL: SxProps<Theme> = {};

export default {};
