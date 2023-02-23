import { Box, Typography, Grid } from '@mui/material';
import { reasonWhyBsmartList } from '~/constants/dataMocked';
import { SX_WHY_BSMART } from './style';

export default function Section4WhyBsmart() {
  return (
    <Box sx={SX_WHY_BSMART.WRAPPER}>
      <Box sx={SX_WHY_BSMART.CONTAINER}>
        <Typography component="h4" sx={SX_WHY_BSMART.H4}>
          CHÚNG TÔI LÀ AI?
        </Typography>
        <Typography component="h2" sx={SX_WHY_BSMART.H2}>
          Vì sao bạn nên chọn BSmart
        </Typography>
        {/* <Grid container spacing={7}> */}
        <Grid
          container
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="flex-start"
          alignItems="flex-start"
          rowSpacing={{ xs: 3, md: 0 }}
          columnSpacing={{ xs: 0, md: 3 }}
        >
          {reasonWhyBsmartList.map((reason) => (
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
    </Box>
  );
}
