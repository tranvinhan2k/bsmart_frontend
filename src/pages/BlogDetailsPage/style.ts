import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, MetricSize } from '~/assets/variables';

export const SX_WRAPPER: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  padding: `${MetricSize.extraLarge_90} ${MetricSize.none} ${MetricSize.extraLarge_100}`,
  /* Color */
  backgroundColor: Color.white,
  /* Text */
  /* Other */
};

export const SX_CONTAINER: SxProps<Theme> = {
  /* Positioning */
  /* Display & Box Model */
  width: MetricSize.centeredContainer1,
  marginX: 'auto',
  /* Color */
  /* Text */
  /* Other */
};
