import { useEffect } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { scrollToTop } from '~/utils/common';
import MainProfile from '~/containers/MemberDetailsProfile/MainProfile';
import RecentActivityList from '~/containers/MemberDetailsProfile/RecentActivityList';
import WithdrawSection from '~/containers/WithdrawSection';
import { SX_WRAPPER, SX_CONTAINER } from './style';

export default function WalletManagementPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Box sx={SX_WRAPPER}>
      <Box sx={SX_CONTAINER}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={5}
        >
          <Grid item xs={12} sm={5}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={2}
            >
              <MainProfile />
              <RecentActivityList />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={7}>
            <WithdrawSection />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
