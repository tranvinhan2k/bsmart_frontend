import { useDispatch, useSelector } from 'react-redux';
import { useState, MouseEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Badge, IconButton, Stack, Typography } from '@mui/material';
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
import { useLogOut, useMenuItem } from '~/hooks';
import { NotificationContext } from '~/HOCs/context/NotificationContext';
import Icon from '~/components/atoms/Icon';

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
  const profile = useSelector(selectProfile);
  const token = useSelector(selectToken);
  const role = profile?.roles?.[0]?.code;
  const filterParams = useSelector(selectFilterParams);
  const { handleClose, handleToggle, open, anchorRef } = useMenuItem();
  const { handleHookLogOut } = useLogOut();
  const { onOpenNotification, numberOfNotification, ref } =
    useContext(NotificationContext);

  const nameSplit = profile?.fullName?.split(' ') || [];

  const handleLogOut = async () => {
    handleHookLogOut();
    handleToggle();
  };

  const handleNavigateProfile = () => {
    handleToggle();

    window.location.href = `/${
      role !== 'STUDENT'
        ? NavigationLink.mentor_profile
        : NavigationLink.member_details
    }`;
  };

  const handleNavigateDashboard = () => {
    handleToggle();

    navigate(NavigationLink.dashboard);
  };

  const handleHomepage = () => {
    handleToggle();

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

            <IconButton ref={anchorRef} onClick={handleToggle}>
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

            <IconButton ref={ref} onClick={onOpenNotification}>
              <Badge color="error" badgeContent={numberOfNotification}>
                <Icon name="bell" size="small_20" color="white" />
              </Badge>
            </IconButton>
          </Stack>
          <CustomMenu
            open={open}
            anchorEl={anchorRef.current}
            onClose={handleClose}
            onToggleOpen={handleToggle}
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
          />
        </>
      )}
    </Stack>
  );
}
