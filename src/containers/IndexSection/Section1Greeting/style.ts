import img_img_banner_1 from '~/assets/images/IndexSection/img_banner_1.jpg';

export const SX_BANNER = {
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

export const SX_TYPOGRAPHY_H4 = {
  color: '#ff630e',
  textTransform: 'uppercase',
  fontSize: { xs: '18px', md: '20px' },
  lineHeight: { xs: '28px', md: '30px' },
  letterSpacing: '2px',
  fontWeight: 700,
  marginBottom: '20px',
};

export const SX_TYPOGRAPHY_H2 = {
  fontSize: '70px',
  lineHeight: '77px',
  color: '#fff',
  fontWeight: 700,
  marginBottom: '20px',
};

export const SX_TYPOGRAPHY_P = {
  color: '#fff',
  padding: '0 200px',
  fontSize: '16px',
  lineHeight: '26px',
};
