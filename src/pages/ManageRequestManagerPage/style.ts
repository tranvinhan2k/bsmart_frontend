import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color } from '~/assets/variables';

export const dropdown: SxProps<Theme> = {
  background: Color.white,
  // padding: 3,
  borderRadius: 1,
};

const sx = {
  dropdown,
};

export default sx;
