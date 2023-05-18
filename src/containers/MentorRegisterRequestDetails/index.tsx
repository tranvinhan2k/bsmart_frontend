import { Box, Grid } from '@mui/material';
import Left from './Left/index';
import Right from './Right';
import { SX_WRAPPER, SX_CONTAINER } from './style';

export default function MentorRegisterRequestDetails() {
  const mentorRequest = {
    mail: 'nhatgv6@gmail.com',
    name: 'Lưu Quang Nhật',
    birthday: '11/11/1111',
    gender: 'Name',
    idCard: '0987654321',
    phone: '0987654321',
    introduce:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh.',
    experience:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh.',
  };

  return (
    <Box sx={SX_WRAPPER}>
      <Box sx={SX_CONTAINER}>
        <Grid
          container
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={5}
        >
          <Grid item sm={12} md={5} lg={4}>
            <Left mentorRequest={mentorRequest} />
          </Grid>
          <Grid item sm={12} md={7} lg={8}>
            <Right mentorRequest={mentorRequest} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
