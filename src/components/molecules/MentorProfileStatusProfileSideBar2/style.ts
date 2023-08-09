import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontFamily, FontSize } from '~/assets/variables';

const completenessHelperText: SxProps<Theme> = {
  fontSize: 16,
  color: Color.grey,
  fontFamily: FontFamily.regular,
  textTransform: 'none',
};
const completenessHelperSubText: SxProps<Theme> = {
  fontSize: 14,
  color: Color.grey,
  fontFamily: FontFamily.bold,
  textTransform: 'none',
};
const iconColor: SxProps<Theme> = {
  fontSize: FontSize.small_16,
  color: Color.grey,
  fontFamily: FontFamily.regular,
};

const linearProgress: SxProps<Theme> = {
  width: '100%',
  borderRadius: 1,
};
const profileSubmitButton: SxProps<Theme> = {
  // fontFamily: FontFamily.medium,
  // textTransform: 'none',
};

const sx = {
  completenessHelperText,
  completenessHelperSubText,
  iconColor,
  linearProgress,
  profileSubmitButton,
};

export default sx;
