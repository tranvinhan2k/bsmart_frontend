import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import img_img_banner_1 from '~/assets/images/HomePageSection/img_banner_1.jpg';

const BANNER: SxProps<Theme> = {
  backgroundImage: `url(${img_img_banner_1})`,
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

const H4: SxProps<Theme> = {
  color: '#ff630e',
  textTransform: 'uppercase',
  fontSize: { xs: '18px', md: '20px' },
  lineHeight: { xs: '28px', md: '30px' },
  letterSpacing: '2px',
  fontWeight: 700,
  marginBottom: '20px',
};

const H2: SxProps<Theme> = {
  fontSize: '70px',
  lineHeight: '77px',
  color: '#fff',
  fontWeight: 700,
  marginBottom: '20px',
};

const P: SxProps<Theme> = {
  color: '#fff',
  padding: '0 200px',
  fontSize: '16px',
  lineHeight: '26px',
};

export const SX = {
  BANNER,
  CONTAINER,
  H4,
  H2,
  P,
};
