import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { MetricSize } from '~/assets/variables';
import MentorFilterSection from '~/containers/MentorSection/MentorFilterSection';
import MentorMenuSection from '~/containers/MentorSection/MentorMenuSection';
import { useQueryGetAllMentors } from '~/hooks';
import { scrollToTop } from '~/utils/common';

export default function MentorsPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const { mentors, error, isLoading } = useQueryGetAllMentors();
  return (
    <Grid
      container
      sx={{
        flexDirection: 'row',
        paddingTop: MetricSize.large_20,
        paddingX: { xs: 0, md: '95px' },
      }}
    >
      <Grid item xs={12} md={3}>
        <MentorFilterSection />
      </Grid>
      <Grid item xs={12} md={9}>
        <MentorMenuSection error={error} data={mentors} isLoading={isLoading} />
      </Grid>
    </Grid>
  );
}
