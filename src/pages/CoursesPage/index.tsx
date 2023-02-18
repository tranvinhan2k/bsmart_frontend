import { Grid } from '@mui/material';
import { MetricSize } from '~/assets/variables';
import CourseFilterSection from '~/containers/CoursesSection/CourseFilterSection';
import CourseMenuSection from '~/containers/CoursesSection/CourseMenuSection';

export default function CoursesPage() {
  return (
    <Grid container sx={{ flexDirection: 'row', paddingTop: MetricSize.large }}>
      <Grid item xs={12} md={3}>
        <CourseFilterSection />
      </Grid>
      <Grid item xs={12} md={9}>
        <CourseMenuSection />
      </Grid>
    </Grid>
  );
}
