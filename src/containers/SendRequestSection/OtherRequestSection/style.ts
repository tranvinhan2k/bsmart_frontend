import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontFamily } from '~/assets/variables';

export const SX_FORM: SxProps<Theme> = {
  padding: 3,
  borderRadius: 3,
  backgroundColor: Color.white,
  marginBottom: 3,
};

export const SX_FORM_TITLE: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontWeight: 700,
  fontSize: '36px',
  lineHeight: '46px',
};

export const SX_FORM_LABEL: SxProps<Theme> = {
  color: '#0e0a38',
  fontFamily: FontFamily.bold,
  fontWeight: 700,
  margin: '1rem 0 0.5rem 0',
};

export const SX_FORM_ITEM_LABEL: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: 16,
};

const REQUESTING: SxProps<Theme> = {
  display: 'inline',
  fontFamily: FontFamily.bold,
  color: Color.grey2,
};
const WAITING: SxProps<Theme> = {
  display: 'inline',
  fontFamily: FontFamily.bold,
  color: Color.brown,
};
const EDITREQUEST: SxProps<Theme> = {
  display: 'inline',
  fontFamily: FontFamily.bold,
  color: Color.brown,
};
const REJECTED: SxProps<Theme> = {
  display: 'inline',
  fontFamily: FontFamily.bold,
  color: Color.red,
};
const STARTING: SxProps<Theme> = {
  display: 'inline',
  fontFamily: FontFamily.bold,
  color: Color.green,
};
export const SX_STATUS = {
  REQUESTING,
  WAITING,
  EDITREQUEST,
  REJECTED,
  STARTING,
};
