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
};

export const SX = {
  BOX,
  CONTAINER,
  H2,
};
