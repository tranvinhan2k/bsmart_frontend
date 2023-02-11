import img_img_banner_2 from '~/assets/images/IndexSection/img_banner_2.jpg';

export const SX_SECOND_LAYER_TYPOGRAPHY_H2 = {
  fontSize: '45px',
  lineHeight: '55px',
  fontWeight: 700,
  color: '#0e0a38',
  marginBottom: '30px',
};

export const SX_SECOND_LAYER_TYPOGRAPHY_P = {
  fontSize: '20px',
  fontWeight: 500,
  color: '#0e0a38',
  textAlign: 'justify',
  lineHeight: '30px',
};

export const SX_SECOND_LAYER_BOX_IMG = {
  borderRadius: '10px',
  boxShadow: '0 0 15px rgb(51 51 51 / 10%)',

  width: '100%',
};

export const SX_SECOND_LAYER_BOX_BANNER = {
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
