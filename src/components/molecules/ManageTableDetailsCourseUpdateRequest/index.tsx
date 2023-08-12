import { Box, Grid, Stack, Typography } from '@mui/material';
import { SX_BOX_STICKY, SX_REQUEST_TITLE } from './style';

interface ManageTableDetailsCourseUpdateRequestProps {
  onClose: () => void;
  refetchSearch: () => void;
  refetchGetNoOfRequest: () => void;
}

export default function ManageTableDetailsCourseUpdateRequest({
  onClose,
  refetchSearch,
  refetchGetNoOfRequest,
}: ManageTableDetailsCourseUpdateRequestProps) {
  return (
    <>
      <Box mx={2}>
        <Typography sx={SX_REQUEST_TITLE}>
          Chi tiết yêu cầu phê duyệt khóa học
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
            <h1>Nội dung</h1>
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
            <h1>Nội dung</h1>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
