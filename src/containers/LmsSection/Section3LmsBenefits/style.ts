import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Colors, FontSize, FontWeight, MetricSize } from '~/assets/variables';

const BOX: SxProps<Theme> = {
  padding: MetricSize.large,
  marginBottom: MetricSize.large,
  borderRadius: MetricSize.small_10,
  textAlign: 'center',
  boxShadow: '0 0 15px rgb(51 51 51 / 10%)',
};

const H3: SxProps<Theme> = {
  color: Colors.navy,
  lineHeight: '50px',
  letterSpacing: '2px',
  fontWeight: FontWeight.bold,
  marginBottom: MetricSize.large,
  textTransform: 'uppercase',
  fontSize: FontSize.large_45,
};

const H4: SxProps<Theme> = {
  paddingTop: MetricSize.large,
  marginBottom: MetricSize.large,
  color: Colors.orange,
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
  paddingTop: MetricSize.large,
  fontSize: FontSize.medium_24,
  color: Colors.orange,
  lineHeight: '30px',
  fontWeight: FontWeight.medium,
};

const P_BENEFIT: SxProps<Theme> = {
  height: '100%',
  paddingTop: MetricSize.large,
  fontSize: FontSize.small_18,
  color: Colors.navy,
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
