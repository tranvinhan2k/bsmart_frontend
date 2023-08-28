import { Box, Grid, Stack, Typography } from '@mui/material';
import { useScrollIntoView } from '~/hooks';
import RequestBasicInfo from './RequestBasicInfo';
import RequestCI from './RequestCI';
import RequestManagedMentorScroll from './RequestManagedMentorScroll';
import RequestMentorDegree from './RequestMentorDegree';
import RequestMentorInfo from './RequestMentorInfo';
import RequestTeachingInfo from './RequestTeachingInfo';
import { SX_BOX_STICKY, SX_REQUEST_TITLE } from './style';

interface ManageTableDetailsManagedMentorProps {
  rowId: number | undefined;
  onClose: () => void;
  refetchSearch: () => void;
  refetchGetNoOfRequest: () => void;
}

export default function ManageTableDetailsManagedMentor({
  rowId,
  onClose,
  refetchSearch,
  refetchGetNoOfRequest,
}: ManageTableDetailsManagedMentorProps) {
  const scrollRequestBasicInfo = useScrollIntoView();
  const scrollRequestCI = useScrollIntoView();
  const scrollRequestMentorDegree = useScrollIntoView();
  const scrollRequestMentorInfo = useScrollIntoView();
  const scrollRequestTeachingInfo = useScrollIntoView();

  return (
    <>
      <Box mx={2}>
        <Typography sx={SX_REQUEST_TITLE}>Chi tiết giáo viên</Typography>
      </Box>
      {rowId && (
        <Grid
          container
          justifyContent="flex-start"
          alignItems="stretch"
          columnSpacing={2}
          rowSpacing={1}
          p={2}
        >
          <Grid item sm={12} md={8} lg={8}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={2}
            >
              <RequestBasicInfo
                idMentor={rowId}
                scrollRef={scrollRequestBasicInfo.ref}
              />
              <RequestCI idMentor={rowId} scrollRef={scrollRequestCI.ref} />
              <RequestMentorDegree
                idMentor={rowId}
                scrollRef={scrollRequestMentorDegree.ref}
              />
              <RequestMentorInfo
                idMentor={rowId}
                scrollRef={scrollRequestMentorInfo.ref}
              />
              <RequestTeachingInfo
                idMentor={rowId}
                scrollRef={scrollRequestTeachingInfo.ref}
              />
            </Stack>
          </Grid>
          <Grid item sm={12} md={4} lg={4}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={2}
              sx={SX_BOX_STICKY}
            >
              {/* <RequestDate idMentor={rowId} /> */}
              <RequestManagedMentorScroll
                scrollRequestBasicInfo={scrollRequestBasicInfo.executeScroll}
                scrollRequestCI={scrollRequestCI.executeScroll}
                scrollRequestMentorDegree={
                  scrollRequestMentorDegree.executeScroll
                }
                scrollRequestMentorInfo={scrollRequestMentorInfo.executeScroll}
                scrollRequestTeachingInfo={
                  scrollRequestTeachingInfo.executeScroll
                }
              />
            </Stack>
          </Grid>
        </Grid>
      )}
    </>
  );
}
