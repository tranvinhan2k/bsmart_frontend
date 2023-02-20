import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontSize, FontWeight } from '~/assets/variables';
import img_img_banner_2 from '~/assets/images/HomePageSection/img_banner_2.jpg';

const BOX_BANNER: SxProps<Theme> = {
  backgroundImage: `url(${img_img_banner_2})`,
  padding: '95px 0 150px',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: ' rgba(255, 255, 255, 0.7)',
  },
};

const CONTAINER: SxProps<Theme> = {
  position: 'relative',
  textAlign: 'center',
};

const H2: SxProps<Theme> = {
  fontSize: FontSize.large_45,
  lineHeight: '55px',
  fontWeight: FontWeight.bold,
  color: Color.navy,
  marginBottom: '30px',
};

const P: SxProps<Theme> = {
  fontSize: FontSize.small_18,
  fontWeight: FontWeight.medium,
  color: Color.navy,
  textAlign: 'justify',
  lineHeight: '30px',
};

const BOX_IMG: SxProps<Theme> = {
  borderRadius: '10px',
  boxShadow: '0 0 15px rgb(51 51 51 / 10%)',

  width: '100%',
};

export const SX = {
  BOX_BANNER,
  CONTAINER,
  H2,
  P,
  BOX_IMG,
};
