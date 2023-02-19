import { Box, Button, Grid, Typography } from '@mui/material';
import img_banner_sub_typing_1 from '~/assets/images/IndexSection/img_banner_sub_typing_1.jpg';

import {
  ANNOTATION_H3,
  ANNOTATION_BOX,
  ANNOTATION_BUTTON,
  ANNOTATION_CONTENT,
  ANNOTATION_CONTENT_IMG,
  ANNOTATION_CONTENT_TITLE,
  ANNOTATION_CONTENT_CONTENT,
  ANNOTATION_CONTENT_DATE,
} from './style';

export default function index() {
  return (
    <Grid container my={2}>
      <Grid item xs={1} md={3}>
        <Box />
      </Grid>
      <Grid item xs={10} md={6}>
        <Box sx={ANNOTATION_BOX}>
          <Typography component="h3" sx={ANNOTATION_H3}>
            Thông báo
          </Typography>
          <Button sx={ANNOTATION_BUTTON}>Tất cả</Button>
          <Button sx={ANNOTATION_BUTTON}>Chưa đọc</Button>
          <Box sx={ANNOTATION_CONTENT}>
            <Grid container my={2} p={2}>
              <Grid item xs={2}>
                <Box
                  component="img"
                  sx={ANNOTATION_CONTENT_IMG}
                  alt="img"
                  src={img_banner_sub_typing_1}
                />
              </Grid>
              <Grid item xs={10}>
                <Typography component="p" sx={ANNOTATION_CONTENT_TITLE}>
                  ĐĂNG KÝ MÔN HỌC
                </Typography>
                <Typography component="p" sx={ANNOTATION_CONTENT_CONTENT}>
                  Chúc mừng bạn đã đăng ký môn học thành công
                </Typography>
                <Typography component="p" sx={ANNOTATION_CONTENT_DATE}>
                  Ngày 01/01/2023
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box textAlign="center" mt={2}>
          <Button sx={ANNOTATION_BUTTON}>Tải thêm</Button>
        </Box>
      </Grid>
      <Grid item xs={1} md={3}>
        <Box />
      </Grid>
    </Grid>
  );
}
