import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Stack, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Color, FontFamily, FontSize } from '~/assets/variables';
import localEnvironment from '~/utils/localEnvironment';
import Icon, { IconName } from '~/components/atoms/Icon';
import { AdminNavigationActionData } from '~/constants';
import {
  STYLE_MENU,
  STYLE_SIDEBAR,
  SX_APP_NAME,
  SX_SIDEBAR_TITLE,
  SX_WRAPPER,
} from './style';

export default function AdminDetailSection() {
  interface SidebarNavigationProps {
    title: string;
    items: {
      label: string;
      icon: IconName;
      link: string;
      items?: {
        label: string;
        icon: IconName;
        link: string;
      }[];
    }[];
  }
  const sidebarNavigation: SidebarNavigationProps[] = [
    {
      title: '',
      items: [
        {
          label: 'Trang chủ',
          icon: 'home',
          link: 'homepage',
        },
      ],
    },
    {
      title: 'Quản lý',
      items: [
        {
          label: 'Người dùng',
          icon: 'user',
          link: 'user',
          items: [
            {
              label: 'Danh sách',
              icon: 'account',
              link: 'account',
            },
            {
              label: 'Yêu cầu tạo tài khoản',
              icon: 'teacher',
              link: `/${AdminNavigationActionData[2].link}`,
            },
          ],
        },
        {
          label: 'Lớp học',
          icon: 'class',
          link: 'user',
          items: [
            {
              label: 'Danh sách',
              icon: 'account',
              link: 'account',
            },
            {
              label: 'Yêu cầu tạo lớp học',
              icon: 'class',
              link: `/${AdminNavigationActionData[4].link}`,
            },
          ],
        },
        {
          label: 'Môn học',
          icon: 'subject',
          link: 'user',
          items: [
            {
              label: 'Danh sách',
              icon: 'account',
              link: 'user',
            },
            {
              label: 'Yêu cầu tạo môn học',
              icon: 'class',
              link: 'user',
            },
          ],
        },
        {
          label: 'Blog',
          icon: 'blog',
          link: 'blog',
        },
        {
          label: 'Câu hỏi',
          icon: 'question',
          link: 'question',
        },
      ],
    },
    {
      title: 'Cá nhân',
      items: [
        {
          label: 'Cài đặt',
          icon: 'setting',
          link: 'setting',
        },
      ],
    },
  ];

  const location = useLocation();
  const pathName = location.pathname;

  return (
    <Stack sx={SX_WRAPPER}>
      <Sidebar collapsedWidth="100px" style={STYLE_SIDEBAR}>
        <Menu
          style={STYLE_MENU}
          menuItemStyles={{
            label: ({ active }) => {
              return {
                fontSize: FontSize.small_16,
                fontFamily: FontFamily.regular,
                color: active ? Color.white : Color.whiteSmoke,
              };
            },
            icon: (params) => {
              return {
                color: params.active ? Color.white : Color.grey,
                ':hover': {
                  color: Color.black,
                },
              };
            },
            button: (params) => {
              return {
                background: params.active ? `${Color.orange}` : Color.navy,
                ':hover': {
                  background: `${Color.orange}55`,
                },
              };
            },
            root: (params) => {
              return {
                background: params.active ? `${Color.white}55` : Color.navy,
                ':hover': {
                  color: `${Color.black}`,
                },
              };
            },
          }}
        >
          <Stack p={2}>
            <Typography sx={SX_APP_NAME}>
              {localEnvironment.APP_NAME.toUpperCase()}
            </Typography>
          </Stack>

          {sidebarNavigation.map((mainItem) => (
            <Stack key={mainItem.title}>
              <Typography sx={SX_SIDEBAR_TITLE}>{mainItem.title}</Typography>
              {mainItem.items.map((item) => {
                if (item.items) {
                  return (
                    <SubMenu
                      rootStyles={{
                        color: Color.white,
                      }}
                      label={item.label}
                      icon={
                        <Icon
                          name={item.icon}
                          size="small_20"
                          color={
                            pathName.includes(item.link) ? 'black' : 'white'
                          }
                        />
                      }
                    >
                      {item.items.map((subItem) => (
                        <MenuItem
                          active={pathName.includes(subItem.link)}
                          key={subItem.link}
                          component={
                            <Link
                              style={{
                                color: Color.grey,
                                fontSize: FontSize.small_16,
                                fontFamily: FontFamily.regular,
                              }}
                              to={subItem.link}
                            />
                          }
                          icon={
                            <Icon
                              name={subItem.icon}
                              size="small_20"
                              color={
                                pathName.includes(item.link) ? 'white' : 'grey'
                              }
                            />
                          }
                        >
                          {subItem.label}
                        </MenuItem>
                      ))}
                    </SubMenu>
                  );
                }
                return (
                  <MenuItem
                    active={pathName.includes(item.link)}
                    key={item.link}
                    component={
                      <Link
                        style={{
                          color: Color.grey,
                          fontSize: FontSize.small_16,
                          fontFamily: FontFamily.regular,
                        }}
                        to={item.link}
                      />
                    }
                    icon={
                      <Icon
                        name={item.icon}
                        size="small_20"
                        color={pathName.includes(item.link) ? 'white' : 'grey'}
                      />
                    }
                  >
                    {item.label}
                  </MenuItem>
                );
              })}
            </Stack>
          ))}
        </Menu>
      </Sidebar>
    </Stack>
  );
}
