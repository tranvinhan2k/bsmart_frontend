import { useState, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { useProSidebar } from 'react-pro-sidebar';

import { Box, IconButton, Menu, MenuItem, Stack } from '@mui/material';

import { IconSize, Color, MetricSize } from '~/assets/variables';

import { image } from '~/constants/image';
import { NavigationLink } from '~/constants/routeLink';

import { logOut } from '~/redux/user/slice';

import Icon from '~/components/atoms/Icon';

const mappingData = {
  title: 'Quản lí tài khoản',
  srcImage: image.noAvatar,
  altImage: 'Ảnh đại diện',
};

export default function AdminHeader() {
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

  return (
    <Stack
      sx={{
        background: Color.white2,
        height: '70px',
        flexDirection: 'row',
        boxShadow: 3,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: MetricSize.large_30,
        position: 'sticky',
        top: 0,
        zIndex: 999,
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
  );
}
