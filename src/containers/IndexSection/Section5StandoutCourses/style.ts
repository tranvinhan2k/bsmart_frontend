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

const COURSE_IMG_CONTAINER: SxProps<Theme> = {
  position: 'absolute',
  width: '80px',
  height: '80px',
  border: '2px solid #999999',
  padding: 0,
  backgroundColor: '#fff',
  bottom: '-20%',
  left: '20px',
  borderRadius: '10px',
};

const COURSE_IMG: SxProps<Theme> = {
  width: '100%',
  height: '100%',
};

export const SX = {
  BOX,
  CONTAINER,
  H2,
  COURSE_IMG_CONTAINER,
  COURSE_IMG,
};
