import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

const BOX: SxProps<Theme> = {
  marginBottom: '20px',
  padding: '20px 20px',
  borderRadius: '8px',
  textAlign: 'center',
  boxShadow: '0 0 15px rgb(51 51 51 / 10%)',
};

const H3: SxProps<Theme> = {
  color: '#0e0a38',
  lineHeight: '50px',
  letterSpacing: '2px',
  fontWeight: 700,
  marginBottom: '20px',
  textTransform: 'uppercase',
  fontSize: '49px',
};

const H4: SxProps<Theme> = {
  paddingTop: '20px',
  color: '#ff630e',
  lineHeight: '30px',
  letterSpacing: '2px',
  fontWeight: 700,
  marginBottom: '20px',
  fontSize: '36px',
};

const IMG: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  borderRadius: '15px',
  marginTop: '48px',
};

const H3_BENEFIT: SxProps<Theme> = {
  paddingTop: '20px',
  fontSize: '22px',
  color: '#ff630e',
  lineHeight: '30px',
  fontWeight: 500,
};

const P_BENEFIT: SxProps<Theme> = {
  height: '100%',
  paddingTop: '20px',
  fontSize: '20px',
  color: '#0e0a38',
  textAlign: 'justify',
  lineHeight: '30px',
  fontWeight: 400,
};

export const SX = {
  BOX,
  H3,
  H4,
  H3_BENEFIT,
  P_BENEFIT,
  IMG,
};
