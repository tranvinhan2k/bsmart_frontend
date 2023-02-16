import { Box, Typography } from '@mui/material';
import { SX } from './style';

export default function Section1AboutUs() {
  return (
    <Box sx={SX.BG}>
      <Box sx={SX.CONTAINER}>
        <Typography component="h2" sx={SX.H2}>
          Về chúng tôi
        </Typography>
      </Box>
    </Box>
  );
}
