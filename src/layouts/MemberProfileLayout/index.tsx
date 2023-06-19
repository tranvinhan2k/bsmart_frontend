import { Box, Grid } from '@mui/material';
import { ReactElement } from 'react';
import MainProfile from '~/containers/MemberDetailsProfile/MainProfile';
import CourseSuggestList from '~/containers/MemberDetailsProfile/CourseSuggestList';
import { SX_WRAPPER, SX_CONTAINER } from './style';

interface MemberProfileLayoutProps {
  children: ReactElement;
}

export default function MemberProfileLayout({
  children,
}: MemberProfileLayoutProps) {
  return (
    <Box sx={SX_WRAPPER}>
      <Box sx={SX_CONTAINER}>
        <Grid
          container
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={5}
        >
          <Grid item xs={12} md={5} lg={4}>
            <MainProfile />
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            {children}
          </Grid>
        </Grid>
        <CourseSuggestList />
      </Box>
    </Box>
  );
}
