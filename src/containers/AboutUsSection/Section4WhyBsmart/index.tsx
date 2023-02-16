import { Box, Typography, Grid } from '@mui/material';
import { SX_WHY_BSMART } from './style';
import { reasons } from '~/constants/mockData/reasons';

export default function Section4WhyBsmart() {
  return (
    <Box sx={SX_WHY_BSMART.BOX}>
      <Box sx={{ position: 'relative', textAlign: 'center' }}>
        <Typography component="h4" sx={SX_WHY_BSMART.H4}>
          CHÚNG TÔI LÀ AI?
        </Typography>
        <Typography component="h2" sx={SX_WHY_BSMART.H2}>
          Vì sao bạn nên chọn BSmart
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {reasons.map((reason) => (
          <Grid item xs={12} md={4} key={reason.id}>
            <Box sx={SX_WHY_BSMART.SINGLE_BOX}>
              <Typography component="h3" sx={SX_WHY_BSMART.SINGLE_BOX_H3}>
                {reason.title}
              </Typography>
              <Typography component="p" sx={SX_WHY_BSMART.SINGLE_BOX_P}>
                {reason.desc}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
