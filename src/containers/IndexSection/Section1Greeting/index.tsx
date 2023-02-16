import { Box, Button, Stack, Typography } from '@mui/material';
import {
  SX_BUTTON_PRIMARY,
  SX_BUTTON_SECONDARY,
} from '~/containers/IndexSection/style';
import { SX } from './style';

export default function Section1Greeting() {
  return (
    <Box sx={SX.BANNER}>
      <Box sx={SX.CONTAINER}>
        <Typography component="h4" sx={SX.H4}>
          KHỞI ĐẦU SỰ NGHIỆP CỦA BẠN
        </Typography>
        <Typography component="h2" sx={SX.H2}>
          Trở thành lập trình viên chuyên nghiệp tại BSmart
        </Typography>
        <Typography component="p" sx={SX.P}>
          Chúng tôi cung cấp các khoá học chất lượng cao để cải thiện các kỹ
          năng lập trình của bạn. Tất cả các giảng viên của chúng tôi đều có
          nhiều kinh nghiệm trong thực tế và giảng dạy.
        </Typography>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
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
            Xem khoá học
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
