import { Box, Typography, Stack, Grid } from '@mui/material';
import React from 'react';
import { advantagesOfBsmart } from '~/constants/dataMocked';
import { SX } from './style';

export default function SectionAdvantages() {
  return (
    <Box pt={12} pb={14}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        px={16}
      >
        <Typography component="h2" sx={SX.H2}>
          Điểm ưu việt tại BSmart
        </Typography>
        <Grid container spacing={2}>
          {advantagesOfBsmart.map((advantage) => (
            <React.Fragment key={advantage.id}>
              <Grid item xs={12} md={4}>
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
