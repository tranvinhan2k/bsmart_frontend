import { Box, Typography, Grid } from '@mui/material';
import React from 'react';
import { SX } from './style';
import { advantagesOfLms } from '~/constants/mockData/advantages';

export default function Section2LmsFeatures() {
  return (
    <Box sx={SX.BOX}>
      <Typography component="h2" sx={SX.H2}>
        Các tính năng của LMS
      </Typography>
      <Grid container spacing={2}>
        {advantagesOfLms.map((advantage) => (
          <React.Fragment key={advantage.title}>
            <Grid item xs={12} md={3}>
              <Typography component="h4" sx={SX.H4}>
                {advantage.title}
              </Typography>
              <Box sx={SX.QUOTE_CONTENT}>{advantage.content}</Box>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
}
