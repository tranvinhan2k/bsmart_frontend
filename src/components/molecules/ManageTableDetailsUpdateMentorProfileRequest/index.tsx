import { Box, Grid, Stack, Typography } from '@mui/material';
import RequestBasicInfo from './RequestBasicInfo';
import RequestCI from './RequestCI';
import RequestDate from './RequestDate';
import RequestMentorDegree from './RequestMentorDegree';
import RequestMentorInfo from './RequestMentorInfo';
import RequestUpdateMentorDetailsProcess from './RequestUpdateMentorDetailsProcess';
import { SX_BOX_STICKY, SX_REQUEST_TITLE } from './style';

interface ManageTableDetailsUpdateMentorProfileRequestProps {
  row: any;
  onClose: () => void;
  refetchSearch: () => void;
  refetchGetNoOfRequest: () => void;
}

export default function ManageTableDetailsUpdateMentorProfileRequest({
  row,
  onClose,
  refetchSearch,
  refetchGetNoOfRequest,
}: ManageTableDetailsUpdateMentorProfileRequestProps) {
  return (
    <>
      <Box mx={2}>
        <Typography sx={SX_REQUEST_TITLE}>
          Chi tiết yêu cầu bổ sung hồ sơ giảng viên giáo viên
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
            <RequestUpdateMentorDetailsProcess
              row={row}
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
