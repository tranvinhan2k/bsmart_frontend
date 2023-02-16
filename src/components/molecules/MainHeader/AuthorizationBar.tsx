import { Button, Stack, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Colors, FontFamilies, FontSize, MetricSize } from '~/assets/variables';
import { ActionPayload } from '~/models';

interface AuthorizationBarProps {
  loginData: ActionPayload;
  registerData: ActionPayload;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

function AuthorizationBar({
  loginData,
  registerData,
  onLoginClick,
  onRegisterClick,
}: AuthorizationBarProps) {
  return (
    <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
      <Button
        style={{ padding: MetricSize.small, textDecoration: 'none' }}
        onClick={onLoginClick}
      >
        <Typography
          sx={{
            fontFamily: FontFamilies.regular,
            fontSize: FontSize.small_16,
            color: Colors.white,
            transitionDelay: '100ms',
            transitionProperty: 'color',
            '&:hover': {
              color: Colors.orange,
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
        style={{ padding: MetricSize.small, textDecoration: 'none' }}
      >
        <Typography
          sx={{
            fontFamily: FontFamilies.regular,
            fontSize: FontSize.small_16,
            color: Colors.white,
            transitionDelay: '100ms',
            transitionProperty: 'color',
            '&:hover': {
              color: Colors.orange,
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
