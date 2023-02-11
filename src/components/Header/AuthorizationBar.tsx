import { Stack, Tooltip, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Colors, FontFamilies, FontSize, MetricSize } from '~/assets/variables';
import { ActionPayload } from '~/models';

interface AuthorizationBarProps {
  loginData: ActionPayload;
  registerData: ActionPayload;
}

function AuthorizationBar({ loginData, registerData }: AuthorizationBarProps) {
  return (
    <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
      <NavLink
        style={{ padding: MetricSize.small, textDecoration: 'none' }}
        to={loginData.link}
      >
        <Typography
          sx={{
            fontFamily: FontFamilies.regular,
            fontSize: FontSize.small,
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
      </NavLink>
      <Typography>|</Typography>
      <NavLink
        key={registerData.name}
        style={{ padding: MetricSize.small, textDecoration: 'none' }}
        to={registerData.link}
      >
        <Typography
          sx={{
            fontFamily: FontFamilies.regular,
            fontSize: FontSize.small,
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
      </NavLink>
    </Stack>
  );
}

export default AuthorizationBar;
