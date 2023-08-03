import { Box, Grid, Stack, Typography } from '@mui/material';
import RequestCourseClassList from './RequestCourseClassList';
import RequestCourseContent from './RequestCourseContent';
import RequestCourseDate from './RequestCourseDate';
import RequestCourseDetails from './RequestCourseDetails';
import RequestCourseMentorInfo from './RequestCourseMentorInfo';
import RequestCourseProcess from './RequestCourseProcess';
import { SX_BOX_STICKY, SX_REQUEST_TITLE } from './style';

interface ManageTableDetailsCourseProps {
  row: any;
  onClose: () => void;
  refetchSearch: () => void;
  refetchGetNoOfRequest: () => void;
}

export default function ManageTableDetailsCourse({
  row,
  onClose,
  refetchSearch,
  refetchGetNoOfRequest,
}: ManageTableDetailsCourseProps) {
  return (
    <>
      <Box mx={2}>
        <Typography sx={SX_REQUEST_TITLE}>Chi tiết khóa học</Typography>
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
            <RequestCourseDetails idCourse={row.id} />
            <RequestCourseContent idCourse={row.id} />
            <RequestCourseClassList idCourse={row.id} />
            <RequestCourseMentorInfo idCourse={row.id} />
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
            <RequestCourseDate idCourse={row.id} />
            {/* <RequestCourseProcess
              idCourse={row.id}
              onClose={onClose}
              refetchSearch={refetchSearch}
              refetchGetNoOfRequest={refetchGetNoOfRequest}
            /> */}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
