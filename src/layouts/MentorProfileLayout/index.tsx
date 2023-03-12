import { Grid, Stack } from '@mui/material';
import MentorDetailSection from '~/containers/MentorProfileLayoutSection/MentorDetailSection';

interface MentorProfileLayoutProps {
  children: any;
}

export default function MentorProfileLayout({
  children,
}: MentorProfileLayoutProps) {
  return (
    <Grid container sx={{ paddingX: { xs: 0, md: '95px' } }}>
      <Grid item xs={12} md={4}>
        <Stack marginX={1} marginY={2}>
          <MentorDetailSection />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack marginX={1} marginY={2}>
          {children}
        </Stack>
      </Grid>
    </Grid>
  );
}
