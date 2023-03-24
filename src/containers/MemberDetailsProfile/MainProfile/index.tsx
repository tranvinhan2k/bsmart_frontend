import { Box, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  SX_WRAPPER,
  SX_CONTAINER,
  SX_PROFILE_IMG,
  SX_PROFILE_NAME,
  SX_PROFILE_DETAILS,
  SX_PROFILE_DETAILS_HIGHLIGHTED,
} from './style';
import avatar_member from '~/assets/images/MemberDetailSection/avatar_member.jpg';
import Icon from '~/components/atoms/Icon';
import Button from '~/components/atoms/Button';
import { MemberNavigationActionData } from '~/constants';
import { formatDate } from '~/utils/date';
import { IconName } from '~/models/icon';
import { selectProfile } from '~/redux/user/selector';
import { formatMoney } from '~/utils/money';

interface ProfileDataProps {
  id: number;
  icon: IconName;
  text: string;
}

export default function MainProfile() {
  const profile = useSelector(selectProfile);

  const navigate = useNavigate();
  const memberDetails = {
    imageLink: profile?.userImages?.[0]?.url,
    name: profile?.fullName,
    role: profile?.roles?.[0]?.code,
    socials: [
      {
        image: 'facebook',
        link: profile?.facebookLink,
      },
      {
        image: 'twitter',
        link: profile?.twitterLink,
      },
      {
        image: 'instagram',
        link: profile?.instagramLink,
      },
    ],
    gender: 'male',
    dateOfBirth: profile?.birthday,
    address: profile?.address,
    mail: profile?.email,
    phone: profile?.phone,
    walletMoney: profile?.wallet?.balance,
  };
  const profileData: ProfileDataProps[] = [
    {
      id: 1,
      icon: 'person',
      text: memberDetails.dateOfBirth || 'Chưa có thông tin',
    },
    {
      id: 2,
      icon: 'nearMe',
      text: memberDetails.address || 'Chưa có thông tin',
    },
    { id: 3, icon: 'mail', text: memberDetails.mail || 'Chưa có thông tin' },
    { id: 4, icon: 'phone', text: memberDetails.phone || 'Chưa có thông tin' },
  ];
  function handleNavigateLink(link: string) {
    navigate(link);
  }

  return (
    <Box sx={SX_WRAPPER}>
      <Box sx={SX_CONTAINER}>
        <Box
          component="img"
          alt="img_avatar_member"
          sx={SX_PROFILE_IMG}
          src={avatar_member}
        />
      </Box>
      <>
        <Typography component="h4" sx={SX_PROFILE_NAME}>
          {memberDetails.name || 'Tên học sinh'}
        </Typography>
        <Typography component="p" sx={SX_PROFILE_DETAILS}>
          {memberDetails.role || 'Role'}
        </Typography>
      </>
      <Stack direction="row" justifyContent="center" alignItems="center">
        {memberDetails.socials.map((item) => (
          <Stack margin={1} key={item.link}>
            <Button customVariant="normal">
              <Icon name={item.image as IconName} size="small" />
            </Button>
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
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        mt={2}
      >
        {/* <Typography component="p" sx={SX_PROFILE_DETAILS}>
          {formatDate(memberDetails.dateOfBirth)}
        </Typography> */}
        {profileData.map((item) => (
          <Stack
            direction={{ md: 'column', lg: 'row' }}
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            key={item.id}
          >
            <Icon color="orange" name={item.icon} size="small" />
            <Typography component="p" sx={SX_PROFILE_DETAILS}>
              {item.text}
            </Typography>
          </Stack>
        ))}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          mt={2}
        >
          <Typography component="p" sx={SX_PROFILE_DETAILS}>
            Số dư hiện tại:
          </Typography>
          <Typography sx={SX_PROFILE_DETAILS_HIGHLIGHTED}>
            {formatMoney(memberDetails.walletMoney)}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={2}
        mt={2}
      >
        {MemberNavigationActionData.map((item) => (
          <Button
            customVariant="normal"
            key={item.name}
            onClick={() => handleNavigateLink(item.link)}
          >
            {item.name}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
