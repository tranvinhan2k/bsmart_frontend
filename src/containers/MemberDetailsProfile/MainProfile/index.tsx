import { Box, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
import { IconName } from '~/models/icon';

interface ProfileDataProps {
  id: number;
  icon: IconName;
  text: string;
}

export default function MainProfile() {
  const profileData: ProfileDataProps[] = [
    { id: 1, icon: 'person', text: '27/01/2001' },
    { id: 2, icon: 'nearMe', text: 'Tân Bình, Tp. Hồ Chí Minh' },
    { id: 3, icon: 'mail', text: 'tangbaotrann@gmail.com' },
    { id: 4, icon: 'phone', text: '0946005077' },
  ];
  const navigation = useNavigate();
  const handleNavigateEditProfilePage = () => {
    navigation('/edit-profile');
  };

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
          Adam
        </Typography>
        <Typography component="p" sx={SX_PROFILE_DETAILS}>
          Member
        </Typography>
      </>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        mt={2}
      >
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
            300,000 vnđ
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
        <Button customVariant="normal" onClick={handleNavigateEditProfilePage}>
          Chỉnh sửa thông tin
        </Button>
        <Button customVariant="normal">Quản lý ví tiền</Button>
        <Button customVariant="normal">Rút tiền</Button>
      </Stack>
    </Box>
  );
}
