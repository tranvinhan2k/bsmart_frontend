import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontSize, FontWeight } from '~/assets/variables';

const BOX: SxProps<Theme> = {
  padding: '95px 0 150px',
  backgroundColor: Color.whiteSmoke,
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
  backgroundColor: Color.white,
  borderRadius: '10px',
};

const FORM_TITLE: SxProps<Theme> = {
  fontSize: FontSize.medium_28,
  fontWeight: FontWeight.semiBold,
  color: Color.navy,
  textTransform: 'uppercase',
};

export const SX = {
  BOX,
  BOX_IMG,
  CONTAINER,
  FORM,
  FORM_TITLE,
};
