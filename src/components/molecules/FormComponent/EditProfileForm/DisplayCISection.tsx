import { Box, Typography, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectProfile } from '~/redux/user/selector';
import { image } from '~/constants/image';
import { SX_FORM, SX_FORM_TITLE, SX_FORM_LABEL } from './style';
import { ProfileImgType } from '~/constants/profile';

export default function DisplayCISection() {
  const profile = useSelector(selectProfile);

  const CI = [
    {
      id: 0,
      img:
        profile?.userImages?.find((img) => img?.type === ProfileImgType.FRONTCI)
          ?.url || image.noAvatar,
      text: 'Mặt trước',
    },
    {
      id: 2,
      img:
        profile?.userImages?.find((img) => img?.type === ProfileImgType.BACKCI)
          ?.url || image.noAvatar,
      text: 'Mặt sau',
    },
  ];
  return (
    <Box sx={SX_FORM}>
      <Box mb={2}>
        <Typography component="h3" sx={SX_FORM_TITLE}>
          Thông tin CMND
        </Typography>
      </Box>
      <Stack
        direction={{ lg: 'column', xl: 'row' }}
        justifyContent={{ lg: 'flex-start', xl: 'center' }}
        alignItems={{ lg: 'center', xl: 'flex-start' }}
        spacing={2}
      >
        {CI.map((item) => (
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            key={item.id}
          >
            <Box
              alt="mentor avatar"
              component="img"
              src={item.img}
              sx={{ height: 250, borderRadius: 5 }}
            />
            <Typography sx={SX_FORM_LABEL}>{item.text}</Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
