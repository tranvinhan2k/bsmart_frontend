import { Colors, FontSize, FontWeight } from '~/assets/variables';

export const SX_BUTTON_PRIMARY = {
  display: 'block',
  backgroundColor: Colors.orange,
  color: Colors.white,
  padding: '15px 30px',
  borderRadius: '5px',
  fontSize: FontSize.small_16,
  fontWeight: FontWeight.semiBold,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  '&:hover': {
    color: Colors.orange,
    backgroundColor: Colors.white,
    border: `${Colors.orange} 1px solid`,
    transition: '0.3s',
  },
};

export const SX_BUTTON_SECONDARY = {
  color: Colors.orange,
  backgroundColor: Colors.white,
  padding: '15px 30px',
  borderRadius: '5px',
  fontSize: FontSize.small_16,
  fontWeight: FontWeight.semiBold,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  border: `${Colors.orange} 2px solid`,
  '&:hover': {
    color: Colors.white,
    backgroundColor: Colors.orange,
    transition: '0.3s',
  },
};
