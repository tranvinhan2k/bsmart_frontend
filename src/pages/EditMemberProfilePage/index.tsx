import { Box, Grid, Stack } from '@mui/material';
import { useEffect } from 'react';
import { scrollToTop } from '~/utils/common';
import CourseSuggestList from '~/containers/MemberDetailsProfile/CourseSuggestList';
import EditPersonalProfileForm from '~/components/molecules/FormComponent/EditMemberProfileForm/EditPersonalProfileForm';
import EditAccountProfileForm from '~/components/molecules/FormComponent/EditMemberProfileForm/EditAccountProfileForm';
import EditSocialProfileForm from '~/components/molecules/FormComponent/EditMemberProfileForm/EditSocialProfileForm';
import MainProfile from '~/containers/MemberDetailsProfile/MainProfile';
import RecentActivityList from '~/containers/MemberDetailsProfile/RecentActivityList';
import { SX_WRAPPER, SX_CONTAINER } from './style';

export default function EditMemberProfilePage() {
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
          <Grid item xs={12} sm={4} md={5} lg={4}>
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
          <Grid item xs={12} sm={8} md={7} lg={8}>
            <EditPersonalProfileForm />
            <EditAccountProfileForm />
            <EditSocialProfileForm />
          </Grid>
        </Grid>
        <CourseSuggestList />
      </Box>
    </Box>
  );
}
