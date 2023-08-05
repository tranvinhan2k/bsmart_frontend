import { Box, Grid } from '@mui/material';
import WidgetTotalMentor from './Widget/WidgetTotalMentor';

export default function ManageAnalyticSection() {
  return (
    <Box p={4}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <WidgetTotalMentor />
        </Grid>
        <Grid item xs={4}>
          <WidgetTotalMentor />
        </Grid>
      </Grid>
    </Box>
  );
}
