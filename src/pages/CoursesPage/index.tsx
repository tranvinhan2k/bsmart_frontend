import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { Color, MetricSize } from '~/assets/variables';
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
        <CourseMenuSection error={error} data={courses} isLoading={isLoading} />
      </Grid>
    </Grid>
  );
}
