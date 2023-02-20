import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
<<<<<<<< HEAD:src/containers/HomeSection/Section7Orientation/style.ts
import { Color, FontSize, FontWeight } from '~/assets/variables';
import img_bg_1_funFact from '~/assets/images/IndexSection/img_bg_1_funFact.jpg';
========
import img_bg_1_funFact from '~/assets/images/HomePageSection/img_bg_1_funFact.jpg';
>>>>>>>> main:src/containers/HomePageSection/Section8Orientation/style.ts

const BOX: SxProps<Theme> = {
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

const CONTAINER: SxProps<Theme> = {
  position: 'relative',
  textAlign: 'center',
};

const H2: SxProps<Theme> = {
  fontSize: FontSize.medium_24,
  lineHeight: '30px',
  fontWeight: FontWeight.semiBold,
  fontStyle: 'normal',
  color: Color.orange,
  marginBottom: '20px',
};

const H2_SUB: SxProps<Theme> = {
  fontSize: FontSize.medium_28,
  lineHeight: '30px',
  fontWeight: FontWeight.semiBold,
  fontStyle: 'normal',
  color: Color.navy,
  marginBottom: '20px',
};

export const SX = {
  BOX,
  CONTAINER,
  H2,
  H2_SUB,
};
