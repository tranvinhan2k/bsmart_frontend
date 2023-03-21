import { Stack, Typography, Box } from '@mui/material';
import { useEffect } from 'react';
import { FontFamily, FontSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import CourseItem from '~/components/molecules/CourseItem';
import { MentorCourses } from '~/constants';
import { scrollToTop } from '~/utils/common';

export default function MentorCourseListPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Stack>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Typography
          sx={{ fontSize: FontSize.medium_28, fontFamily: FontFamily.bold }}
        >
          Khoá học đã tạo
        </Typography>
        <Box>
          <Button customVariant="normal">Tạo khóa học</Button>
        </Box>
      </Stack>
      <Stack flexDirection="row" justifyContent="space-between">
        {MentorCourses &&
          MentorCourses.map((item) => (
            <CourseItem onClick={() => {}} item={item} key={item.id} />
          ))}
      </Stack>
    </Stack>
  );
}
