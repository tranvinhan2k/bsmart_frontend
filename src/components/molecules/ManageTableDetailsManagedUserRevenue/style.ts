import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontFamily } from '~/assets/variables';

const itemLabel: SxProps<Theme> = {
  color: '#495057',
  fontSize: 14,
  fontFamily: FontFamily.medium,
};
const itemValue: SxProps<Theme> = {
  color: Color.grey4,
  fontSize: 14,
  fontFamily: FontFamily.regular,
};

const sx = {
  itemLabel,
  itemValue,
};

export default sx;
