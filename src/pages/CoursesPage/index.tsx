import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { MetricSize } from '~/assets/variables';
import CourseFilterSection from '~/containers/CoursesSection/CourseFilterSection';
import CourseMenuSection from '~/containers/CoursesSection/CourseMenuSection';
import { scrollToTop } from '~/utils/common';

export default function CoursesPage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <Grid container sx={{ flexDirection: 'row', paddingTop: MetricSize.large_20 }}>
      <Grid item xs={12} md={3}>
        <CourseFilterSection />
      </Grid>
      <Grid item xs={12} md={9}>
        <CourseMenuSection />
      </Grid>
    </Grid>
  );
}
