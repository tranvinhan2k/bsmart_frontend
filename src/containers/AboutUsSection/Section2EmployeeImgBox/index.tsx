import { Box, Grid } from '@mui/material';
import { SX } from './style';
import img_bg_2_employee from '~/assets/images/AboutUsSection/img_bg_2_employee.jpg';

export default function Section2EmployeeImgBox() {
  return (
    <Grid container sx={SX.WRAPPER}>
      <Grid item xs={12}>
        <Box component="img" alt="img" sx={SX.IMG} src={img_bg_2_employee} />
      </Grid>
    </Grid>
  );
}
