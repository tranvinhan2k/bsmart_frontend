import { Box, Typography, Grid } from '@mui/material';
import React from 'react';
import { SX } from './style';
import { advantages } from '~/constants/mockData/advantages';

export default function Section3Advantages() {
  return (
    <Box sx={SX.BOX}>
      <Box sx={SX.CONTAINER} px={16}>
        <Typography component="h2" sx={SX.H2}>
          Điểm ưu việt tại BSmart
        </Typography>
        <Grid container spacing={2}>
          {advantages.map((advantage) => (
            <React.Fragment key={advantage.title}>
              <Grid item xs={12} md={4}>
                <Typography component="h4" sx={SX.H4}>
                  {advantage.title}
                </Typography>
                <Box sx={SX.QUOTE_CONTENT}>{advantage.content}</Box>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
