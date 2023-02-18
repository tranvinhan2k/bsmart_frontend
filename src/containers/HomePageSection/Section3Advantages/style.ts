import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

const BOX: SxProps<Theme> = {
  padding: '95px 0 150px',
};

const CONTAINER: SxProps<Theme> = {
  position: 'relative',
  textAlign: 'center',
};

const H2: SxProps<Theme> = {
  fontSize: '45px',
  lineHeight: '55px',
  fontWeight: 700,
  color: '#0e0a38',
  marginBottom: '30px',

  textAlign: 'right',
};

const H4: SxProps<Theme> = {
  color: '#ff630e',
  fontSize: 22,
  fontWeight: 600,
  lineHeight: 1.3,
  verticalAlign: 'middle',
};

const QUOTE_CONTENT: SxProps<Theme> = {
  color: '#0e0a38',
  lineHeight: '30px',
  fontSize: '20px',
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
