import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, MetricSize } from '~/assets/variables';

export const SX_WRAPPER: SxProps<Theme> = {
  paddingTop: MetricSize.large_30,
  paddingX: {
    xs: '10px',
    md: `${MetricSize.extraLarge_90} ${MetricSize.none} ${MetricSize.extraLarge_100}`,
  },
  backgroundColor: Color.white4,
};

export const SX_CONTAINER: SxProps<Theme> = {
  width: { xs: '100%', md: MetricSize.centeredContainer1 },
  marginX: 'auto',
};
