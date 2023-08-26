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
import { AvatarMenu } from '~/components/molecules/sidebar/default/AvatarMenu';

interface Props {
  children: React.ReactNode;
  actions: ActionPayload[];
}

export default function HighRoleSidebarWrapper({ children, actions }: Props) {
  const { toggleSidebar, toggled } = useProSidebar();

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
        <DefaultSidebarLeft
          data={actions}
          title={mappingData.title}
          srcImage={mappingData.srcImage}
        />
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
          background: '#f9fbff',
        }}
      >
        <Stack
          sx={{
            height: '52px',
            zIndex: 10,
            position: 'sticky',
            top: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingX: '15px',
            background: Color.white,
            '@media (min-width: 770px)': {
              display: 'none',
            },
          }}
        >
          <Box>
            <IconButton onClick={() => toggleSidebar(!toggled)}>
              <Icon name="menu" color="black" size="medium" />
            </IconButton>
          </Box>
          <Stack sx={{ flexGrow: 1 }} />
          <AvatarMenu
            title={mappingData.title}
            srcImage={mappingData.srcImage}
          />
        </Stack>
        <Stack sx={{ width: '100%' }}>{children}</Stack>
      </Stack>
    </Stack>
  );
}
