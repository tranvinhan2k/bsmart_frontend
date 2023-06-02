import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, MouseEvent } from 'react';
import { useProSidebar } from 'react-pro-sidebar';
import {
  IconSize,
  Color,
  MetricSize,
  FontSize,
  FontFamily,
} from '~/assets/variables';
import { image } from '~/constants/image';
import { selectProfile } from '~/redux/user/selector';
import { logOut } from '~/redux/user/slice';
import Icon from '~/components/atoms/Icon';

const mappingData = {
  title: 'Quản lí tài khoản',
  srcImage: image.noAvatar,
  altImage: 'Ảnh đại diện',
};

export default function AdminHeader() {
  const { toggleSidebar, collapsed, collapseSidebar } = useProSidebar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);

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
    navigate('/homepage');
    handleClose();
  };

  const handleProfile = () => {
    handleClose();
  };

  return (
    <Stack
      sx={{
        background: Color.white2,
        height: '100px',
        flexDirection: 'row',
        boxShadow: 3,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: MetricSize.large_30,
        paddingY: MetricSize.small_10,
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
      <Stack sx={{ flexGrow: 1 }}>
        <Typography
          sx={{
            color: Color.black,
            fontSize: FontSize.small_18,
            fontFamily: FontFamily.bold,
          }}
        >
          {mappingData.title}
        </Typography>
      </Stack>
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
          <MenuItem onClick={handleProfile}>Hồ Sơ</MenuItem>
          <MenuItem onClick={handleLogOut}>Đăng Xuất</MenuItem>
        </Menu>
      </Stack>
    </Stack>
  );
}
