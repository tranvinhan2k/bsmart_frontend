import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { FontSize, FontFamily } from '~/assets/variables';

export const SX_RESOURCE_TITTLE: SxProps<Theme> = {
  fontSize: FontSize.small_18,
  fontFamily: FontFamily.bold,
};
export const SX_RESOURCE_ITEM_CONTAINER: SxProps<Theme> = {
  border: '1px solid #dee2e6',
  padding: 2,
  borderRadius: 1,
};
