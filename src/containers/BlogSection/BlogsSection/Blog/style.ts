import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Color, FontSize, FontWeight } from '~/assets/variables';

export const SX_CARD_WRAPPER: SxProps<Theme> = {
  paddingBottom: '1rem',
  marginBottom: '1rem',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
};

export const SX_CARD_LIST_TEXT: SxProps<Theme> = {
  color: '#696969',
  fontWeight: FontWeight.bold,
  textTransform: 'uppercase',
  letterSpacing: 1,
  fontSize: '15px',
  marginRight: '15px',
};

export const SX_CARD_LIST_WRAPPER: SxProps<Theme> = {
  paddingBottom: '10px',
  marginTop: '1rem',
};

export const SX_BLOG_TITTLE: SxProps<Theme> = {
  color: '#0e0a38',
  fontWeight: 700,
  fontSize: '30px',
  lineHeight: '46px',
};

export const SX_BLOG_CONTENT: SxProps<Theme> = {
  // font-size: 16px;
  // line-height: 1.5;
  // margin-bottom: 1rem;
  // color: #999;
  // text-align: justify;
  fontSize: '16px',
  lineHeight: 1.5,
  marginBottom: '1rem',
  color: '#999',
  textAlign: 'justify',
};
