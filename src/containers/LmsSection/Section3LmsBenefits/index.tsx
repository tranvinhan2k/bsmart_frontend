import { Box, Grid, Typography } from '@mui/material';
import { SX } from './style';
import {
  lmsTeacherBenefits,
  lmsStudentBenefits,
} from '~/constants/mockData/lmsBenefits';

export default function Section3LmsBenefits() {
  return (
    <>
      <Typography component="h3" sx={SX.H3}>
        LỢI ÍCH HỌC TẬP TRÊN NỀN TẢNG LMS
      </Typography>
      <Typography component="h4" sx={SX.H4}>
        Đối với học viên
      </Typography>
      <Grid container spacing={2}>
        {lmsStudentBenefits.map((benefit) => (
          <Grid item xs={12} md={6} key={benefit.id}>
            <Box sx={SX.BOX}>
              <Typography component="h3" sx={SX.H3_BENEFIT}>
                {benefit.title}
              </Typography>
              <Box component="img" sx={SX.IMG} alt="img" src={benefit.img} />
              <Typography component="p" sx={SX.P_BENEFIT}>
                {benefit.desc}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Typography component="h4" sx={SX.H4} mt={4}>
        Đối với giảng viên
      </Typography>
      <Grid container spacing={2}>
        {lmsTeacherBenefits.map((benefit) => (
          <Grid item xs={12} md={6} key={benefit.id}>
            <Box sx={SX.BOX}>
              <Typography component="h3" sx={SX.H3_BENEFIT}>
                {benefit.title}
              </Typography>
              <Box component="img" sx={SX.IMG} alt="img" src={benefit.img} />
              <Typography component="p" sx={SX.P_BENEFIT}>
                {benefit.desc}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
