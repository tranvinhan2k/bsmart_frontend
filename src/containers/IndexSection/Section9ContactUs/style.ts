import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

const BOX: SxProps<Theme> = {
  padding: '95px 0 150px',
  backgroundColor: '#f5f5f5',
};

const BOX_IMG: SxProps<Theme> = {
  borderRadius: '10px',
  boxShadow: '0 0 10px',

  width: '100%',
};

const CONTAINER: SxProps<Theme> = {
  position: 'relative',
  textAlign: 'center',
};

const FORM: SxProps<Theme> = {
  padding: '25px 30px',
  backgroundColor: '#fff',
  borderRadius: '10px',
};

const FORM_TITLE: SxProps<Theme> = {
  fontSize: '30px',
  fontWeight: 700,
  color: '#0e0a38',
  textTransform: 'uppercase',
};

export const SX = {
  BOX,
  BOX_IMG,
  CONTAINER,
  FORM,
  FORM_TITLE,
};
