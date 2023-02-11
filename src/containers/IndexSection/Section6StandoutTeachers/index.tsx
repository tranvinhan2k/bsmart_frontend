import { Box, Typography } from '@mui/material';
import { SX_BOX, SX_FIFTH_LAYER_TYPOGRAPHY_H2 } from './style';

export default function Section6StandoutTeachers() {
  return (
    <Box sx={SX_BOX}>
      <Box sx={{ position: 'relative', textAlign: 'center' }} px={16}>
        <Typography component="h2" sx={SX_FIFTH_LAYER_TYPOGRAPHY_H2}>
          Mentor tiêu biểu
        </Typography>
      </Box>
    </Box>
  );
}
