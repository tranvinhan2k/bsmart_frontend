import { Box, Stack, Typography } from '@mui/material';
import globalStyles from '~/styles';
import sx from './style';

export default function MentorDetailsFeaturedCourseList() {
  return (
    <Box sx={sx.mainWrapper}>
      <Stack direction="column" justifyContent="flex-start" alignItems="start">
        <Typography sx={globalStyles.textSmallLabel}>
          Khóa học tiêu biểu
        </Typography>
      </Stack>
    </Box>
  );
}
