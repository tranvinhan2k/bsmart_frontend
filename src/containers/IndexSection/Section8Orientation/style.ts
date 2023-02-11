import img_bg_1_funFact from '~/assets/images/IndexSection/img_bg_1_funFact.jpg';

export const SX_BOX = {
  padding: '95px 0 150px',
  backgroundImage: `url(${img_bg_1_funFact})`,
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'relative',
  backgroundAttachment: 'fixed',
  '&:before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
};

export const SX_TYPOGRAPHY_H2 = {
  fontSize: '24px',
  lineHeight: '30px',
  fontWeight: 600,
  fontStyle: 'normal',
  color: '#ff630e',
  marginBottom: '20px',
};

export const SX_TYPOGRAPHY_H2_SUB = {
  fontSize: '30px',
  lineHeight: '30px',
  fontWeight: 600,
  fontStyle: 'normal',
  color: '#0e0a38',
  marginBottom: '20px',
};
