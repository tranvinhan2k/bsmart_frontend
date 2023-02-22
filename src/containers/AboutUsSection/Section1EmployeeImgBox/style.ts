import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { MetricSize } from '~/assets/variables';

const WRAPPER: SxProps<Theme> = {
  width: MetricSize.centeredContainer1,
  marginX: 'auto',
  marginTop: MetricSize.extraLarge_100,
};

const IMG: SxProps<Theme> = {
  width: '100%',
  borderRadius: '25px',
};

export const SX = {
  WRAPPER,
  IMG,
};
