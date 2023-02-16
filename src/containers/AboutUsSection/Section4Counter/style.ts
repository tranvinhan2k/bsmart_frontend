import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

const CONTAINER: SxProps<Theme> = {
  width: '80%',
  margin: 'auto',
  textAlign: 'center',
};

const H2: SxProps<Theme> = {
  color: '#ff630e',
  fontSize: { xs: '28px', sm: '50px' },
  fontWeight: 700,
  marginBottom: '10px',
};

const P: SxProps<Theme> = {
  H2: {
    fontSize: '16px',
    lineHeight: '26px',
    color: '#696969',
  },
};

export const SX = {
  CONTAINER,
  H2,
  P,
};
