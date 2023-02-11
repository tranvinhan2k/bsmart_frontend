import { Box, Typography, Grid } from '@mui/material';
import React from 'react';
import {
  SX_BOX,
  SX_THIRD_LAYER_TYPOGRAPHY_H2,
  SX_FOURTH_LAYER_TYPOGRAPHY_H4,
  SX_QUOTE_CONTENT,
} from './style';
import { advantages } from './mockData';

export default function Section3Advantages() {
  return (
    <Box sx={SX_BOX}>
      <Box sx={{ position: 'relative', textAlign: 'center' }} px={16}>
        <Typography component="h2" sx={SX_THIRD_LAYER_TYPOGRAPHY_H2}>
          Điểm ưu việt tại BSmart
        </Typography>
        <Grid container spacing={2}>
          {advantages.map((advantage) => (
            <React.Fragment key={advantage.title}>
              <Grid item xs={12} md={4}>
                <Typography component="h4" sx={SX_FOURTH_LAYER_TYPOGRAPHY_H4}>
                  {advantage.title}
                </Typography>
                <Box sx={SX_QUOTE_CONTENT}>{advantage.content}</Box>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
