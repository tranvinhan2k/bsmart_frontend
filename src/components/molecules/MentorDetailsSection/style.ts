import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontFamily } from '~/assets/variables';

const labelMentorName: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: 30,
};
const labelMentorRole: SxProps<Theme> = {
  fontSize: 20,
};

const labelItem: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: 14,
};
const labelValue: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: 48,
};

const mainWrapper: SxProps<Theme> = {
  padding: 3,
  borderRadius: 3,
  backgroundColor: Color.white,
  marginBottom: 3,
};
const titleMentorRole: SxProps<Theme> = {
  color: '#6a6f73',
  textTransform: 'uppercase',
};
const titleMentorName: SxProps<Theme> = {
  fontSize: 40,
};

const itemTitle: SxProps<Theme> = {
  color: '#6a6f73',
};
const itemValue: SxProps<Theme> = {
  fontSize: 24,
  fontFamily: FontFamily.bold,
};
const titleIntroduce: SxProps<Theme> = {
  fontFamily: FontFamily.bold,
  fontSize: 20,
};

const sx = {
  // //Udemy
  mainWrapper,
  titleMentorRole,
  titleMentorName,
  itemTitle,
  itemValue,
  titleIntroduce,
  // //Unica
  labelMentorName,
  labelMentorRole,
  labelItem,
  labelValue,
};

export default sx;
