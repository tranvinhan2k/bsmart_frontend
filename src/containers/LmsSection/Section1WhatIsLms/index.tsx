import { Box, Grid, Typography } from '@mui/material';
import { SX } from './style';
import img_bg_2_employee from '~/assets/images/AboutUsSection/img_bg_2_employee.jpg';

export default function Section1WhatIsLms() {
  return (
    <>
      <Typography component="h3" sx={SX.H3}>
        LMS là gì?
      </Typography>
      <Grid container sx={SX.WRAPPER}>
        <Grid item xs={12}>
          <Box component="img" alt="img" sx={SX.IMG} src={img_bg_2_employee} />
        </Grid>
      </Grid>
      <Typography component="p" sx={SX.P}>
        Hệ thống LMS (Learning Management System) là hệ thống quản lý học tập
        trực tuyến, phân phối, cung cấp toàn bộ các tài liệu, khóa học và video
        có liên quan đến chương trình đào tạo. Hệ thống được thiết kế giúp người
        quản lý dễ dàng tiếp cận và làm việc. Ngoài cung cấp nội dung, LMS cũng
        có thể xử lý những việc như đăng ký các khóa học, quản trị khoá học và
        phân tích các kỹ năng.
      </Typography>
    </>
  );
}
