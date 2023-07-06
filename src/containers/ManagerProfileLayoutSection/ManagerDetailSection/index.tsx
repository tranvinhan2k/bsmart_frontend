import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Stack, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import localEnvironment from '~/utils/localEnvironment';
import Icon, { IconName } from '~/components/atoms/Icon';
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
import { ManagerNavigationActionData } from '~/routes/navigators';

export default function ManagerDetailSection() {
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

          {ManagerNavigationActionData.map((mainItem) => (
            <Stack key={mainItem.name}>
              <Typography sx={SX_SIDEBAR_TITLE}>{mainItem.name}</Typography>
              {mainItem?.items?.map((item) => {
                if (item.items) {
                  return (
                    <SubMenu
                      key={item.link}
                      rootStyles={STYLE_SUB_MENU_ROOT}
                      label={item.name}
                      icon={
                        <Icon
                          name={item.icon}
                          size="small_20"
                          color={
                            pathName.includes(item.name) ? 'black' : 'white'
                          }
                        />
                      }
                    >
                      {item.items.map((subItem) => (
                        <MenuItem
                          active={pathName.includes(subItem?.link || '')}
                          key={subItem.link}
                          component={
                            subItem.link && (
                              <Link style={STYLE_MENU_LINK} to={subItem.link} />
                            )
                          }
                          icon={
                            <Icon
                              name={subItem.icon}
                              size="small_20"
                              color={
                                pathName.includes(item?.link || '')
                                  ? 'white'
                                  : 'grey'
                              }
                            />
                          }
                        >
                          {subItem.name}
                        </MenuItem>
                      ))}
                    </SubMenu>
                  );
                }
                return (
                  <MenuItem
                    active={pathName.includes(item?.link || '')}
                    key={item.link}
                    component={
                      item?.link && (
                        <Link style={STYLE_MENU_LINK} to={item.link} />
                      )
                    }
                    icon={
                      <Icon
                        name={item.icon}
                        size="small_20"
                        color={
                          pathName.includes(item?.link || '') ? 'white' : 'grey'
                        }
                      />
                    }
                  >
                    {item.name}
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
