import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontFamily, FontSize } from '~/assets/variables';

export const headerCell: SxProps<Theme> = {
  padding: '20px',
  fontFamily: FontFamily.bold,
  fontSize: FontSize.small_18,
};
