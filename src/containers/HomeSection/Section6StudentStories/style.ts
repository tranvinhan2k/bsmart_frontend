import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Colors, FontWeight } from '~/assets/variables';

const BOX = {
  padding: '95px 0 150px',
};

const CONTAINER: SxProps<Theme> = {
  position: 'relative',
  textAlign: 'center',
};

const H2 = {
  fontSize: '45px',
  lineHeight: '55px',
  fontWeight: FontWeight.bold,
  color: Colors.navy,
  marginBottom: '30px',
};

export const SX = {
  BOX,
  CONTAINER,
  H2,
};
