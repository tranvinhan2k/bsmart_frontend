import { Box, Grid } from '@mui/material';
import { ReactElement } from 'react';
import MemberDetailsProfile from '~/containers/MemberDetailsProfile/StudentSidebarProfile';
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
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid
            sx={{
              display: { xs: 'none', md: 'block' },
            }}
            item
            sm={12}
            md={5}
            lg={3}
          >
            <MemberDetailsProfile />
          </Grid>
          <Grid item xs={12} md={7} lg={9}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
