import { Box, Typography, Stack, Grid } from '@mui/material';
import React from 'react';
import { advantagesOfLms } from '~/constants/dataMocked';
import { SX } from './style';

export default function Section2LmsFeatures() {
  return (
    <Box sx={SX.BOX}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        // px={16}
        px={{ sm: 0, md: 2, lg: 8, xl: 16 }}
      >
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
      </Stack>
    </Box>
  );
}
