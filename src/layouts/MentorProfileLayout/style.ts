import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, MetricSize } from '~/assets/variables';

export const SX_WRAPPER: SxProps<Theme> = {
  paddingTop: MetricSize.large_30,
  paddingX: 5,
  backgroundColor: Color.white4,
};

export const SX_CONTAINER: SxProps<Theme> = {
  width: '100%',
  marginX: 'auto',
};
