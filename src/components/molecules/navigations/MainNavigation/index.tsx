import { IconButton, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import {
  Color,
  FontFamily,
  FontSize,
  IconSize,
  MetricSize,
} from '~/assets/variables';
import cart from '~/assets/images/icons8_shopping_cart_52px_2.png';
import { ActionPayload } from '~/models';
import { SX_NAVIGATION_STACK } from './styles';

const APP_NAME = import.meta.env.VITE_WEBSITE_NAME;

interface NavigationProps {
  pathName: string;
  pages: ActionPayload[];
}

export default function MainNavigation({ pathName, pages }: NavigationProps) {
  return (
    <Stack sx={SX_NAVIGATION_STACK}>
      <Stack>
        <Typography
          sx={{
            fontSize: FontSize.large_45,
            fontFamily: FontFamily.bold,
            color: Color.navy,
          }}
        >
          {APP_NAME.toUpperCase()}
        </Typography>
      </Stack>
      <Stack flexDirection="row">
        {pages.map(
          (item) =>
            !item.isHide && (
              <NavLink
                style={{ textDecoration: 'none', padding: MetricSize.medium_15 }}
                key={item.link}
                to={item.link}
              >
                <Typography
                  style={{
                    fontFamily: FontFamily.bold,
                    fontSize: FontSize.small_16,
                    color: pathName === item.link ? Color.orange : Color.navy,
                  }}
                >
                  {item.name}
                </Typography>
              </NavLink>
            )
        )}
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
