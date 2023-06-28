import { Box, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthorizationActionData, NavigationActionData } from '~/constants';
import { RootState } from '~/redux/store';
import Button from '~/components/atoms/Button';
import img_banner_sub_typing_1 from '~/assets/images/HomePageSection/img_banner_sub_typing_1.jpg';
import { SX } from './style';

export default function SectionAboutUs() {
  const navigate = useNavigate();
  const handleViewCourse = () => navigate(`/${NavigationActionData[2].link}`);
  const handleRegister = () => navigate(AuthorizationActionData[1].link);

  const token =
    useSelector((state: RootState) => state.user.token) ||
    localStorage.getItem('token');

  return (
    <Box sx={SX.BOX_BANNER}>
      <Box sx={SX.CONTAINER} px={16}>
        <Typography component="h2" sx={SX.H2}>
          Về chúng tôi
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography component="p" sx={SX.P}>
                Bước vào thế giới của công nghệ với Trung tâm Dạy Lập Trình hàng
                đầu! Chúng tôi mang đến cho bạn khóa học lập trình chất lượng,
                với môi trường học tập đa dạng và giảng viên tận tâm.
              </Typography>
            </Box>
            <Box mt={4}>
              <Typography component="p" sx={SX.P}>
                Hãy tham gia ngay để nắm bắt kiến thức và kỹ năng cần thiết để
                trở thành một lập trình viên tài năng. Chúng tôi cam kết hỗ trợ
                bạn trên con đường phát triển nghề nghiệp và tìm kiếm cơ hội
                việc làm. Đăng ký ngay và khám phá tiềm năng lập trình của bạn
                với chúng tôi!
              </Typography>
            </Box>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="center"
              alignItems="center"
              spacing={1}
              mt={6}
            >
              <Button customVariant="normal" onClick={handleViewCourse}>
                Xem khoá học
              </Button>
              {Boolean(!token) && (
                <Button customVariant="outlined" onClick={handleRegister}>
                  Đăng ký ngay
                </Button>
              )}
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
