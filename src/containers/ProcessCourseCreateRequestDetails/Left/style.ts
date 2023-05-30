import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import overlay_bg from '~/assets/images/overlay-bg.jpg';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';

export const SX_WRAPPER: SxProps<Theme> = {
  boxShadow: 3,
  borderRadius: '5px',
  width: '100%',
  height: '100%',
};
export const SX_BOX_ITEM_AVATAR: SxProps<Theme> = {
  marginTop: { xs: MetricSize.medium_15, md: '100px' },
  width: '200px',
  height: '200px',
  borderRadius: '5px',
  objectFit: 'fill',
};
export const SX_BOX_ITEM_BG: SxProps<Theme> = {
  backgroundImage: `url(${overlay_bg})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  paddingX: MetricSize.medium_15,
  alignItems: 'center',
};
export const SX_PROFILE_TITLE: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: FontSize.medium_24,
};
export const SX_PROFILE_TITLE_SUB: SxProps<Theme> = {
  color: Color.grey,
  fontFamily: FontFamily.regular,
  fontSize: FontSize.small_18,
};
