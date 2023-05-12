import { Box, Grid, Stack } from '@mui/material';
import { ResponseProfilePayload } from '~/api/users';
import { SX_WRAPPER, SX_CONTAINER } from './style';
import IntroduceAdminDetailSection from '~/containers/AdminProfileLayoutSection/IntroduceAdminDetailSection';
import AdminDetailSection from '~/containers/AdminProfileLayoutSection/AdminDetailSection';

interface AdminProfileLayoutProps {
  children: any;
  isIntroduce?: boolean;
  mentor?: ResponseProfilePayload;
}

export default function AdminProfileLayout({
  children,
  isIntroduce = false,
  mentor,
}: AdminProfileLayoutProps) {
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
          <Grid item sm={12} md={4} lg={3}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={2}
            >
              {isIntroduce ? (
                <IntroduceAdminDetailSection mentor={mentor} />
              ) : (
                <AdminDetailSection />
              )}
            </Stack>
          </Grid>
          <Grid item sm={12} md={8} lg={9}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

AdminProfileLayout.defaultProps = {
  isIntroduce: false,
  mentor: {},
};
