import { useEffect } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { scrollToTop } from '~/utils/common';
import MainProfile from '~/containers/MemberDetailsProfile/MainProfile';
import RecentActivityList from '~/containers/MemberDetailsProfile/RecentActivityList';
import AttendingCourseList from '~/containers/MemberDetailsProfile/AttendingCourseList';
import CourseSuggestList from '~/containers/MemberDetailsProfile/CourseSuggestList';
import { SX_WRAPPER, SX_CONTAINER } from './style';

export default function MemberDetailsPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const SPACING_2 = 2;

  return (
    <Box sx={SX_WRAPPER}>
      <Box sx={SX_CONTAINER}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          rowSpacing={{ xs: SPACING_2, md: 0 }}
          columnSpacing={{ xs: 0, md: 5 }}
        >
          <Grid item xs={12} sm={4} md={5} lg={4}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={SPACING_2}
            >
              <MainProfile />
              <RecentActivityList />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={8} md={7} lg={8}>
            <AttendingCourseList />
          </Grid>
        </Grid>
        <CourseSuggestList />
      </Box>
    </Box>
  );
}
