import { Box, Grid, Stack, Typography } from '@mui/material';
import { useScrollIntoView } from '~/hooks';
import RequestBasicInfo from './RequestBasicInfo';
import RequestDate from './RequestDate';
import RequestManagedMemberScroll from './RequestManagedMemberScroll';
import RequestStudyingInfo from './RequestStudyingInfo';
import { SX_BOX_STICKY, SX_REQUEST_TITLE } from './style';

interface ManageTableDetailsManagedMemberProps {
  rowId: number | undefined;
  onClose: () => void;
  refetchSearch: () => void;
  refetchGetNoOfRequest: () => void;
}

export default function ManageTableDetailsManagedMember({
  rowId,
  onClose,
  refetchSearch,
  refetchGetNoOfRequest,
}: ManageTableDetailsManagedMemberProps) {
  const scrollRequestBasicInfo = useScrollIntoView();
  const scrollRequestStudyingInfo = useScrollIntoView();

  return (
    <>
      <Box mx={2}>
        <Typography sx={SX_REQUEST_TITLE}>Chi tiết học sinh</Typography>
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
          <Grid item sm={12} md={7} lg={8}>
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
              <RequestStudyingInfo
                idMentor={rowId}
                scrollRef={scrollRequestStudyingInfo.ref}
              />
            </Stack>
          </Grid>
          <Grid item sm={12} md={5} lg={4}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={2}
              sx={SX_BOX_STICKY}
            >
              {/* <RequestDate idMentor={rowId} /> */}
              <RequestManagedMemberScroll
                scrollRequestBasicInfo={scrollRequestBasicInfo.executeScroll}
                scrollRequestStudyingInfo={
                  scrollRequestStudyingInfo.executeScroll
                }
              />
            </Stack>
          </Grid>
        </Grid>
      )}
    </>
  );
}
