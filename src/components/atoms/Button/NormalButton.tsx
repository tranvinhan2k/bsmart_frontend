import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
  Stack,
} from '@mui/material';
import {
  SX_NORMAL_BUTTON,
  SX_NORMAL_BUTTON_SMALL,
} from '~/components/atoms/Button/styles';
import { MetricSize } from '~/assets/variables';
import { MetricSizeKeys } from '~/models/variables';

interface ButtonProps extends MUIButtonProps {
  children: any;
  size: 'medium' | 'small';
  marginTop?: MetricSizeKeys;
}

export default function NormalButton({
  children,
  size = 'medium',
  marginTop = 'none',
  ...rest
}: ButtonProps) {
  switch (size) {
    case 'small':
      return (
        <Stack marginTop={MetricSize[marginTop]}>
          <MUIButton sx={SX_NORMAL_BUTTON_SMALL} {...rest}>
            {children}
          </MUIButton>
        </Stack>
      );
    default:
      return (
        <Stack marginTop={MetricSize[marginTop]}>
          <MUIButton sx={SX_NORMAL_BUTTON} {...rest}>
            {children}
          </MUIButton>
        </Stack>
      );
  }
}

NormalButton.defaultProps = {
  marginTop: 'none',
};
