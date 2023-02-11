import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import img_banner_sub_typing_1 from '~/assets/images/IndexSection/img_banner_sub_typing_1.jpg';
import {
  SX_BUTTON_PRIMARY,
  SX_BUTTON_SECONDARY,
} from '~/containers/IndexSection/style';
import {
  SX_SECOND_LAYER_TYPOGRAPHY_H2,
  SX_SECOND_LAYER_TYPOGRAPHY_P,
  SX_SECOND_LAYER_BOX_IMG,
  SX_SECOND_LAYER_BOX_BANNER,
} from './style';

export default function Section2AboutUs() {
  return (
    <Box sx={SX_SECOND_LAYER_BOX_BANNER}>
      <Box sx={{ position: 'relative', textAlign: 'center' }} px={16}>
        <Typography component="h2" sx={SX_SECOND_LAYER_TYPOGRAPHY_H2}>
          Về chúng tôi
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography component="p" sx={SX_SECOND_LAYER_TYPOGRAPHY_P}>
              BSmart khai thác nhu cầu tuyển dụng lập trình, kết nối việc làm
              tới doanh nghiệp và tích hợp các dự án với công nghệ mới nhất vào
              phương pháp đào tạo tích cực cho các học viên học xong có việc làm
              ngay. Chương trình giảng dạy được biên soạn may đo dành riêng cho
              các bạn Lập trình từ trái ngành hoặc đã có kiến thức theo cường độ
              cao, luôn được tinh chỉnh và tối ưu hóa theo thời gian bởi các
              thành viên sáng lập và giảng viên dày kinh nghiệm.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="center"
              alignItems="center"
              spacing={1}
              /*  */
              mt={6}
            >
              <Button component="a" sx={SX_BUTTON_PRIMARY}>
                Xem khoá học
              </Button>
              <Button component="a" sx={SX_BUTTON_SECONDARY}>
                Hỗ trợ tư vấn
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={SX_SECOND_LAYER_BOX_IMG}
              alt="img"
              src={img_banner_sub_typing_1}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
