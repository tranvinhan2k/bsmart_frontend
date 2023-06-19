import { Box, Grid, Stack } from '@mui/material';
import { ReactElement } from 'react';
import { ResponseProfilePayload } from '~/api/users';
import IntroduceMentorDetailSection from '~/containers/MentorProfileLayoutSection/IntroduceMentorDetailSection';
import MentorDetailSection from '~/containers/MentorProfileLayoutSection/MentorDetailSection';
import { SX_WRAPPER, SX_CONTAINER } from './style';

interface MentorProfileLayoutProps {
  children: ReactElement;
  isIntroduce?: boolean;
  mentor?: ResponseProfilePayload;
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
              {isIntroduce ? (
                <IntroduceMentorDetailSection mentor={mentor} />
              ) : (
                <MentorDetailSection />
              )}
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

// {
//   /* <Grid
//           container
//           direction="row"
//           justifyContent="flex-start"
//           alignItems="flex-start"
//           spacing={5}
//         >
//           <Grid item sm={12} md={5} lg={4}>
//             {isIntroduce ? (
//               <IntroduceMentorDetailSection mentor={mentor} />
//             ) : (
//               <MentorDetailSection />
//             )}
//           </Grid>
//           <Grid item sm={12} md={7} lg={8}>
//             {children}
//           </Grid>
//         </Grid> */
// }

MentorProfileLayout.defaultProps = {
  isIntroduce: false,
  mentor: {},
};
