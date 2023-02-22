import { IconButton, Stack, Typography, SwipeableDrawer } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
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
import { APP_NAME, AuthorizationActionData } from '~/constants';
import AuthorizationBar from '../../MainHeader/AuthorizationBar';

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
  const handleDrawerToggle = () => {
    setOpenDrawer(!isOpenDrawer);
  };

  const handleNavigation = (link: string) => {
    if (isOpenDrawer) {
      handleDrawerToggle();
    }
    navigation(link);
  };

  const renderNavigationList = () => {
    return (
      pages &&
      pages.map(
        (item) =>
          !item.isHide && (
            <NavLink
              style={{ textDecoration: 'none', padding: MetricSize.medium_15 }}
              key={item.link}
              to={item.link}
              onClick={() => {
                if (isOpenDrawer) handleDrawerToggle();
              }}
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
          {APP_NAME.toUpperCase()}
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
        <IconButton>
          <img
            style={{ width: IconSize.medium, height: IconSize.medium }}
            src={cart}
            alt="cart"
          />
        </IconButton>
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
              {APP_NAME.toUpperCase()}
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
