import React from 'react';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from 'react-pro-sidebar';
import { Stack, Typography, Box, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import localEnvironment from '~/utils/localEnvironment';
import Icon, { IconName } from '~/components/atoms/Icon';
import { ADMIN_SIDE_BAR_NAVIGATION } from '~/constants';
import {
  STYLE_MENU,
  STYLE_SIDEBAR,
  SX_APP_NAME,
  SX_SIDEBAR_TITLE,
  SX_WRAPPER,
  STYLE_MENU_ITEM_BUTTON_ACTIVE,
  STYLE_MENU_ITEM_BUTTON,
  STYLE_MENU_ITEM_ICO_ACTIVE,
  STYLE_MENU_ITEM_ICO,
  STYLE_MENU_ITEM_LABEL_ACTIVE,
  STYLE_MENU_ITEM_LABEL,
  STYLE_MENU_ITEM_ROOT_ACTIVE,
  STYLE_MENU_ITEM_ROOT,
  STYLE_SUB_MENU_ROOT,
  STYLE_MENU_LINK,
  STYLE_SCROLLBAR,
} from './style';
import { Color, MetricSize } from '~/assets/variables';

export default function AdminDetailSection() {
  const { toggled, collapsed, collapseSidebar, toggleSidebar } =
    useProSidebar();
  const location = useLocation();
  const pathName = location.pathname;

  console.log(toggled, collapsed);

  const toggle = () => {
    toggleSidebar();
    if (!toggled) {
      collapseSidebar();
    }
  };

  const handleCollapsed = () => {
    collapseSidebar();
  };

  return (
    <Stack sx={SX_WRAPPER}>
      {!toggled && (
        <Box
          sx={{
            position: 'absolute',
            right: '-20px',
            top: MetricSize.small_10,
            zIndex: 1000,
            display: 'none',
            '@media (min-width: 770px)': {
              display: 'block',
            },
          }}
        >
          <IconButton
            onClick={handleCollapsed}
            sx={{
              background: Color.aquamarine,
              boxShadow: 3,
              ':hover': {
                background: Color.grey,
              },
            }}
          >
            <Icon
              name={collapsed ? 'right' : 'left'}
              size="medium"
              color="black"
            />
          </IconButton>
        </Box>
      )}

      <Sidebar collapsedWidth="100px" style={STYLE_SIDEBAR} breakPoint="md">
        <Stack sx={STYLE_SCROLLBAR}>
          <Menu
            style={STYLE_MENU}
            menuItemStyles={{
              label: ({ active }) =>
                active ? STYLE_MENU_ITEM_LABEL_ACTIVE : STYLE_MENU_ITEM_LABEL,
              icon: ({ active }) =>
                active ? STYLE_MENU_ITEM_ICO_ACTIVE : STYLE_MENU_ITEM_ICO,
              button: ({ active }) =>
                active ? STYLE_MENU_ITEM_BUTTON_ACTIVE : STYLE_MENU_ITEM_BUTTON,
              root: ({ active }) =>
                active ? STYLE_MENU_ITEM_ROOT_ACTIVE : STYLE_MENU_ITEM_ROOT,
            }}
          >
            <Stack p={2}>
              {!collapsed && (
                <Typography sx={SX_APP_NAME}>
                  {localEnvironment.APP_NAME.toUpperCase()}
                </Typography>
              )}
            </Stack>

            {ADMIN_SIDE_BAR_NAVIGATION.map((mainItem) => (
              <Stack key={mainItem.title}>
                <Typography sx={SX_SIDEBAR_TITLE}>{mainItem.title}</Typography>

                {mainItem.items.map((item) => {
                  if (item.items) {
                    return (
                      <SubMenu
                        key={item.link}
                        rootStyles={STYLE_SUB_MENU_ROOT}
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
                              <Link style={STYLE_MENU_LINK} to={subItem.link} />
                            }
                            icon={
                              <Icon
                                name={subItem.icon}
                                size="small_20"
                                color={
                                  pathName.includes(item.link)
                                    ? 'white'
                                    : 'grey'
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
                        <Link style={STYLE_MENU_LINK} to={item.link} />
                      }
                      icon={
                        <Icon
                          name={item.icon}
                          size="small_20"
                          color={
                            pathName.includes(item.link) ? 'white' : 'grey'
                          }
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
        </Stack>
      </Sidebar>
    </Stack>
  );
}
