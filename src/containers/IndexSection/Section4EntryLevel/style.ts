import img_banner_sub_entryLevel_1 from '~/assets/images/IndexSection/img_banner_sub_entryLevel_1.jpg';
import img_banner_sub_entryLevel_2 from '~/assets/images/IndexSection/img_banner_sub_entryLevel_2.jpg';

export const SX_IMG_LEFT = {
  backgroundImage: `url(${img_banner_sub_entryLevel_1})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  clipPath: 'polygon(0 0, 100% 15%, 100% 100%, 0% 100%)',
  padding: '220px 0',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    '&:before': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

export const SX_IMG_RIGHT = {
  backgroundImage: `url(${img_banner_sub_entryLevel_2})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0% 100%)',
  padding: '220px 0',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    '&:before': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

export const SX_TEXT_BEFORE_IMG_H2 = {
  color: '#fff',
  fontSize: '42px',
  lineHeight: '56px',
  fontWeight: 700,
  textTransform: 'uppercase',
};
export const SX_TEXT_BEFORE_IMG_P = {
  color: '#fff',
  fontSize: '22px',
  lineHeight: '26px',
};
