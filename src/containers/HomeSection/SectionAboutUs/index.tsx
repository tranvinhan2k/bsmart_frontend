import { Box, Grid, Stack, Typography } from '@mui/material';
import Button from '~/components/atoms/Button';
import img_banner_sub_typing_1 from '~/assets/images/HomePageSection/img_banner_sub_typing_1.jpg';
import { SX } from './style';

export default function SectionAboutUs() {
  return (
    <Box sx={SX.BOX_BANNER}>
      <Box sx={SX.CONTAINER} px={16}>
        <Typography component="h2" sx={SX.H2}>
          Về chúng tôi
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography component="p" sx={SX.P}>
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
              <Button customVariant="normal">Xem khoá học</Button>
              <Button customVariant="outlined">Hỗ trợ tư vấn</Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={SX.BOX_IMG}
              alt="img"
              src={img_banner_sub_typing_1}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
