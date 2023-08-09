import { Box, Grid, Stack, Typography } from '@mui/material';
import RequestBasicInfo from './RequestBasicInfo';
import RequestDate from './RequestDate';
import RequestUpdateMentorDegree from './RequestUpdateMentorDegree';
import RequestUpdateMentorDetailsProcess from './RequestUpdateMentorDetailsProcess';
import RequestUpdateMentorSkill from './RequestUpdateMentorSkill';
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
  const enum Text {
    mainTitle = 'Chi tiết yêu cầu bổ sung hồ sơ giáo viên',
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
        <Grid item sm={12} md={7} lg={8}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <RequestBasicInfo row={row} />
            <RequestUpdateMentorDegree row={row} />
            <RequestUpdateMentorSkill row={row} />
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
