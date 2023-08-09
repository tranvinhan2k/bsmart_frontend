import { Box, Grid, Stack, Typography } from '@mui/material';
import RequestBasicInfo from './RequestBasicInfo';
import RequestCI from './RequestCI';
import RequestDate from './RequestDate';
import RequestMentorDegree from './RequestMentorDegree';
import RequestMentorInfo from './RequestMentorInfo';
import RequestRegisterProcess from './RequestRegisterProcess';
import { SX_BOX_STICKY, SX_REQUEST_TITLE } from './style';

interface ManageTableDetailsRegisterRequestProps {
  row: any;
  onClose: () => void;
  refetchSearch: () => void;
  refetchGetNoOfRequest: () => void;
}

export default function ManageTableDetailsRegisterRequest({
  row,
  onClose,
  refetchSearch,
  refetchGetNoOfRequest,
}: ManageTableDetailsRegisterRequestProps) {
  return (
    <>
      <Box mx={2}>
        <Typography sx={SX_REQUEST_TITLE}>
          Chi tiết yêu cầu phê duyệt hồ sơ giáo viên
        </Typography>
      </Box>
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
            <RequestBasicInfo row={row} />
            <RequestCI row={row} />
            <RequestMentorDegree row={row} />
            <RequestMentorInfo row={row} />
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
            <RequestDate row={row} />
            <RequestRegisterProcess
              idMentorProfile={row.mentorProfile.id}
              onClose={onClose}
              refetchSearch={refetchSearch}
              refetchGetNoOfRequest={refetchGetNoOfRequest}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
