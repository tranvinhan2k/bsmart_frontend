import { SxProps, Theme } from '@mui/material';
import { Color, Common, MetricSize } from '~/assets/variables';

export const SX_MODAL_CONTAINER: SxProps<Theme> = {
  borderRadius: Common.borderRadius,
  background: Color.white,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  padding: MetricSize.large_20,
};

export default {};
