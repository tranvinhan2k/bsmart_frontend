import { Box, Grid, Typography } from '@mui/material';
import { SX } from './style';

export default function Section4EntryLevel() {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Box sx={SX.IMG_LEFT}>
          <Box sx={SX.CONTAINER}>
            <Typography component="h2" sx={SX.TEXT_BEFORE_IMG_H2}>
              Về chúng tôi
            </Typography>
            <Typography component="p" sx={SX.TEXT_BEFORE_IMG_P}>
              From Zero to Hero
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={SX.IMG_RIGHT}>
          <Box sx={SX.CONTAINER}>
            <Typography component="h2" sx={SX.TEXT_BEFORE_IMG_H2}>
              Đã biết lập trình
            </Typography>
            <Typography component="p" sx={SX.TEXT_BEFORE_IMG_P}>
              Đã có kiến thức tư duy lập trình và OOp
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
