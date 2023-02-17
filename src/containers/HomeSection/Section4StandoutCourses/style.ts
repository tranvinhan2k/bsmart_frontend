import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Colors, FontSize, FontWeight, MetricSize } from '~/assets/variables';

const BOX: SxProps<Theme> = {
  padding: '95px 0 150px',
};

const CONTAINER: SxProps<Theme> = {
  position: 'relative',
  textAlign: 'center',
};

const H2: SxProps<Theme> = {
  fontSize: FontSize.large_45,
  lineHeight: '55px',
  fontWeight: FontWeight.bold,
  color: Colors.navy,
  marginBottom: '30px',
};

const COURSE_IMG_CONTAINER: SxProps<Theme> = {
  position: 'absolute',
  width: '80px',
  height: '80px',
  border: `2px solid ${Colors.grey}`,
  padding: 0,
  backgroundColor: Colors.white,
  bottom: '-20%',
  left: MetricSize.large,
  borderRadius: MetricSize.small_10,
};

const COURSE_IMG: SxProps<Theme> = {
  width: '100%',
  height: '100%',
};

export const SX = {
  BOX,
  CONTAINER,
  H2,
  COURSE_IMG_CONTAINER,
  COURSE_IMG,
};
