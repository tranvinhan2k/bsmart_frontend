import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Collapse,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Color } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import Icon, { IconName } from '~/components/atoms/Icon';
import {
  MentorNavigationActionData,
  mockMentorLatestActivities,
} from '~/constants';
import { formatISODateStringToDisplayDate } from '~/utils/date';
import { formatMoney } from '~/utils/money';
import { image } from '~/constants/image';
import { ProfileImgType } from '~/constants/profile';
import { ROLE_LABELS } from '~/constants/role';
import { RoleKeys } from '~/models/variables';
import { RootState } from '~/redux/store';
import accountApi from '~/api/users';
import toast from '~/utils/toast';
import ActivityHistoryTopFive from '~/containers/AnnotationSection/ActivityHistoryTopFive';
import DialogUpdateAvatar from '~/components/molecules/Dialog/DialogEditAvatar';

import {
  SX_WRAPPER,
  SX_BOX_ITEM_AVATAR,
  SX_ACCOUNT_AVATAR,
  SX_ACCOUNT_NAME,
  SX_ACCOUNT_ROLE,
  SX_DISPLAY_FIELD_TEXT,
} from './style';
import SidebarNavigationButton from '~/components/molecules/SidebarNavigationButton';

export default function MentorDetailSection() {
  // const profile = useSelector(selectProfile);
  const [checked, setChecked] = useState<boolean>(false);
  const token =
    useSelector((state: RootState) => state.user.token) ||
    localStorage.getItem('token');
  const queryKey = ['/loginUser'];
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { data: dataGetProfile } = useQuery(
    queryKey,
    () => accountApi.getProfile(config),
    {
      enabled: Boolean(token),
    }
  );

  const mentorDetails = {
    imageLink:
      dataGetProfile?.userImages?.find(
        (img: any) => img?.type === ProfileImgType.AVATAR
      )?.url || image.noAvatar,
    name: dataGetProfile?.fullName,
    role: ROLE_LABELS[dataGetProfile?.roles?.[0]?.code as RoleKeys],
    socials: [
      {
        image: 'facebook',
        link: dataGetProfile?.facebookLink || null,
      },
      {
        image: 'twitter',
        link: dataGetProfile?.twitterLink || null,
      },
      {
        image: 'instagram',
        link: dataGetProfile?.instagramLink || null,
      },
    ],
    gender: dataGetProfile?.gender || null,
    dateOfBirth: dataGetProfile?.birthday,
    address: dataGetProfile?.address || 'Chưa có thông tin',
    mail: dataGetProfile?.email,
    phone: dataGetProfile?.phone || 'Chưa có thông tin',
    walletMoney: dataGetProfile?.wallet?.balance || 0,
  };

  const [openDialogUpdateAvatar, setOpenDialogUpdateAvatar] =
    useState<boolean>(false);
  const handleOpenDialogUpdateAvatar = () => setOpenDialogUpdateAvatar(true);
  const handleCloseDialogUpdateAvatar = () => setOpenDialogUpdateAvatar(false);

  const displayFields = [
    {
      id: 0,
      image: 'mail',
      text: mentorDetails.mail,
    },
    {
      id: 1,
      image: 'cake',
      text: formatISODateStringToDisplayDate(mentorDetails.dateOfBirth),
    },
    {
      id: 2,
      image: 'phone',
      text: mentorDetails.phone,
    },
  ];
  const navigate = useNavigate();
  const handleNavigateLink = (link: string) => {
    navigate(`/mentor-profile/${link}`);
  };

  const handleOpenSocialLink = (link: string | null) => {
    if (link) {
      window.open(link, '_blank');
    } else {
      toast.notifyErrorToast('Không thể mở trang này.');
    }
  };

  const handleCollapse = () => {
    setChecked(!checked);
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
                <IconButton onClick={handleOpenDialogUpdateAvatar}>
                  <Tooltip title="Cập nhật" arrow placement="top">
                    <Stack
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={2}
                    >
                      <Avatar
                        alt="Avatar"
                        src={mentorDetails.imageLink}
                        sx={SX_ACCOUNT_AVATAR}
                      />
                    </Stack>
                  </Tooltip>
                </IconButton>
              </Box>
            </Stack>

            <Stack alignItems="center" mt={3}>
              <Typography component="h4" sx={SX_ACCOUNT_NAME}>
                {mentorDetails.name}
              </Typography>
              <Typography component="p" sx={SX_ACCOUNT_ROLE}>
                {mentorDetails.role}
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                {mentorDetails.socials.map((item) => (
                  <Stack m={1} key={item.image}>
                    <Tooltip title={item.link || 'Chưa có địa chỉ mạng xã hội'}>
                      <span>
                        <Button
                          onClick={() => handleOpenSocialLink(item.link)}
                          customVariant="normal"
                        >
                          <Icon name={item.image as IconName} size="small" />
                        </Button>
                      </span>
                    </Tooltip>
                  </Stack>
                ))}
              </Stack>
              {mentorDetails.gender && (
                <Icon
                  color="orange"
                  name={mentorDetails.gender as IconName}
                  size="ex_large"
                />
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
              {dataGetProfile &&
                dataGetProfile.isVerified &&
                MentorNavigationActionData.map((item) => (
                  <SidebarNavigationButton
                    key={item.id}
                    item={item}
                    onNavigateLink={handleNavigateLink}
                  />
                ))}
            </Stack>
          </Stack>
        </Box>
        <ActivityHistoryTopFive />
      </Stack>
      <DialogUpdateAvatar
        open={openDialogUpdateAvatar}
        handleOnClose={handleCloseDialogUpdateAvatar}
      />
    </>
  );
}
