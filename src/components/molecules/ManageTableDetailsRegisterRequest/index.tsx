import { Box, Grid, Stack, Typography } from '@mui/material';
import { MentorProfileStatusType } from '~/constants/profile';
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
  const enum Text {
    mainTitle = 'Chi tiết yêu cầu phê duyệt hồ sơ giáo viên',
  }

  return (
    <>
      <Box mx={2}>
        <Typography sx={SX_REQUEST_TITLE}>{Text.mainTitle}</Typography>
      </Box>
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
            <RequestBasicInfo row={row} />
            <RequestCI row={row} />
            <RequestMentorDegree row={row} />
            <RequestMentorInfo row={row} />
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
            <RequestDate row={row} />
            {row.mentorProfile.status === MentorProfileStatusType.WAITING && (
              <RequestRegisterProcess
                idMentorProfile={row.mentorProfile.id}
                onClose={onClose}
                refetchSearch={refetchSearch}
                refetchGetNoOfRequest={refetchGetNoOfRequest}
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
