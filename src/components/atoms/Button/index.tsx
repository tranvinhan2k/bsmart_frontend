import {
  Box,
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
  Stack,
  Typography,
} from '@mui/material';
import { ButtonVariant } from '~/models/button';
import {
  SX_FORM_BUTTON,
  SX_FORM_INPUT_HORIZON_BUTTON,
  SX_GOOGLE_BUTTON,
  SX_GOOGLE_STACK,
  SX_OUTLINED_BUTTON,
} from '~/components/atoms/Button/styles';
import { FontFamily, MetricSize } from '~/assets/variables';
import { MetricSizeKeys } from '~/models/variables';
import Icon from '~/components/atoms/Icon';
import NormalButton from './NormalButton';
import LinearButton from './LinearButton';

interface ButtonProps extends MUIButtonProps {
  customVariant?: ButtonVariant;
  children: any;
  size?: 'medium' | 'small';
  marginTop?: MetricSizeKeys;
}

export default function Button({
  customVariant,
  children,
  size = 'medium',
  marginTop = 'none',
  ...rest
}: ButtonProps) {
  switch (customVariant) {
    case 'form':
      return (
        <Stack marginTop={MetricSize[marginTop]}>
          <MUIButton variant="outlined" sx={SX_FORM_BUTTON} {...rest}>
            {children}
          </MUIButton>
        </Stack>
      );
    case 'normal':
      return (
        <NormalButton marginTop={marginTop} size={size} {...rest}>
          {children}
        </NormalButton>
      );
    case 'linear':
      return <LinearButton {...rest}>{children}</LinearButton>;
    case 'outlined':
      return (
        <Stack marginTop={MetricSize[marginTop]}>
          <MUIButton sx={SX_OUTLINED_BUTTON} {...rest}>
            {children}
          </MUIButton>
        </Stack>
      );
    case 'horizonForm':
      return (
        <Stack marginTop={MetricSize[marginTop]}>
          <MUIButton sx={SX_FORM_INPUT_HORIZON_BUTTON} {...rest}>
            {children}
          </MUIButton>
        </Stack>
      );
    case 'google':
      return (
        <Stack marginTop={MetricSize[marginTop]}>
          <MUIButton variant="outlined" sx={SX_GOOGLE_BUTTON} {...rest}>
            <Stack sx={SX_GOOGLE_STACK}>
              <Icon name="google" size="medium" />
              <Box
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                paddingLeft={2}
              >
                <Typography
                  sx={{ fontSize: '12px', fontFamily: FontFamily.bold }}
                >
                  {children}
                </Typography>
              </Box>
            </Stack>
          </MUIButton>
        </Stack>
      );
      // TODO: config Google Button

      return <MUIButton>Google</MUIButton>;
    default:
      return <MUIButton {...rest}>{children}</MUIButton>;
  }
}

Button.defaultProps = {
  customVariant: '',
  marginTop: 'none',
  size: 'medium',
};
