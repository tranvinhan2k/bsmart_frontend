import { Grid, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import CourseFilterSection from '~/containers/CoursesSection/CourseFilterSection';
import CourseMenuSection from '~/containers/CoursesSection/CourseMenuSection';
import { useQueryGetAllCourse } from '~/hooks';
import { scrollToTop } from '~/utils/common';

// TODO: add filter params
export default function CoursesPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const { courses, error, isLoading } = useQueryGetAllCourse();
  return (
    <Stack>
      <Stack
        sx={{
          background: Color.white,
          paddingX: {
            xs: MetricSize.medium_15,
            md: `calc(95px + ${MetricSize.large_30})`,
          },
          paddingY: courses.totalItems > 0 ? MetricSize.small_10 : 0,
          boxShadow: 2,
          justifyContent: 'center',
          height: courses.totalItems > 0 ? '30px' : 0,
          transition: 'all 1s ease',
        }}
      >
        <Typography
          sx={{
            fontFamily: FontFamily.medium,
            fontSize: FontSize.small_18,
          }}
        >{`${1 + courses.currentPage * courses.pageSize} - ${
          courses.pageSize * (courses.currentPage + 1) >= courses.totalItems
            ? courses.totalItems
            : courses.pageSize * (courses.currentPage + 1)
        } của ${courses?.totalItems} kết quả `}</Typography>
      </Stack>

      <Grid
        container
        sx={{
          flexDirection: 'row',
          paddingTop: MetricSize.large_20,
          paddingX: { xs: 0, md: '95px' },
          backgroundColor: Color.white4,
        }}
      >
        <Grid item xs={12} md={3}>
          <CourseFilterSection />
        </Grid>
        <Grid item xs={12} md={9}>
          <CourseMenuSection
            error={error}
            data={courses}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
