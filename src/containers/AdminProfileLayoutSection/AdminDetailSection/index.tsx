import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Stack, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import localEnvironment from '~/utils/localEnvironment';
import Icon, { IconName } from '~/components/atoms/Icon';

export default function AdminDetailSection() {
  const sidebarNavigations: {
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
  }[] = [
    {
      title: 'Chức năng chính',
      items: [
        {
          label: 'Trang chủ',
          icon: 'home',
          link: 'homepage',
        },
        {
          label: 'Người dùng',
          icon: 'user',
          link: 'user',
          items: [
            {
              label: 'Tài khoản',
              icon: 'account',
              link: 'account',
            },
            {
              label: 'Hồ sơ giáo viên',
              icon: 'teacher',
              link: 'teacher',
            },
          ],
        },
      ],
    },
    {
      title: 'Thao tác dữ liệu',
      items: [
        {
          label: 'Lớp học',
          icon: 'class',
          link: 'class',
        },
        {
          label: 'Phân loại',
          icon: 'category',
          link: 'category',
        },
        {
          label: 'Môn học',
          icon: 'subject',
          link: 'subject',
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
      title: 'Hệ thống',
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
    <Stack
      style={{
        background: Color.navy,
        width: '100%',
        height: '100%',
      }}
    >
      <Sidebar
        collapsedWidth="100px"
        style={{
          height: '100%',
          width: '100%',
          background: Color.navy,
        }}
      >
        <Menu
          style={{ background: Color.navy, height: '100vh' }}
          menuItemStyles={{
            label: ({ active, disabled, level }) => {
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
          <Stack padding={2}>
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: { xs: FontSize.small_18, md: FontSize.medium_28 },
                fontFamily: FontFamily.bold,
                color: Color.whiteSmoke,
              }}
            >
              {localEnvironment.APP_NAME.toUpperCase()}
            </Typography>
          </Stack>

          {sidebarNavigations.map((mainItem) => (
            <Stack key={mainItem.title}>
              <Typography
                sx={{
                  color: Color.whiteSmoke,
                  fontFamily: FontFamily.medium,
                  fontSize: FontSize.small_14,
                  marginLeft: MetricSize.large_20,
                  marginTop: MetricSize.large_30,
                }}
              >
                {mainItem.title}
              </Typography>
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
                          size="medium"
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
                              size="medium"
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
                        size="medium"
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
