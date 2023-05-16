import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import overlay_bg from '~/assets/images/overlay-bg.jpg';

export const SX_WRAPPER: SxProps<Theme> = {
  boxShadow: 3,
  padding: MetricSize.medium_15,
  borderRadius: '5px',
};

export const SX_BOX_ITEM_AVATAR: SxProps<Theme> = {
  backgroundImage: `url(${overlay_bg})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  paddingX: MetricSize.medium_15,

  alignItems: 'center',
};

export const SX_ACCOUNT_AVATAR: SxProps<Theme> = {
  marginTop: { xs: MetricSize.medium_15, md: '100px' },
  width: '200px',
  height: '200px',
  borderRadius: '5px',
  objectFit: 'fill',
};

export const SX_ACCOUNT_NAME: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: FontSize.medium_24,
};
export const SX_ACCOUNT_ROLE: SxProps<Theme> = {
  color: Color.grey,
  fontFamily: FontFamily.regular,
  fontSize: FontSize.small_18,
};
export const SX_ACCOUNT_DOB: SxProps<Theme> = {
  fontSize: FontSize.small_16,
  color: Color.grey,
  fontFamily: FontFamily.regular,
};
export const SX_DISPLAY_FIELD_TEXT: SxProps<Theme> = {
  fontSize: FontSize.small_16,
  color: Color.grey,
  fontFamily: FontFamily.regular,
};
