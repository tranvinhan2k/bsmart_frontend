import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Color } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import Icon, { IconName } from '~/components/atoms/Icon';
import {
  MentorNavigationActionData,
  mockMentorLatestActivities,
} from '~/constants';
import { formateISODateStringToDisplayDate } from '~/utils/date';
import { formatMoney } from '~/utils/money';
import { image } from '~/constants/image';
import { ProfileImgType } from '~/constants/profile';
import { ROLE_LABELS } from '~/constants/role';
import { RoleKeys } from '~/models/variables';
import { selectProfile } from '~/redux/user/selector';
import toast from '~/utils/toast';
import RecentActivityList from '~/containers/MemberDetailsProfile/RecentActivityList';
import DialogUpdateAvatar from '~/components/molecules/Dialog/DialogEditAvatar';
import {
  SX_WRAPPER,
  SX_BOX_ITEM_AVATAR,
  SX_ACCOUNT_AVATAR,
  SX_ACCOUNT_NAME,
  SX_ACCOUNT_ROLE,
  SX_DISPLAY_FIELD_TEXT,
} from './style';

export default function MentorDetailSection() {
  const profile = useSelector(selectProfile);

  const mentorDetails = {
    imageLink:
      profile?.userImages?.find((img) => img?.type === ProfileImgType.AVATAR)
        ?.url || image.noAvatar,
    name: profile?.fullName,
    role: ROLE_LABELS[profile?.roles?.[0]?.code as RoleKeys],
    socials: [
      {
        image: 'facebook',
        link: profile?.facebookLink || null,
      },
      {
        image: 'twitter',
        link: profile?.twitterLink || null,
      },
      {
        image: 'instagram',
        link: profile?.instagramLink || null,
      },
    ],
    gender: profile?.gender || null,
    dateOfBirth: profile?.birthday,
    address: profile?.address || 'Chưa có thông tin',
    mail: profile?.email,
    phone: profile?.phone || 'Chưa có thông tin',
    walletMoney: profile?.wallet?.balance || 0,
  };

  const [openDialogUpdateAvatar, setOpenDialogUpdateAvatar] =
    useState<boolean>(false);
  const handleOpenDialogUpdateAvatar = () => setOpenDialogUpdateAvatar(true);
  const handleCloseDialogUpdateAvatar = () => setOpenDialogUpdateAvatar(false);

  const displayFields = [
    {
      image: 'mail',
      text: mentorDetails.mail,
    },
    {
      image: 'cake',
      text: formateISODateStringToDisplayDate(mentorDetails.dateOfBirth),
    },
    {
      image: 'phone',
      text: mentorDetails.phone,
    },
    {
      image: 'location',
      text: mentorDetails.address,
    },
  ];
  const activities = mockMentorLatestActivities;

  const navigate = useNavigate();
  function handleNavigateLink(link: string) {
    navigate(link);
  }

  const handleOpenSocialLink = (link: string | null) => {
    if (link) {
      window.open(link, '_blank');
    } else {
      toast.notifyErrorToast('Không thể mở trang này.');
    }
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
              {displayFields.map((item) => (
                <Stack
                  key={item.text}
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
                  <Typography sx={SX_DISPLAY_FIELD_TEXT}>
                    {item.text}
                  </Typography>
                </Stack>
              ))}
              <Stack my={2}>
                <Typography sx={SX_DISPLAY_FIELD_TEXT}>
                  Số dư hiện tại:{' '}
                  <span style={{ color: Color.orange }}>
                    ${formatMoney(mentorDetails.walletMoney)}
                  </span>
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={1}
              mt={1}
              sx={{ width: '100%' }}
            >
              {MentorNavigationActionData.map((item) => (
                <Button
                  key={item.link}
                  onClick={() => handleNavigateLink(item.link)}
                  customVariant="normal"
                >
                  {item.name}
                </Button>
              ))}
            </Stack>
          </Stack>
        </Box>
        <RecentActivityList />
      </Stack>
      <DialogUpdateAvatar
        open={openDialogUpdateAvatar}
        handleOnClose={handleCloseDialogUpdateAvatar}
        profile={profile}
      />
    </>
  );
}
