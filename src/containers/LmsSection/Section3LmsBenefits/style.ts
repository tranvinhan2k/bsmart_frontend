import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontSize, FontWeight, MetricSize } from '~/assets/variables';

const BOX: SxProps<Theme> = {
  padding: MetricSize.large_20,
  marginBottom: MetricSize.large_20,
  borderRadius: MetricSize.small_10,
  textAlign: 'center',
  boxShadow: '0 0 15px rgb(51 51 51 / 10%)',
};

const H3: SxProps<Theme> = {
  color: Color.navy,
  lineHeight: '50px',
  letterSpacing: '2px',
  fontWeight: FontWeight.bold,
  marginBottom: MetricSize.large_20,
  textTransform: 'uppercase',
  fontSize: FontSize.large_45,
};

const H4: SxProps<Theme> = {
  paddingTop: MetricSize.large_20,
  marginBottom: MetricSize.large_20,
  color: Color.tertiary,
  lineHeight: '30px',
  letterSpacing: '2px',
  fontWeight: FontWeight.bold,
  fontSize: '36px',
};

const IMG: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  borderRadius: '15px',
  marginTop: '48px',
};

const H3_BENEFIT: SxProps<Theme> = {
  paddingTop: MetricSize.large_20,
  fontSize: FontSize.medium_24,
  color: Color.tertiary,
  lineHeight: '30px',
  fontWeight: FontWeight.medium,
};

const P_BENEFIT: SxProps<Theme> = {
  height: '100%',
  paddingTop: MetricSize.large_20,
  fontSize: FontSize.small_18,
  color: Color.navy,
  textAlign: 'justify',
  lineHeight: '30px',
  fontWeight: FontWeight.normal,
};

export const SX = {
  BOX,
  H3,
  H4,
  H3_BENEFIT,
  P_BENEFIT,
  IMG,
};
