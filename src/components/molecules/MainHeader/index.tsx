import React, { useEffect, useState } from 'react';
import { Stack, IconButton, Box, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthorizationBar from './AuthorizationBar';
import ContractBar from '../ContractBar';
import SocialBar from '../SocialBar';
import { ActionPayload, ContractPayload, SocialPayload } from '~/models';
import { SX_HEADER_CONTAINER } from './styles';
import SearchBar from '~/components/atoms/SearchBar';
import { IconSize } from '~/assets/variables';
import { selectProfile, selectRole, selectToken } from '~/redux/user/selector';
import { logOut } from '~/redux/user/slice';
import { image } from '~/constants/image';
import { selectFilterParams } from '~/redux/courses/selector';
import toast from '~/utils/toast';

interface MainHeaderProps {
  searchLabel: string;
  socials: SocialPayload[];
  contracts: ContractPayload[];
  authenticationData: ActionPayload[];
  onSearchText: (searchValue: string) => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export default function MainHeader({
  searchLabel,
  contracts,
  socials,
  authenticationData,
  onSearchText,
  onLoginClick,
  onRegisterClick,
}: MainHeaderProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const token = useSelector(selectToken);
  const role = useSelector(selectRole);
  const filterParams = useSelector(selectFilterParams);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isNeedRedirect, setNeedRedirect] = useState<boolean>(false);

  useEffect(() => {
    if (isNeedRedirect) {
      navigate(
        role !== 'STUDENT'
          ? '/mentor-profile/edit-profile'
          : '/member-details/edit-profile'
      );
      setNeedRedirect(false);
      window.location.reload();
    }
  }, [isNeedRedirect, navigate, role]);

  const handleClose = () => {
    setAnchorEl(() => null);
  };
  const handleLogOut = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    dispatch(logOut());
    handleClose();
    navigate('/homepage');
    toast.notifySuccessToast('Đăng xuất thành công');
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavigateProfile = () => {
    setAnchorEl(() => null);
    setNeedRedirect(true);
  };

  return (
    <Stack sx={SX_HEADER_CONTAINER}>
      <SocialBar color="white" socials={socials} />
      <ContractBar color="white" contracts={contracts} />
      <SearchBar
        value={filterParams.q || ''}
        color="white"
        placeholder={searchLabel}
        onSubmit={onSearchText}
      />

      {!token ? (
        <AuthorizationBar
          color="white"
          loginData={authenticationData[0]}
          registerData={authenticationData[1]}
          onLoginClick={onLoginClick}
          onRegisterClick={onRegisterClick}
        />
      ) : (
        <>
          <IconButton onClick={handleMenu}>
            <Box
              sx={{
                width: IconSize.large,
                height: IconSize.large,
                objectFit: 'contain',
                borderRadius: 1000,
              }}
              component="img"
              src={profile?.userImages?.[0]?.url || image.noAvatar}
              alt="authentication"
            />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onMouseLeave={handleClose}
          >
            <MenuItem onClick={handleNavigateProfile}>Hồ sơ </MenuItem>
            <MenuItem onClick={handleLogOut}>Đăng Xuất</MenuItem>
          </Menu>
        </>
      )}
    </Stack>
  );
}
