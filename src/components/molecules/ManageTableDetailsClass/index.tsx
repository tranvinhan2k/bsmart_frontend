import { Box, Grid, Stack, Typography } from '@mui/material';
import ClassDetailsBasicInfo from './ClassDetailsBasicInfo';
import ClassDetailsDate from './ClassDetailsDate';
import ClassDetailsMentor from './ClassDetailsMentor';
import ClassDetailsCourse from './ClassDetailsCourse';
import ClassDetailsTimeInWeek from './ClassDetailsTimeInWeek';
import ClassDetailsStudentList from './ClassDetailsStudentList';
import { SX_BOX_STICKY, SX_REQUEST_TITLE } from './style';

interface ManageTableDetailsClassProps {
  row: any;
  onClose: () => void;
  refetchSearch: () => void;
  refetchGetNoOfRequest: () => void;
}

export default function ManageTableDetailsClass({
  row,
  onClose,
  refetchSearch,
  refetchGetNoOfRequest,
}: ManageTableDetailsClassProps) {
  return (
    <>
      <Box mx={2}>
        <Typography sx={SX_REQUEST_TITLE}>Chi tiết lớp học</Typography>
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
            <ClassDetailsBasicInfo idClass={row.id} />
            <ClassDetailsMentor idClass={row.id} />
            <ClassDetailsCourse idClass={row.id} />
            <ClassDetailsTimeInWeek idClass={row.id} />
            <ClassDetailsStudentList idClass={row.id} />
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
            <ClassDetailsDate />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
