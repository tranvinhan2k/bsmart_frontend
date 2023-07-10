import { alpha, SxProps, Theme } from '@mui/material';
import { Color, FontSize, MetricSize } from '~/assets/variables';

export const SX_CHECKBOX: SxProps<Theme> = {
  '&.Mui-checked': {
    color: Color.tertiary,
  },
};

export const SX_INPUT_LABEL: SxProps<Theme> = {};

export default {};
