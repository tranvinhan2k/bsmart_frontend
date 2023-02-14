import { Grid, Typography } from '@mui/material';
import { SX } from './style';
import { counters } from './mockData';

export default function Section4Counter() {
  return (
    <Grid container sx={SX.CONTAINER}>
      {counters.map((counter) => (
        <Grid item xs={12} md={4} key={counter.id}>
          <Typography component="h2" sx={SX.H2}>
            {counter.title}
          </Typography>
          <Typography component="p" sx={SX.P}>
            {counter.desc}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}
