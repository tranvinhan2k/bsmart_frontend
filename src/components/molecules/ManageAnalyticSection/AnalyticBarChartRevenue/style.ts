import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { FontFamily } from '~/assets/variables';

const titleBarChart: SxProps<Theme> = {
  fontFamily: FontFamily.medium,
  fontSize: 20,
};
const wrapperBarChart: SxProps<Theme> = {
  height: 300,
  width: '100%',
};

const sx = {
  titleBarChart,
  wrapperBarChart,
};

export default sx;
