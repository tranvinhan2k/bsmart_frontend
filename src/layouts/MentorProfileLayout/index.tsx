import { Box, Grid, Stack } from '@mui/material';
import { ReactElement } from 'react';
import MentorDetailSection from '~/containers/MentorProfileLayoutSection/MentorDetailSection';
import { SX_WRAPPER, SX_CONTAINER } from './style';

interface MentorProfileLayoutProps {
  children: ReactElement;
}

export default function MentorProfileLayout({
  children,
}: MentorProfileLayoutProps) {
  return (
    <Box sx={SX_WRAPPER}>
      <Box sx={SX_CONTAINER}>
        <Grid
          container
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={{ xs: 0, md: 5 }}
        >
          <Grid
            sx={{
              display: { xs: 'none', md: 'block' },
            }}
            item
            sm={12}
            md={5}
            lg={4}
          >
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={2}
            >
              <MentorDetailSection />
            </Stack>
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
