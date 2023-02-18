import { SxProps, Theme } from '@mui/material';
import { Colors, MetricSize } from '~/assets/variables';

export const SX_LOGIN_LAYOUT_STACK: SxProps<Theme> = {
  justifyContent: 'center',
  alignItems: 'center',
  margin: MetricSize.large,
  alignSelf: 'center',
  padding: MetricSize.large,
  boxShadow: { xs: 0, md: 5 },
  borderWidth: { xs: 1, md: 0 },
  borderColor: Colors.grey,
};

export default {};
