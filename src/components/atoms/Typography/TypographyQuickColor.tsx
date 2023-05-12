import { Typography } from '@mui/material';
import { TypographyQuickColorVariant } from '~/models/mockData/typography';
import { SX_QUICK_GREEN, SX_QUICK_RED } from './style';

interface TypographyProps {
  customVariant?: TypographyQuickColorVariant;
  children: any;
}

export default function TypographyQuickColor({
  customVariant,
  children,
}: TypographyProps) {
  let sx;
  switch (customVariant) {
    case 'green':
      sx = SX_QUICK_GREEN;
      break;
    case 'red':
      sx = SX_QUICK_RED;
      break;
    default:
      sx = SX_QUICK_RED;
      break;
  }
  return <Typography sx={sx}>{children}</Typography>;
}

TypographyQuickColor.defaultProps = {
  customVariant: '',
};
