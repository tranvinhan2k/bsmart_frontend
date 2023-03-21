import { Box, Typography } from '@mui/material';
import { SX_TITLE } from './style';

export default function CourseSuggestList() {
  return (
    <Box mt={5}>
      <Typography component="h2" sx={SX_TITLE}>
        Gợi ý khoá học
      </Typography>
    </Box>
  );
}
