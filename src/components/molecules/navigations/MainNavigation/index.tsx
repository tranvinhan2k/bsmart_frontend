import {
  IconButton,
  Stack,
  Typography,
  SwipeableDrawer,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Color,
  FontFamily,
  FontSize,
  IconSize,
  MetricSize,
} from '~/assets/variables';
import cart from '~/assets/images/icons8_shopping_cart_52px_2.png';
import { ActionPayload, ContractPayload, SocialPayload } from '~/models';
import { SX_NAVIGATION_STACK } from './styles';
import Icon from '~/components/atoms/Icon';
import SearchBar from '~/components/atoms/SearchBar';
import SocialBar from '~/components/molecules/SocialBar';
import ContractBar from '~/components/molecules/ContractBar';
import { AuthorizationActionData } from '~/constants';
import AuthorizationBar from '../../MainHeader/AuthorizationBar';
import localEnvironment from '~/utils/localEnvironment';
import { selectRole } from '~/redux/user/selector';

interface NavigationProps {
  pathName: string;
  pages: ActionPayload[];
  socials: SocialPayload[];
  contracts: ContractPayload[];
  onSearchCourse: (searchValue: string) => void;
}

export default function MainNavigation({
  pathName,
  pages,
  contracts,
  socials,
  onSearchCourse,
}: NavigationProps) {
  const navigation = useNavigate();
  const [isOpenDrawer, setOpenDrawer] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const role = useSelector(selectRole);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setOpenDrawer(!isOpenDrawer);
  };

  const handleNavigateCartPage = () => {
    navigation('/cart');
  };

  const handleNavigation = (link: string) => {
    if (isOpenDrawer) {
      handleDrawerToggle();
    }
    navigation(link);
  };

  const handleNavigateClick = (id: number) => {
    navigation('mentor-profile');
    handleClose();
  };

  const renderNavigationList = () => {
    return (
      pages &&
      pages.map(
        (item) =>
          !item.isHide && (
            <React.Fragment key={item.link}>
              <NavLink
                style={{
                  textDecoration: 'none',
                  padding: MetricSize.medium_15,
                }}
                to={item.link}
                onClick={(event) => {
                  if (item.link.includes('mentor-profile')) {
                    event.preventDefault();
                    handleClick(event);
                  } else if (isOpenDrawer) handleDrawerToggle();
                }}
              >
                <Typography
                  style={{
                    fontFamily: FontFamily.bold,
                    fontSize: FontSize.small_16,
                    color: pathName.includes(item.link)
                      ? Color.orange
                      : Color.navy,
                  }}
                >
                  {item.name}
                </Typography>
              </NavLink>
              {item.link.includes('mentor-profile') && (
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => handleNavigateClick(0)}>
                    Mentor Cuong
                  </MenuItem>
                  <MenuItem onClick={() => handleNavigateClick(0)}>
                    Mentor Bao
                  </MenuItem>
                </Menu>
              )}
            </React.Fragment>
          )
      )
    );
  };

  return (
    <Stack sx={SX_NAVIGATION_STACK}>
      <Stack>
        <Typography
          sx={{
            fontSize: { xs: FontSize.medium_24, md: FontSize.large_45 },
            fontFamily: FontFamily.bold,
            color: Color.navy,
          }}
        >
          {localEnvironment.APP_NAME.toUpperCase()}
        </Typography>
      </Stack>
      <Stack
        sx={{
          display: { xs: 'none', md: 'flex' },
        }}
        flexDirection="row"
      >
        {renderNavigationList()}
      </Stack>
      <Stack
        sx={{
          display: { xs: 'none', md: 'flex' },
        }}
      >
        {' '}
        {role !== 'TEACHER' && (
          <IconButton onClick={handleNavigateCartPage}>
            <img
              style={{ width: IconSize.medium, height: IconSize.medium }}
              src={cart}
              alt="cart"
            />
          </IconButton>
        )}
      </Stack>
      <Stack
        sx={{
          display: { xs: 'flex', md: 'none' },
        }}
      >
        <IconButton onClick={handleDrawerToggle}>
          <Icon name="menu" size="medium" />
        </IconButton>
      </Stack>

      <SwipeableDrawer
        anchor="right"
        open={isOpenDrawer}
        onClose={handleDrawerToggle}
        onOpen={handleDrawerToggle}
      >
        <Stack sx={{ padding: MetricSize.medium_15 }}>
          <Stack
            sx={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: FontFamily.bold,
                fontSize: FontSize.medium_24,
                color: Color.navy,
              }}
            >
              {localEnvironment.APP_NAME.toUpperCase()}
            </Typography>
            <IconButton onClick={handleDrawerToggle}>
              <Icon name="close" color="navy" size="medium" />
            </IconButton>
          </Stack>
          {renderNavigationList()}
          <SearchBar
            color="black"
            placeholder="Tìm kiếm khóa học"
            onSubmit={onSearchCourse}
          />

          <ContractBar color="black" contracts={contracts} />
          <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <SocialBar color="black" socials={socials} />
            <AuthorizationBar
              color="black"
              loginData={AuthorizationActionData[0]}
              registerData={AuthorizationActionData[1]}
              onLoginClick={() =>
                handleNavigation(AuthorizationActionData[0].link)
              }
              onRegisterClick={() =>
                handleNavigation(AuthorizationActionData[1].link)
              }
            />
          </Stack>
        </Stack>
      </SwipeableDrawer>
    </Stack>
  );
}
