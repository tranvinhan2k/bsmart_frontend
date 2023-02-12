import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/material/Menu';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Colors,
  FontFamilies,
  FontSize,
  IconSize,
  MetricSize,
} from '~/assets/variables';
import { NavigationActionData } from '~/constants';
import { ActionPayload } from '~/models';
import cart from '~/assets/images/icons8_shopping_cart_52px_2.png';

const APP_NAME = import.meta.env.VITE_WEBSITE_NAME;

interface NavigationProps {
  pages: ActionPayload[];
}

export default function Navigation({ pages }: NavigationProps) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        paddingX: MetricSize.extraLarge,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
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
        {NavigationActionData.map((item) => (
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
