import { Stack, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { FontFamily, FontSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import MemberCourseItem from '~/components/molecules/MemberCourseItem';
import MentorCourseItem from '~/components/molecules/MentorCourseItem';
import { useQueryGetAllMentorCourses } from '~/hooks';
import { scrollToTop } from '~/utils/common';

export default function MentorCourseListPage() {
  const { courses } = useQueryGetAllMentorCourses({
    page: 0,
    size: 1000,
    sort: undefined,
  });

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
      <Grid
        container
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {courses &&
          courses?.map((item) => (
            <Grid
              item
              xs={12}
              md={6}
              key={item.id}
              sx={{ alignItems: 'stretch' }}
            >
              <MentorCourseItem onClick={() => {}} item={item} key={item.id} />
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
}
