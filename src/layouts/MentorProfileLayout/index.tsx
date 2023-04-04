import { Box, Grid, Stack } from '@mui/material';
import { ResponseMentorCoursePayload } from '~/api/courses';
import { ResponseProfilePayload } from '~/api/users';
import IntroduceMentorDetailSection from '~/containers/MentorProfileLayoutSection/IntroduceMentorDetailSection';
import MentorDetailSection from '~/containers/MentorProfileLayoutSection/MentorDetailSection';
import { SX_WRAPPER, SX_CONTAINER } from './style';

interface MentorProfileLayoutProps {
  children: any;
  isIntroduce?: boolean;
  mentor: ResponseProfilePayload | undefined;
}

export default function MentorProfileLayout({
  children,
  isIntroduce = false,
  mentor,
}: MentorProfileLayoutProps) {
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
          <Grid item sm={12} md={5} lg={4}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={2}
            >
              {isIntroduce ? (
                <IntroduceMentorDetailSection mentor={mentor} />
              ) : (
                <MentorDetailSection />
              )}
            </Stack>
          </Grid>
          <Grid item sm={12} md={7} lg={8}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

MentorProfileLayout.defaultProps = {
  isIntroduce: false,
};
