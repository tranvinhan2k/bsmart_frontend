import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Color } from '~/assets/variables';
import { formatISODateStringToDisplayDate } from '~/utils/date';
import { formatMoney } from '~/utils/money';
import { image } from '~/constants/image';
import { MemberNavigationActionData } from '~/constants';
import { ProfileImgType } from '~/constants/profile';
import { ROLE_LABELS } from '~/constants/role';
import { RoleKeys } from '~/models/variables';
import { selectProfile } from '~/redux/user/selector';
import Button from '~/components/atoms/Button';
import DialogUpdateAvatar from '~/components/molecules/Dialog/DialogEditAvatar';
import Icon, { IconName } from '~/components/atoms/Icon';
import RecentActivityList from '~/containers/MemberDetailsProfile/RecentActivityList';
import toast from '~/utils/toast';
import {
  SX_WRAPPER,
  SX_BOX_ITEM_AVATAR,
  SX_ACCOUNT_AVATAR,
  SX_ACCOUNT_NAME,
  SX_ACCOUNT_ROLE,
  SX_DISPLAY_FIELD_TEXT,
} from './style';

export default function MainProfile() {
  const profile = useSelector(selectProfile);

  const navigate = useNavigate();
  const memberDetails = {
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
      id: 0,
      image: 'mail',
      text: memberDetails.mail,
    },
    {
      id: 1,
      image: 'cake',
      text: formatISODateStringToDisplayDate(memberDetails.dateOfBirth),
    },
    {
      id: 2,
      image: 'phone',
      text: memberDetails.phone,
    },
  ];

  function handleNavigateLink(link: string) {
    navigate(link);
  }

  function handleOpenSocialLink(link: string | null) {
    if (link) {
      window.open(link, '_blank');
    } else {
      toast.notifyErrorToast('Không thể mở trang này.');
    }
  }

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
                        src={memberDetails.imageLink}
                        sx={SX_ACCOUNT_AVATAR}
                      />
                    </Stack>
                  </Tooltip>
                </IconButton>
              </Box>
            </Stack>

            <Stack alignItems="center" mt={3}>
              <Typography component="h4" sx={SX_ACCOUNT_NAME}>
                {memberDetails.name}
              </Typography>
              <Typography component="p" sx={SX_ACCOUNT_ROLE}>
                {memberDetails.role}
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                {memberDetails.socials.map((item) => (
                  <Stack m={1} key={item.image}>
                    <Tooltip title={item.link || 'Chưa có địa chỉ mạng xã hội'}>
                      <Button
                        onClick={() => handleOpenSocialLink(item.link)}
                        customVariant="normal"
                      >
                        <Icon name={item.image as IconName} size="small" />
                      </Button>
                    </Tooltip>
                  </Stack>
                ))}
              </Stack>
              {memberDetails.gender && (
                <Icon
                  color="orange"
                  name={memberDetails.gender as IconName}
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
                    {formatMoney(memberDetails.walletMoney)}
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
              {profile.isVerified &&
                MemberNavigationActionData.map((item) => (
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
      />
    </>
  );
}
