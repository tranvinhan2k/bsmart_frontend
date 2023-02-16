import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Colors, FontWeight } from '~/assets/variables';

const BOX: SxProps<Theme> = {
  padding: '95px 0 150px',
  backgroundColor: Colors.whiteSmoke,
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
  backgroundColor: Colors.white,
  borderRadius: '10px',
};

const FORM_TITLE: SxProps<Theme> = {
  fontSize: '30px',
  fontWeight: FontWeight.semiBold,
  color: Colors.navy,
  textTransform: 'uppercase',
};

export const SX = {
  BOX,
  BOX_IMG,
  CONTAINER,
  FORM,
  FORM_TITLE,
};
