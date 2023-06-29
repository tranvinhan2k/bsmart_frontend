import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color } from '~/assets/variables';

export const SX_WRAPPER: SxProps<Theme> = {
  border: '1px solid #dee2e6',
  borderRadius: 1,
  boxShadow: 1,
  backgroundColor: Color.white,
};

export const SX_FORM_LABEL: SxProps<Theme> = {
  color: Color.navy,
  fontWeight: 700,
  marginTop: 2,
  marginBottom: 1,
};
export const SX_FORM_LABEL_ERROR: SxProps<Theme> = {
  color: Color.red,
  fontWeight: 700,
  marginTop: 2,
  marginBottom: 1,
  textAlign: 'center',
};
