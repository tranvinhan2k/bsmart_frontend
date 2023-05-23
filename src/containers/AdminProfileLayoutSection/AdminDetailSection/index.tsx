import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Stack, Typography } from '@mui/material';
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
} from './style';

export default function AdminDetailSection() {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <Stack sx={SX_WRAPPER}>
      <Sidebar collapsedWidth="100px" style={STYLE_SIDEBAR}>
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
            <Typography sx={SX_APP_NAME}>
              {localEnvironment.APP_NAME.toUpperCase()}
            </Typography>
          </Stack>

          {ADMIN_SIDE_BAR_NAVIGATION.map((mainItem) => (
            <Stack key={mainItem.title}>
              <Typography sx={SX_SIDEBAR_TITLE}>{mainItem.title}</Typography>
              {mainItem.items.map((item) => {
                if (item.items) {
                  return (
                    <SubMenu
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
                    component={<Link style={STYLE_MENU_LINK} to={item.link} />}
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
