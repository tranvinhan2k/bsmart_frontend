import { IconButton, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import {
  Colors,
  FontFamilies,
  FontSize,
  IconSize,
  MetricSize,
} from '~/assets/variables';
import cart from '~/assets/images/icons8_shopping_cart_52px_2.png';
import { ActionPayload } from '~/models';

const APP_NAME = import.meta.env.VITE_WEBSITE_NAME;

interface NavigationProps {
  pages: ActionPayload[];
}

export default function MainNavigation({ pages }: NavigationProps) {
  return (
    <Stack
      sx={{
        background: Colors.white,
        flexDirection: 'row',
        paddingX: MetricSize.extraLarge,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 4,
      }}
    >
      <Stack>
        <Typography
          sx={{
            fontSize: FontSize.large,
            fontFamily: FontFamilies.bold,
            color: Colors.navy,
          }}
        >
          {APP_NAME}
        </Typography>
      </Stack>
      <Stack flexDirection="row">
        {pages.map((item) => (
          <NavLink
            style={{ textDecoration: 'none', padding: MetricSize.medium }}
            key={item.link}
            to={item.link}
          >
            <Typography
              style={{
                fontFamily: FontFamilies.bold,
                fontSize: FontSize.small,
                color: Colors.navy,
              }}
            >
              {item.name}
            </Typography>
          </NavLink>
        ))}
      </Stack>
      <Stack>
        <IconButton>
          <img
            style={{ width: IconSize.medium, height: IconSize.medium }}
            src={cart}
            alt="cart"
          />
        </IconButton>
      </Stack>
    </Stack>
  );
}
