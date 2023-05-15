import { Box, Stack, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Color } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import Icon, { IconName } from '~/components/atoms/Icon';
import {
  MentorNavigationActionData,
  mockMentorLatestActivities,
} from '~/constants';
import { image } from '~/constants/image';
import { ROLE_LABELS } from '~/constants/role';
import { RoleKeys } from '~/models/variables';
import { selectProfile } from '~/redux/user/selector';
import { formatDate, formateISODateStringToDisplayDate } from '~/utils/date';
import { formatMoney } from '~/utils/money';
import toast from '~/utils/toast';
import RecentActivityList from '~/containers/MemberDetailsProfile/RecentActivityList';
import {
  SX_WRAPPER,
  SX_BOX_ITEM_AVATAR,
  SX_ACCOUNT_AVATAR,
  SX_ACCOUNT_NAME,
  SX_ACCOUNT_ROLE,
  SX_ACCOUNT_DOB,
  SX_DISPLAY_FIELD_TEXT,
} from './styles';

export default function MentorDetailSection() {
  const profile = useSelector(selectProfile);

  const navigate = useNavigate();
  const mentorDetails = {
    imageLink:
      profile?.userImages?.find((img) => img?.type === 'AVATAR')?.url ||
      image.noAvatar,
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
    mail: profile?.email || 'Chưa có thông tin',
    phone: profile?.phone || 'Chưa có thông tin',
    walletMoney: profile?.wallet?.balance || 0,
  };

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
    <Stack>
      <Box sx={SX_WRAPPER}>
        <Stack sx={SX_BOX_ITEM_AVATAR}>
          <Box
            alt="mentor avatar"
            component="img"
            src={mentorDetails.imageLink}
            sx={SX_ACCOUNT_AVATAR}
          />
          <Stack alignItems="center" mt={2}>
            <Typography sx={SX_ACCOUNT_NAME}>{mentorDetails.name}</Typography>
            <Typography sx={SX_ACCOUNT_ROLE}>{mentorDetails.role}</Typography>
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              {mentorDetails.socials.map((item) => (
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
            {mentorDetails.gender && (
              <Icon
                color="orange"
                name={mentorDetails.gender as IconName}
                size="ex_large"
              />
            )}
            {mentorDetails.dateOfBirth && (
              <Box mt={2}>
                <Typography sx={SX_ACCOUNT_DOB}>
                  {formatDate(mentorDetails.dateOfBirth)}
                </Typography>
              </Box>
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
                <Typography sx={SX_DISPLAY_FIELD_TEXT}>{item.text}</Typography>
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
  );
}
