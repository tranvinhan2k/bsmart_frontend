import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color } from '~/assets/variables';

const itemEditDefault: SxProps<Theme> = {
  borderRadius: 1,
  padding: 1,
};
const itemEditSelected: SxProps<Theme> = {
  backgroundColor: Color.muiSuccessBg,
  borderRadius: 1,
  padding: 1,
};

const wrapperEditDefault: SxProps<Theme> = {
  borderRadius: 1.25,
  boxShadow: 3,
  padding: 2.5,
};
const wrapperEditSelected: SxProps<Theme> = {
  borderRadius: 1.25,
  boxShadow: 3,
  padding: 2.5,
  backgroundColor: Color.muiSuccessBg,
};

const sx = {
  itemEditDefault,
  itemEditSelected,
  wrapperEditDefault,
  wrapperEditSelected,
};

export default sx;
