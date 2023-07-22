import { Box, Typography, Stack } from '@mui/material';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_LABEL } from './style';

interface RequestCourseContentProps {
  row: any;
}

export default function RequestCourseContent({
  row,
}: RequestCourseContentProps) {
  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Box mb={4}>
        <Typography sx={SX_FORM_LABEL}>Nội dung khóa học</Typography>
      </Box>
    </Stack>
  );
}
