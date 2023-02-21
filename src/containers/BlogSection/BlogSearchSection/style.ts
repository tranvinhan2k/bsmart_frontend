import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontSize, FontWeight } from '~/assets/variables';

export const SX_WRAPPER: SxProps<Theme> = {};

export const SX_CONTAINER: SxProps<Theme> = {
  position: 'relative',
  padding: '30px 40px 40px',
  marginBottom: '30px',
  borderRadius: '10px',
  boxShadow: '0 0 15px rgb(51 51 51 / 10%)',
};

export const SX_FORM_SEARCH_INPUT: SxProps<Theme> = {
  backgroundColor: '#f1f1f1',
};

export const SX_OUTSTANDING_TITLE: SxProps<Theme> = {
  color: '#130f40',
  paddingBottom: '15px',
  fontWeight: 700,
  fontSize: '24px',
};

export const SX_OUTSTANDING_POST_TITLE: SxProps<Theme> = {
  fontSize: '1rem',
  color: '#0e0a38',
  fontWeight: 700,
  marginBottom: '10px',
};

export const SX_OUTSTANDING_POST_DATE: SxProps<Theme> = {
  color: '#696969',
};
