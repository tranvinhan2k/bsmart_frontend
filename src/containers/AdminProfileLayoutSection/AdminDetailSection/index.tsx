import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Color, FontFamily, FontSize } from '~/assets/variables';
import localEnvironment from '~/utils/localEnvironment';
import Icon, { IconName } from '~/components/atoms/Icon';

export default function AdminDetailSection() {
  const sidebarNavigations: { label: string; icon: IconName; link: string }[] =
    [
      {
        label: 'Quản lí tài khoản',
        icon: 'user',
        link: 'user',
      },
      {
        label: 'Quản lí khóa học',
        icon: 'course',
        link: 'course',
      },
    ];

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: Color.whiteSmoke,
        width: '100%',
      }}
    >
      <Sidebar collapsedWidth="100px" style={{ width: '100%' }}>
        <Menu
          menuItemStyles={{
            label: {
              fontSize: FontSize.small_18,
              fontFamily: FontFamily.regular,
              color: Color.black,
            },
          }}
        >
          <Stack padding={2}>
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: { xs: FontSize.medium_24, md: FontSize.large_45 },
                fontFamily: FontFamily.bold,
                color: Color.navy,
              }}
            >
              {localEnvironment.APP_NAME.toUpperCase()}
            </Typography>
          </Stack>

          {sidebarNavigations.map((item) => (
            <MenuItem
              key={item.link}
              component={<Link to={item.link} />}
              icon={<Icon name={item.icon} size="medium" />}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </div>
  );
}
