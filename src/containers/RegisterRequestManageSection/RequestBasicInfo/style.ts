import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { MetricSize } from '~/assets/variables';
import overlay_bg from '~/assets/images/overlay-bg.jpg';

export const SX_BOX_ITEM_BG: SxProps<Theme> = {
  backgroundImage: `url(${overlay_bg})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  paddingX: MetricSize.medium_15,
  alignItems: 'center',
};
