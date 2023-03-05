import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { BorderRadius, Color, FontSize, FontWeight } from '~/assets/variables';

export const SX_WRAPPER: SxProps<Theme> = {
  padding: '20px 20px 50px',
  borderRadius: BorderRadius.small_10,

  boxShadow: '0px 0px 15px 0px rgb(51 51 51 / 10%)',
};

export const SX_TITLE: SxProps<Theme> = {
  fontWeight: FontWeight.bold,
  fontSize: '22px',
  lineHeight: '32px',
};

export const SX_PROFILE_DETAILS: SxProps<Theme> = {
  color: Color.grey,

  fontSize: FontSize.small_16,
};

export const SX_PROFILE_DETAILS_HIGHLIGHTED: SxProps<Theme> = {
  color: Color.orange,
};
