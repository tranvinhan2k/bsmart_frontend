import { Avatar, Box, IconButton, Stack } from '@mui/material';
import { useProSidebar } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import { ActionPayload } from '~/models';
import { Color, MetricSize } from '~/assets/variables';
import { DefaultSidebarLeft } from '~/components/molecules';
import { image } from '~/constants/image';
import { NavigationLink } from '~/constants/routeLink';
import { useLogOut, useMenuItem } from '~/hooks';
import CustomMenu from '~/components/atoms/CustomMenu';
import Icon from '~/components/atoms/Icon';

interface Props {
  children: React.ReactNode;
  actions: ActionPayload[];
}

export default function HighRoleSidebarWrapper({ children, actions }: Props) {
  const navigate = useNavigate();
  const { handleHookLogOut } = useLogOut();

  const { anchorRef, handleClose, handleToggle, open } = useMenuItem();
  const { toggleSidebar, toggled } = useProSidebar();

  const handleLogOut = () => {
    handleHookLogOut();
    handleToggle();
  };

  const handleProfile = () => {
    handleToggle();
  };

  const handleHomePage = () => {
    navigate(`/${NavigationLink.homepage}`);
  };

  const mappingData = {
    title: 'Quản lí tài khoản',
    srcImage: image.managerIconImg,
    altImage: 'Quản lí',
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
            zIndex: 10,
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
            <IconButton onClick={() => toggleSidebar(!toggled)}>
              <Icon name="menu" color="black" size="medium" />
            </IconButton>
          </Box>
          <Stack sx={{ flexGrow: 1 }} />
          <Stack>
            <IconButton ref={anchorRef} onClick={handleToggle}>
              <Avatar alt={mappingData.title} src={mappingData.srcImage} />
            </IconButton>
            <CustomMenu
              open={open}
              anchorEl={anchorRef.current}
              onClose={handleClose}
              onToggleOpen={handleToggle}
              menuItemData={[
                {
                  icon: 'home',
                  name: 'Trang chủ',
                  onClick: handleHomePage,
                },
                {
                  icon: 'account',
                  name: 'Mật khẩu',
                  onClick: handleProfile,
                },
                {
                  icon: 'logOut',
                  name: 'Đăng xuất',
                  onClick: handleLogOut,
                },
              ]}
            />
          </Stack>
        </Stack>
        <Stack sx={{ width: '100%' }}>{children}</Stack>
      </Stack>
    </Stack>
  );
}
