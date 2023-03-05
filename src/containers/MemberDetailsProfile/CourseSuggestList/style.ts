import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { FontSize, FontWeight, MetricSize } from '~/assets/variables';

export const SX_TITLE: SxProps<Theme> = {
  marginBottom: MetricSize.large_30,

  fontSize: FontSize.large_45,
  fontWeight: FontWeight.bold,
  lineHeight: '50px',
};
