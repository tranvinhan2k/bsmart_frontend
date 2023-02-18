import { Box, Typography } from '@mui/material';
import { SX } from './style';

export default function Section6StandoutTeachers() {
  return (
    <Box sx={SX.BOX}>
      <Box sx={SX.CONTAINER} px={16}>
        <Typography component="h2" sx={SX.H2}>
          Mentor tiêu biểu
        </Typography>
      </Box>
    </Box>
  );
}
