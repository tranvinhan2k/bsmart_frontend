import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontSize, FontWeight, MetricSize } from '~/assets/variables';

const WRAPPER: SxProps<Theme> = {
  width: '100%',
  padding: '30px 200px',
  boxSizing: 'border-box',
};

const H3: SxProps<Theme> = {
  color: Color.navy,
  lineHeight: '30px',
  letterSpacing: '2px',
  fontWeight: FontWeight.bold,
  marginBottom: MetricSize.large_20,
  textTransform: 'uppercase',
  fontSize: FontSize.large_45,
};

const IMG: SxProps<Theme> = {
  width: '100%',
  borderRadius: '25px',
};

const P: SxProps<Theme> = {
  color: Color.navy,
  lineHeight: '30px',
  /*  */
  fontWeight: FontWeight.normal,
  paddingTop: MetricSize.large_20,
  marginBottom: MetricSize.large_20,
  fontSize: FontSize.small_18,
  textAlign: 'justify',
};

export const SX = {
  WRAPPER,
  H3,
  IMG,
  P,
};
