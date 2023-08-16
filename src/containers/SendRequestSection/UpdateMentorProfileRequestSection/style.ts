import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontFamily } from '~/assets/variables';

const boxWrapper: SxProps<Theme> = {
  padding: 3,
  borderRadius: 3,
  backgroundColor: Color.white,
  marginBottom: 3,
};
const formItemLabel: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: 16,
};

const formTitle: SxProps<Theme> = {
  color: Color.black,
  fontFamily: FontFamily.bold,
  fontSize: 22,
  fontWeight: 700,
};
const formLabel: SxProps<Theme> = {
  color: Color.black,
  fontFamily: FontFamily.bold,
  fontWeight: 700,
  marginTop: 2,
  marginBottom: 1,
};

const imgIdentity: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  // width: 300,
  // height: 150,
  boxShadow: 3,
};
const imgAvatar: SxProps<Theme> = {
  width: '25%',
  height: '25%',
  // width: 300,
  // height: 150,
  boxShadow: 3,
};

const sx = {
  boxWrapper,
  formItemLabel,
  formLabel,
  formTitle,
  imgAvatar,
  imgIdentity,
};

export default sx;
