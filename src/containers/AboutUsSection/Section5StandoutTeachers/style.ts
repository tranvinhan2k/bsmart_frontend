import { Color, FontSize, FontWeight } from '~/assets/variables';

export const BOX = {
  width: 'clamp(0rem, 70vw + 10rem, 100rem)',
  marginX: 'auto',
  // marginTop: '40px',
  textAlign: 'center',
  padding: '95px 0 150px',
};

export const H2 = {
  fontSize: FontSize.large_45,
  fontWeight: FontWeight.bold,
  lineHeight: '55px',
  color: Color.navy,
  marginBottom: '30px',
};

export const CONTAINER = {
  position: 'relative',
  textAlign: 'center',
};

export const SX = {
  BOX,
  CONTAINER,
  H2,
};
