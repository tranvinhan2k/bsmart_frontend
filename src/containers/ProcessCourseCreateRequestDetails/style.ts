import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';

export const SX_WRAPPER: SxProps<Theme> = {
  padding: `${MetricSize.extraLarge_90} ${MetricSize.none} ${MetricSize.extraLarge_100}`,
  backgroundColor: Color.white,
};

export const SX_CONTAINER: SxProps<Theme> = {
  width: MetricSize.centeredContainer1,
  marginX: 'auto',
};
export const SX_FORM_ITEM_LABEL_BOLD: SxProps<Theme> = {
  fontSize: FontSize.small_18,
  fontFamily: FontFamily.bold,
};
export const SX_FORM_ITEM_LABEL_LIGHT: SxProps<Theme> = {
  fontSize: FontSize.small_18,
  fontFamily: FontFamily.light,
};
