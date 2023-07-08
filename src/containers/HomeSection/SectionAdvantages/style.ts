import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontSize, FontWeight } from '~/assets/variables';

const BOX: SxProps<Theme> = {
  padding: '95px 0 150px',
};

const CONTAINER: SxProps<Theme> = {
  position: 'relative',
  textAlign: 'center',
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
  color: Color.tertiary,
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
  padding: '10px 0',
};

export const SX = {
  BOX,
  CONTAINER,
  H2,
  H4,
  QUOTE_CONTENT,
};
