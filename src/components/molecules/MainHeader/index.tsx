import { useDispatch, useSelector } from 'react-redux';
import { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { ActionPayload, ContractPayload, SocialPayload } from '~/models';
import { image } from '~/constants/image';
import { logOut } from '~/redux/user/slice';
import { ProfileImgType } from '~/constants/profile';
import { selectFilterParams } from '~/redux/courses/selector';
import { selectProfile, selectRole, selectToken } from '~/redux/user/selector';
import AuthorizationBar from './AuthorizationBar';
import SearchBar from '~/components/atoms/SearchBar';
import SocialBar from '../SocialBar';
import toast from '~/utils/toast';
import { SX_HEADER_CONTAINER } from './styles';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import { NavigationLink } from '~/constants/routeLink';
import CustomMenu from '~/components/atoms/CustomMenu';

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

  const nameSplit = profile?.fullName?.split(' ') || [];

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
    navigate(
      role !== 'ROLE_STUDENT'
        ? NavigationLink.mentor_profile
        : NavigationLink.member_details
    );
  };

  const handleNavigateDashboard = () => {
    navigate(NavigationLink.dashboard);
  };

  const handleHomepage = () => {
    navigate(NavigationLink.homepage);
  };

  return (
    <Stack sx={SX_HEADER_CONTAINER}>
      <SocialBar color="white" socials={socials} />
      {/* <ContractBar color="white" contracts={contracts} /> */}
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
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: MetricSize.medium_15,
            }}
          >
            <Typography sx={{ paddingRight: MetricSize.medium_15 }}>
              Xin chào,{' '}
              <span
                style={{
                  fontFamily: FontFamily.bold,
                  fontSize: FontSize.small_18,
                  color: Color.white,
                }}
              >
                {nameSplit?.[nameSplit.length - 1] || ''}
              </span>
            </Typography>
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
                  background: Color.white4,
                  boxShadow: 3,
                }}
              />
            </IconButton>
          </Stack>
          <CustomMenu
            anchorEl={anchorEl}
            menuItemData={[
              {
                icon: 'home',
                name: 'Trang chủ',
                onClick: handleHomepage,
              },
              {
                icon: 'account',
                name: 'Hồ sơ',
                onClick: handleNavigateProfile,
              },
              {
                icon: 'course',
                name: 'Quản lí học tập',
                onClick: handleNavigateDashboard,
              },
              {
                icon: 'logOut',
                name: 'Đăng Xuất',
                onClick: handleLogOut,
              },
            ]}
            onClose={handleClose}
          />
        </>
      )}
    </Stack>
  );
}
