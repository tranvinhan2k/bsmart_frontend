import { Button, Stack, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import { ActionPayload } from '~/models';

interface AuthorizationBarProps {
  color: 'white' | 'black';
  loginData: ActionPayload;
  registerData: ActionPayload;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

function AuthorizationBar({
  color = 'black',
  loginData,
  registerData,
  onLoginClick,
  onRegisterClick,
}: AuthorizationBarProps) {
  return (
    <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
      <Button
        style={{ padding: MetricSize.small_5, textDecoration: 'none' }}
        onClick={onLoginClick}
      >
        <Typography
          sx={{
            fontFamily: FontFamily.regular,
            fontSize: FontSize.small_16,
            color: Colors[color],
            transitionDelay: '100ms',
            transitionProperty: 'color',
            '&:hover': {
              color: Color.orange,
            },
          }}
        >
          {loginData.name}
        </Typography>
      </Button>
      <Typography>|</Typography>
      <Button
        onClick={onRegisterClick}
        key={registerData.name}
        style={{ padding: MetricSize.small_5, textDecoration: 'none' }}
      >
        <Typography
          sx={{
            fontFamily: FontFamily.regular,
            fontSize: FontSize.small_16,
            color: Colors[color],
            transitionDelay: '100ms',
            transitionProperty: 'color',
            '&:hover': {
              color: Color.orange,
            },
          }}
        >
          {registerData.name}
        </Typography>
      </Button>
    </Stack>
  );
}

export default AuthorizationBar;
