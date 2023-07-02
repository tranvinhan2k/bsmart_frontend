import {
  Stack,
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Typography,
} from '@mui/material';
import {
  SX_WRAPPER,
  SX_BOX_ITEM_AVATAR,
  SX_ACCOUNT_AVATAR,
  SX_ACCOUNT_NAME,
  SX_ACCOUNT_ROLE,
  SX_DISPLAY_FIELD_TEXT,
} from './style';
import Icon, { IconName } from '~/components/atoms/Icon';
import ActivityHistoryTopFive from '~/containers/AnnotationSection/ActivityHistoryTopFive';
import DialogUpdateAvatar from '../Dialog/DialogEditAvatar';
import SidebarNavigationButton from '../SidebarNavigationButton';
import { GenderKeys, RoleKeys } from '~/models/variables';
import { ROLE_LABELS } from '~/constants/role';
import { ActionPayload, SocialPayload } from '~/models';
import Button from '~/components/atoms/Button';
import { formatISODateStringToDisplayDate } from '~/utils/date';
import { Color, MetricSize } from '~/assets/variables';
import { useNavigate } from 'react-router-dom';
import { NavigationActionData } from '~/constants';

export interface ProfileSideBarProps {
  name: string;
  role: RoleKeys;
  avatarUrl: string;
  gender: GenderKeys;
  mail: string;
  birth: string;
  phone: string;
  isVerified: boolean;
  openAvatar: boolean;
  socials: SocialPayload[];
  navigationData: ActionPayload[];
  onOpenUpdateAvatar: () => void;
  onOpenLink: (link: string) => void;
  onNavigateLink: (link: string) => void;
}

export default function ProfileSideBar({
  name,
  role,
  avatarUrl,
  gender,
  birth,
  mail,
  phone,
  openAvatar,
  isVerified,
  socials,
  navigationData,
  onOpenUpdateAvatar,
  onOpenLink,
  onNavigateLink,
}: ProfileSideBarProps) {
  const navigate = useNavigate();
  const displayFields = [
    {
      id: 0,
      image: 'mail',
      text: mail,
    },
    {
      id: 1,
      image: 'cake',
      text: formatISODateStringToDisplayDate(birth),
    },
    {
      id: 2,
      image: 'phone',
      text: phone,
    },
  ];

  const handleNavigateDashboard = () => {
    navigate(`/${NavigationActionData[20].link}`);
  };

  return (
    <>
      <Stack>
        <Box sx={SX_WRAPPER}>
          <Stack sx={SX_BOX_ITEM_AVATAR}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Box pt={{ xs: 10, sm: 30, md: 14 }}>
                <IconButton onClick={onOpenUpdateAvatar}>
                  <Tooltip title="Cập nhật" arrow placement="top">
                    <Stack
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={2}
                    >
                      <Avatar
                        alt="Avatar"
                        src={avatarUrl}
                        sx={SX_ACCOUNT_AVATAR}
                      />
                    </Stack>
                  </Tooltip>
                </IconButton>
              </Box>
            </Stack>

            <Stack alignItems="center" mt={3}>
              <Typography component="h4" sx={SX_ACCOUNT_NAME}>
                {name}
              </Typography>
              <Typography component="p" sx={SX_ACCOUNT_ROLE}>
                {ROLE_LABELS[role]}
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                {socials.map((item) => (
                  <Stack m={1} key={item.image}>
                    <Tooltip title={item.link || 'Chưa có địa chỉ mạng xã hội'}>
                      <span>
                        <Button
                          onClick={() => onOpenLink(item.link)}
                          customVariant="normal"
                        >
                          <Icon name={item.image as IconName} size="small" />
                        </Button>
                      </span>
                    </Tooltip>
                  </Stack>
                ))}
              </Stack>
              {gender && (
                <Stack padding={2}>
                  <Icon
                    color="orange"
                    name={gender.toLowerCase() as IconName}
                    size="large"
                  />
                </Stack>
              )}
              {displayFields.map((item) => {
                return (
                  <Stack
                    key={item.id}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                    mt={2}
                  >
                    <Icon
                      name={item.image as IconName}
                      size="small"
                      color="orange"
                    />
                    <Typography textAlign="center" sx={SX_DISPLAY_FIELD_TEXT}>
                      {item.text}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={1}
              mt={1}
              sx={{ width: '100%' }}
            >
              {isVerified &&
                navigationData.map((item) => (
                  <SidebarNavigationButton
                    key={item.id}
                    item={item}
                    onNavigateLink={onNavigateLink}
                  />
                ))}
            </Stack>
            <Stack
              marginTop={1}
              sx={{
                width: '100%',
              }}
            >
              <Button onClick={handleNavigateDashboard} customVariant="linear">
                <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Stack
                    sx={{ position: 'absolute', left: MetricSize.medium_15 }}
                  >
                    <Icon name="book" size="medium" color="white" />
                  </Stack>
                  Quản lí học tập
                </Stack>
              </Button>
            </Stack>
          </Stack>
        </Box>
        <ActivityHistoryTopFive />
      </Stack>
      <DialogUpdateAvatar
        open={openAvatar}
        handleOnClose={onOpenUpdateAvatar}
      />
    </>
  );
}
