import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontSize, FontWeight, MetricSize } from '~/assets/variables';

const BOX: SxProps<Theme> = {
  mx: 'auto',
  width: { sm: 500, md: 800, lg: 1100, xl: 1400 },
  paddingTop: 12,
  paddingBottom: 14,
};

const H2: SxProps<Theme> = {
  fontSize: FontSize.large_45,
  lineHeight: '55px',
  fontWeight: FontWeight.bold,
  color: Color.navy,
  marginBottom: '30px',

  textAlign: 'right',
};

const H4: SxProps<Theme> = {
  color: Color.orange,
  fontSize: FontSize.medium_24,
  fontWeight: FontWeight.semiBold,
  lineHeight: 1.3,
  verticalAlign: 'middle',
};

const QUOTE_CONTENT: SxProps<Theme> = {
  color: Color.navy,
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
