import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import img_bg_1_typing from '~/assets/images/AboutUsSection/img_bg_1_typing.jpg';

const BG: SxProps<Theme> = {
  backgroundImage: `url(${img_bg_1_typing})`,
  padding: '180px',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(5, 1, 51, 0.7)',
  },
};

const CONTAINER: SxProps<Theme> = {
  position: 'relative',
  textAlign: 'center',
};

const H2: SxProps<Theme> = {
  color: '#ff630e',
  lineHeight: '30px',
  letterSpacing: '2px',
  fontWeight: 700,
  marginBottom: '20px',
  textTransform: 'uppercase',
  fontSize: { xs: '25px', md: '49px' },
};

export const SX = {
  BG,
  CONTAINER,
  H2,
};
