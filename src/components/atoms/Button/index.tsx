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
  SX_GOOGLE_BUTTON,
  SX_GOOGLE_STACK,
  SX_NORMAL_BUTTON,
  SX_OUTLINED_BUTTON,
} from '~/components/atoms/Button/styles';
import { MetricSizeKeys } from '~/models/variables';
import { FontFamily, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';

interface ButtonProps extends MUIButtonProps {
  customVariant?: ButtonVariant;
  children: any;
  marginTop?: MetricSizeKeys;
}

export default function Button({
  customVariant,
  children,
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
        <Stack marginTop={MetricSize[marginTop]}>
          <MUIButton sx={SX_NORMAL_BUTTON} {...rest}>
            {children}
          </MUIButton>
        </Stack>
      );
    case 'outlined':
      return (
        <Stack marginTop={MetricSize[marginTop]}>
          <MUIButton sx={SX_OUTLINED_BUTTON} {...rest}>
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

      return <MUIButton>Goole</MUIButton>;
    default:
      return <MUIButton {...rest}>{children}</MUIButton>;
  }
}

Button.defaultProps = {
  customVariant: '',
  marginTop: 'none',
};
