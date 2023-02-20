import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import img_banner_sub_typing_2 from '~/assets/images/HomePageSection/img_banner_sub_typing_2.jpg';
import { SX_BUTTON_PRIMARY } from '~/containers/HomePageSection/style';
import { SX } from './style';

export default function Section9ContactUs() {
  return (
    <Box sx={SX.BOX}>
      <Box sx={SX.CONTAINER} px={16}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={SX.BOX_IMG}
              alt="img"
              src={img_banner_sub_typing_2}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={SX.FORM}>
              <Typography component="h2" sx={SX.FORM_TITLE}>
                Liên hệ tư vấn
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    required
                    placeholder="Họ và tên"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    required
                    placeholder="Email liên hệ"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    required
                    placeholder="Điện thoại liên hệ"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={4}
                    required
                    placeholder="Bạn cần tư vấn thêm về chương trình, vui lòng để lại tin nhắn tại đây"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button component="a" sx={SX_BUTTON_PRIMARY}>
                    Đăng kí tư vấn
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
