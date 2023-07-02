import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
  Stack,
} from '@mui/material';
import { SX_LINEAR_BUTTON } from '~/components/atoms/Button/styles';

interface ButtonProps extends MUIButtonProps {
  children: any;
}

export default function LinearButton({ children, ...rest }: ButtonProps) {
  return (
    <Stack>
      <MUIButton sx={SX_LINEAR_BUTTON} {...rest}>
        {children}
      </MUIButton>
    </Stack>
  );
}
