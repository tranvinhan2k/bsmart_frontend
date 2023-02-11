import { Box, Grid, Typography } from '@mui/material';
import {
  SX_IMG_LEFT,
  SX_IMG_RIGHT,
  SX_TEXT_BEFORE_IMG_H2,
  SX_TEXT_BEFORE_IMG_P,
} from './style';

export default function Section4EntryLevel() {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Box sx={SX_IMG_LEFT}>
          <Box sx={{ position: 'relative', textAlign: 'center' }}>
            <Typography component="h2" sx={SX_TEXT_BEFORE_IMG_H2}>
              Về chúng tôi
            </Typography>
            <Typography component="p" sx={SX_TEXT_BEFORE_IMG_P}>
              From Zero to Hero
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={SX_IMG_RIGHT}>
          <Box sx={{ position: 'relative', textAlign: 'center' }}>
            <Typography component="h2" sx={SX_TEXT_BEFORE_IMG_H2}>
              Đã biết lập trình
            </Typography>
            <Typography component="p" sx={SX_TEXT_BEFORE_IMG_P}>
              Đã có kiến thưc tư duy lập trình và OOp
            </Typography>
          </Box>
        </Box>
      </Grid>
      {/* <Grid item xs={6}>
        <Box
          component="img"
          sx={SX_IMG_RIGHT}
          alt="img"
          src={img_banner_sub_typing_1}
        />
      </Grid> */}
    </Grid>
  );
}
