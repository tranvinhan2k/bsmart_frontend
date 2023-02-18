import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
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
import { SX_NAVIGATION_STACK } from './styles';
import { useState } from 'react';

const APP_NAME = import.meta.env.VITE_WEBSITE_NAME;

interface NavigationProps {
  pathName: string;
  pages: ActionPayload[];
}

export default function MainNavigation({ pathName, pages }: NavigationProps) {
  const [isOpenDrawer, setOpenDrawer] = useState<boolean>(false);
  const handleDrawerToggle = () => {
    setOpenDrawer(!isOpenDrawer);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {pages.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Stack sx={SX_NAVIGATION_STACK}>
      <Stack>
        <Typography
          sx={{
            fontSize: { xs: FontSize.medium, md: FontSize.large },
            fontFamily: FontFamilies.bold,
            color: Colors.navy,
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
                style={{ textDecoration: 'none', padding: MetricSize.medium }}
                key={item.link}
                to={item.link}
              >
                <Typography
                  style={{
                    fontFamily: FontFamilies.bold,
                    fontSize: FontSize.small,
                    color: pathName === item.link ? Colors.orange : Colors.navy,
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
