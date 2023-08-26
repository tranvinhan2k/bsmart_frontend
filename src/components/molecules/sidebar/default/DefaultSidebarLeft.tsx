import {
  Stack,
  Box,
  IconButton,
  Typography,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Menu,
  SubMenu,
  MenuItem,
  Sidebar as RPSSidebar,
  useProSidebar,
} from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import { Color, FontFamily, FontSize } from '~/assets/variables';
import {
  STYLE_SIDEBAR,
  STYLE_SCROLLBAR,
  STYLE_MENU,
  STYLE_MENU_ITEM_LABEL_ACTIVE,
  STYLE_MENU_ITEM_LABEL,
  STYLE_MENU_ITEM_ICO_ACTIVE,
  STYLE_MENU_ITEM_ICO,
  STYLE_MENU_ITEM_BUTTON_ACTIVE,
  STYLE_MENU_ITEM_BUTTON,
  STYLE_MENU_ITEM_ROOT_ACTIVE,
  STYLE_MENU_ITEM_ROOT,
  SX_SIDEBAR_TITLE,
  STYLE_MENU_LINK,
} from './styles';
import localEnvironment from '~/utils/localEnvironment';
import Icon from '~/components/atoms/Icon';
import globalStyles from '~/styles';
import { image } from '~/constants/image';
import { ActionPayload } from '~/models';
import { AvatarMenu } from './AvatarMenu';

interface Props {
  data: ActionPayload[];
  title: string;
  srcImage: string;
}

export default function DefaultSidebarLeft({ data, title, srcImage }: Props) {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <Stack>
      <RPSSidebar collapsedWidth="100px" style={STYLE_SIDEBAR} breakPoint="md">
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
            <Stack
              sx={{
                marginTop: 3,
                paddingLeft: 3,
                paddingY: 1,
                flexDirection: 'row',
                alignItems: 'flex-start',
                'MuiSvgIcon-root': {
                  width: '10px',
                  height: '10px',
                },
              }}
            >
              <Box
                alt="logo"
                sx={{
                  width: '30px',
                  height: undefined,
                  aspectRatio: 1,
                  objectFit: 'contain',
                }}
                src={image.lms_logo}
                component="img"
              />
              <Typography
                sx={{
                  ...globalStyles.textWhiteSubTitle,
                  color: Color.black,
                  marginLeft: 1,
                  transition: 'all 1s ease',
                  textAlign: 'center',
                }}
              >
                {`${localEnvironment.APP_NAME}`.toUpperCase()}
              </Typography>
            </Stack>
            {data.map((mainItem) => (
              <Stack key={mainItem.name}>
                <Stack paddingLeft={3} marginTop={2}>
                  <Typography sx={SX_SIDEBAR_TITLE}>{mainItem.name}</Typography>
                </Stack>
                {mainItem?.items?.map((item) => {
                  if (item.items) {
                    return (
                      <SubMenu
                        key={item.id}
                        rootStyles={STYLE_MENU_LINK as any}
                        label={item.name}
                        icon={<Icon name={item.icon} size="small_20" />}
                      >
                        {item?.items?.map((subItem) => (
                          <MenuItem
                            active={pathName.includes(subItem.link)}
                            key={subItem.link}
                            component={<Link to={subItem.link} />}
                            icon={
                              <Icon
                                name={subItem.icon}
                                size="small_20"
                                color="black"
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
                      active={pathName.includes(item.link)}
                      key={item.link}
                      component={
                        <Link style={STYLE_MENU_LINK} to={item.link} />
                      }
                      icon={
                        <Icon name={item.icon} size="small_20" color="black" />
                      }
                    >
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Stack>
            ))}
          </Menu>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            marginLeft={2}
          >
            <AvatarMenu title={title} srcImage={srcImage} />
            <Typography
              sx={{
                fontSize: FontSize.small_14,
                fontFamily: FontFamily.bold,
                color: Color.black,
              }}
            >
              Tùy chỉnh tài khoản
            </Typography>
          </Stack>
        </Stack>
      </RPSSidebar>
    </Stack>
  );
}
