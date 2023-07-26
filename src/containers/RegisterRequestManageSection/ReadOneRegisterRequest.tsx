import { Box, Grid, Stack, Typography } from '@mui/material';
import RequestBasicInfo from './RequestBasicInfo';
import RequestCI from './RequestCI';
import RequestDate from './RequestDate';
import RequestMentorDegree from './RequestMentorDegree';
import RequestMentorInfo from './RequestMentorInfo';
import RequestRegisterProcess from './RequestRegisterProcess';
import { SX_BOX_STICKY, SX_REQUEST_TITLE } from './style';

interface ReadOneRegisterRequestProps {
  row: any;
  onClose: () => void;
  refetchSearch: () => void;
  refetchGetNoOfRequest: () => void;
}

export default function ReadOneRegisterRequest({
  row,
  onClose,
  refetchSearch,
  refetchGetNoOfRequest,
}: ReadOneRegisterRequestProps) {
  return (
    <>
      <Box mx={2}>
        <Typography sx={SX_REQUEST_TITLE}>Chi tiết giáo viên</Typography>
      </Box>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="stretch"
        columnSpacing={5}
        rowSpacing={2}
        p={2}
      >
        <Grid item sm={12} md={5} lg={4}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
            sx={SX_BOX_STICKY}
          >
            <RequestBasicInfo row={row} />
            <RequestRegisterProcess
              idMentorProfile={row.mentorProfile.id}
              onClose={onClose}
              refetchSearch={refetchSearch}
              refetchGetNoOfRequest={refetchGetNoOfRequest}
            />
          </Stack>
        </Grid>
        <Grid item sm={12} md={7} lg={8}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <RequestDate row={row} />
            <RequestCI row={row} />
            <RequestMentorDegree row={row} />
            <RequestMentorInfo row={row} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
