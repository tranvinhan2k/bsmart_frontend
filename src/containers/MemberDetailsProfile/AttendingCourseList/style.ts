import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { FontSize, FontWeight } from '~/assets/variables';

export const SX_WRAPPER: SxProps<Theme> = {
  padding: '35px 20px 0',
};

export const SX_TITLE: SxProps<Theme> = {
  fontSize: { xs: FontSize.medium_24, md: FontSize.large_35 },
  fontWeight: FontWeight.bold,
  lineHeight: '32px',
};
