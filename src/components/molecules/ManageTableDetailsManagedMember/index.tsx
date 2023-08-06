import { Box, Grid, Stack, Typography } from '@mui/material';
import RequestBasicInfo from './RequestBasicInfo';
import RequestDate from './RequestDate';
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
              <RequestBasicInfo idMentor={rowId} />
              <RequestStudyingInfo idMentor={rowId} />
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
            </Stack>
          </Grid>
        </Grid>
      )}
    </>
  );
}
