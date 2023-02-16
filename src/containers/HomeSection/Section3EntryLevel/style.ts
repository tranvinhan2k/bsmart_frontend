import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Colors, FontWeight } from '~/assets/variables';
import img_banner_sub_entryLevel_1 from '~/assets/images/IndexSection/img_banner_sub_entryLevel_1.jpg';
import img_banner_sub_entryLevel_2 from '~/assets/images/IndexSection/img_banner_sub_entryLevel_2.jpg';

const IMG_LEFT: SxProps<Theme> = {
  backgroundImage: `url(${img_banner_sub_entryLevel_1})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  clipPath: { xs: 'none', md: 'polygon(0 0, 100% 15%, 100% 100%, 0% 100%)' },
  padding: '220px 0',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: Colors.blackTransparent,
    '&:before': {
      backgroundColor: Colors.blackTransparent,
      cursor: 'pointer',
      transition: '0.3s',
    },
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.blackTransparent2,
  },
};

const IMG_RIGHT: SxProps<Theme> = {
  backgroundImage: `url(${img_banner_sub_entryLevel_2})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  clipPath: { xs: 'none', md: 'polygon(0 15%, 100% 0, 100% 100%, 0% 100%)' },
  padding: '220px 0',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: Colors.blackTransparent,
    '&:before': {
      backgroundColor: Colors.blackTransparent,
      cursor: 'pointer',
      transition: '0.3s',
    },
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.blackTransparent2,
  },
};

const CONTAINER: SxProps<Theme> = {
  position: 'relative',
  textAlign: 'center',
};

const TEXT_BEFORE_IMG_H2: SxProps<Theme> = {
  color: Colors.white,
  fontSize: '42px',
  lineHeight: '56px',
  fontWeight: FontWeight.bold,
  textTransform: 'uppercase',
};

const TEXT_BEFORE_IMG_P: SxProps<Theme> = {
  color: Colors.white,
  fontSize: '22px',
  lineHeight: '26px',
};

export const SX = {
  IMG_LEFT,
  IMG_RIGHT,
  CONTAINER,
  TEXT_BEFORE_IMG_H2,
  TEXT_BEFORE_IMG_P,
};
