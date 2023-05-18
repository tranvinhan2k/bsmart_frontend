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

const mappingData = {
  title: 'Quản lí tài khoản',
  srcImage: image.noAvatar,
  altImage: 'Ảnh đại diện',
};

export default function AdminHeader() {
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

  const handleLogOut = () => {
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
        height: '70px',
        flexDirection: 'row',
        boxShadow: 3,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: MetricSize.medium_15,
      }}
    >
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
