import { Stack, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useState, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { useProSidebar } from 'react-pro-sidebar';
import { ActionPayload } from '~/models';
import { DefaultSidebarLeft } from '~/components/molecules';
import { Color, IconSize, MetricSize } from '~/assets/variables';

import { NavigationLink } from '~/constants/routeLink';

import { logOut } from '~/redux/user/slice';

import Icon from '~/components/atoms/Icon';
import { image } from '~/constants/image';

interface Props {
  children: React.ReactNode;
  actions: ActionPayload[];
}

export default function HighRoleSidebarWrapper({ children, actions }: Props) {
  const navigate = useNavigate();
  const { toggleSidebar, collapsed, collapseSidebar } = useProSidebar();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = () => {
    toggleSidebar();
    if (collapsed) {
      collapseSidebar();
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    dispatch(logOut());
    navigate(`/${NavigationLink.homepage}`);
    handleClose();
  };

  const handleProfile = () => {
    handleClose();
  };

  const handleHomePage = () => {
    navigate(`/${NavigationLink.homepage}`);
  };

  const mappingData = {
    title: 'Quản lí tài khoản',
    srcImage: image.noAvatar,
    altImage: 'Ảnh đại diện',
  };

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Stack
        sx={{
          borderRight: `0.5px solid ${Color.border}`,
        }}
      >
        <DefaultSidebarLeft data={actions} />
      </Stack>
      <Stack
        sx={{
          flexGrow: 1,
          flex: 1,
          height: '100vh',
          overflow: 'scroll',
          '::-webkit-scrollbar': {
            display: 'none',
          },
          background: Color.white,
        }}
      >
        <Stack
          sx={{
            background: Color.white4,
            height: '52px',
            position: 'sticky',
            top: 0,
            borderBottom: `1px solid ${Color.border}`,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingX: MetricSize.large_30,
          }}
        >
          <Box
            sx={{
              display: 'block',
              '@media (min-width: 770px)': {
                display: 'none',
              },
            }}
          >
            <IconButton onClick={handleToggle}>
              <Icon name="menu" color="black" size="medium" />
            </IconButton>
          </Box>
          <Stack sx={{ flexGrow: 1 }} />
          <Stack>
            <IconButton onClick={handleClick}>
              <Box
                sx={{
                  width: IconSize.large,
                  height: IconSize.large,
                  objectFit: 'contain',
                  borderRadius: 1000,
                }}
                component="img"
                src={mappingData.srcImage}
                alt={mappingData.altImage}
              />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleHomePage}>Trang Chủ</MenuItem>
              <MenuItem onClick={handleProfile}>Hồ Sơ</MenuItem>
              <MenuItem onClick={handleLogOut}>Đăng Xuất</MenuItem>
            </Menu>
          </Stack>
        </Stack>
        <Stack sx={{ width: '100%' }}>{children}</Stack>
      </Stack>
    </Stack>
  );
}
