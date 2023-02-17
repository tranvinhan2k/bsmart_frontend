import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Colors, FontSize, FontWeight, MetricSize } from '~/assets/variables';

const BOX: SxProps<Theme> = {
  mx: 'auto',
  width: { sm: 500, md: 800, lg: 1100, xl: 1400 },
  padding: '95px 0 150px',
};

const H2: SxProps<Theme> = {
  fontSize: FontSize.large_45,
  lineHeight: '55px',
  fontWeight: FontWeight.bold,
  color: Colors.navy,
  marginBottom: '30px',

  textAlign: 'right',
};

const H4: SxProps<Theme> = {
  color: Colors.orange,
  fontSize: FontSize.medium_24,
  fontWeight: FontWeight.semiBold,
  lineHeight: 1.3,
  verticalAlign: 'middle',
};

const QUOTE_CONTENT: SxProps<Theme> = {
  color: Colors.navy,
  lineHeight: '30px',
  fontSize: FontSize.small_18,
  textAlign: 'justify',
  padding: `${MetricSize.small_10} 0`,
};

export const SX = {
  BOX,
  H2,
  H4,
  QUOTE_CONTENT,
};
