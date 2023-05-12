import { SxProps, Theme } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';

const view: SxProps<Theme> = {
  minHeight: '100vh',
};
const viewLeft: SxProps<Theme> = {
  backgroundColor: Color.white,
  paddingY: MetricSize.large_30,
  paddingRight: MetricSize.large_30,
  paddingLeft: { xs: MetricSize.medium_15, md: '100px' },
};
const viewRight: SxProps<Theme> = {
  backgroundColor: Color.whiteSmoke,
  paddingY: MetricSize.large_30,
  paddingLeft: MetricSize.large_30,
  paddingRight: { xs: MetricSize.medium_15, md: '100px' },
};
const textMoney: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: FontSize.extraLarge_70,
};

export default {
  view,
  viewLeft,
  viewRight,
  textMoney,
};
