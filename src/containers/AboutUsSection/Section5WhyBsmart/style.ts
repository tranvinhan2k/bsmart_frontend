import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

const BOX: SxProps<Theme> = {
  width: '100%',
  backgroundColor: '#f7f7f7',
  marginTop: '80px',
  padding: '70px 20px',
};

const H4: SxProps<Theme> = {
  fontSize: '16px',
  lineHeight: '26px',
  fontWeight: 600,
  textTransform: 'uppercase',
  color: '#ff630e',
  letterSpacing: '1px',
  textAlign: 'center',
  marginBottom: '15px',
};

const H2: SxProps<Theme> = {
  fontSize: { xs: '20px', sm: '45px' },
  fontWeight: 700,
  lineHeight: { xs: '25px', sm: '55px' },
  textAlign: 'center',
  color: 'rgba(0,0,0,0.755)',
  marginBottom: '15px',
};

const SINGLE_BOX: SxProps<Theme> = {
  padding: '15px15px',
  background: 'white',
  height: '300px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
};

const SINGLE_BOX_H3: SxProps<Theme> = {
  fontWeight: 700,
  marginBottom: '10px',
  fontSize: '24px',
  lineHeight: '34px',
  color: '#130f40',
};

const SINGLE_BOX_P: SxProps<Theme> = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#696969',
};

export const SX_WHY_BSMART = {
  BOX,
  H4,
  H2,
  SINGLE_BOX,
  SINGLE_BOX_H3,
  SINGLE_BOX_P,
};
