import { Color, FontSize, FontWeight } from '~/assets/variables';

export const SX_BUTTON_PRIMARY = {
  display: 'block',
  backgroundColor: Color.orange,
  color: Color.white,
  padding: '15px 30px',
  borderRadius: '5px',
  fontSize: FontSize.small_16,
  fontWeight: FontWeight.semiBold,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  '&:hover': {
    color: Color.orange,
    backgroundColor: Color.white,
    border: `${Color.orange} 1px solid`,
    transition: '0.3s',
  },
};

export const SX_BUTTON_SECONDARY = {
  color: Color.orange,
  backgroundColor: Color.white,
  padding: '15px 30px',
  borderRadius: '5px',
  fontSize: FontSize.small_16,
  fontWeight: FontWeight.semiBold,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  border: `${Color.orange} 2px solid`,
  '&:hover': {
    color: Color.white,
    backgroundColor: Color.orange,
    transition: '0.3s',
  },
};
