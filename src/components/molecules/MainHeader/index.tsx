import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import { ActionPayload, ContractPayload, SocialPayload } from '~/models';
import { image } from '~/constants/image';
import { logOut } from '~/redux/user/slice';
import { ProfileImgType } from '~/constants/profile';
import { selectFilterParams } from '~/redux/courses/selector';
import { selectProfile, selectRole, selectToken } from '~/redux/user/selector';
import AuthorizationBar from './AuthorizationBar';
import ContractBar from '../ContractBar';
import SearchBar from '~/components/atoms/SearchBar';
import SocialBar from '../SocialBar';
import toast from '~/utils/toast';
import { SX_HEADER_CONTAINER } from './styles';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isNeedRedirect, setNeedRedirect] = useState<boolean>(false);

  useEffect(() => {
    if (isNeedRedirect) {
      navigate(
        role !== 'ROLE_STUDENT'
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
  const handleMenu = (event: MouseEvent<HTMLElement>) => {
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
            <Avatar
              alt="Avatar"
              src={
                profile?.userImages?.find(
                  (img) => img?.type === ProfileImgType.AVATAR
                )?.url || image.noAvatar
              }
              sx={{
                width: 40,
                height: 40,
              }}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
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
