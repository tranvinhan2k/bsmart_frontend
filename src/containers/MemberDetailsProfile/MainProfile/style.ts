import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import {
  BorderRadius,
  Color,
  FontSize,
  FontWeight,
  MetricSize,
} from '~/assets/variables';
import overlay_bg from '~/assets/images/MemberDetailSection/overlay_bg.jpg';

export const SX_WRAPPER: SxProps<Theme> = {
  borderRadius: BorderRadius.small_10,
  padding: '20px 20px 50px',

  textAlign: 'center',

  boxShadow: '0px 0px 15px 0px rgb(51 51 51 / 10%)',
};

export const SX_CONTAINER: SxProps<Theme> = {
  padding: '50px 50px 30px',

  backgroundImage: `url(${overlay_bg})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
};

export const SX_PROFILE_IMG: SxProps<Theme> = {
  borderRadius: BorderRadius.small_5,
  height: '100%',
  marginTop: MetricSize.large_20,
  maxWidth: '100%',
};

export const SX_PROFILE_NAME: SxProps<Theme> = {
  fontSize: '22px',
  fontWeight: FontWeight.bold,
  lineHeight: '32px',
};

export const SX_PROFILE_DETAILS: SxProps<Theme> = {
  color: Color.grey,

  fontSize: FontSize.small_16,
  lineHeight: '26px',
};

export const SX_PROFILE_DETAILS_HIGHLIGHTED: SxProps<Theme> = {
  color: Color.orange,
};
