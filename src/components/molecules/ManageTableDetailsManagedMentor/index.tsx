import { Box, Grid, Stack, Typography } from '@mui/material';
import RequestBasicInfo from './RequestBasicInfo';
import RequestCI from './RequestCI';
import RequestDate from './RequestDate';
import RequestMentorDegree from './RequestMentorDegree';
import RequestMentorInfo from './RequestMentorInfo';
import RequestRegisterProcess from './RequestRegisterProcess';
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
          <Grid item sm={12} md={7} lg={8}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={2}
            >
              <RequestBasicInfo idMentor={rowId} />
              <RequestCI idMentor={rowId} />
              <RequestMentorDegree idMentor={rowId} />
              <RequestMentorInfo idMentor={rowId} />
              <RequestTeachingInfo idMentor={rowId} />
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
              <RequestDate idMentor={rowId} />
              {/* <RequestRegisterProcess
              idMentorProfile={row.mentorProfile.id}
              onClose={onClose}
              refetchSearch={refetchSearch}
              refetchGetNoOfRequest={refetchGetNoOfRequest}
            /> */}
            </Stack>
          </Grid>
        </Grid>
      )}
    </>
  );
}
