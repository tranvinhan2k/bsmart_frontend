import { Box, Grid, Stack, Typography } from '@mui/material';
import RequestCourseClassList from './RequestCourseClassList';
import RequestCourseContent from './RequestCourseContent';
import RequestCourseDate from './RequestCourseDate';
import RequestCourseDetails from './RequestCourseDetails';
import RequestCourseMentorInfo from './RequestCourseMentorInfo';
import RequestCourseProcess from './RequestCourseProcess';
import { SX_BOX_STICKY, SX_REQUEST_TITLE } from './style';

interface CourseCreateRequestDetailsProps {
  row: any;
  onClose: () => void;
  refetch: () => void;
}

export default function CourseCreateRequestDetails({
  row,
  onClose,
  refetch,
}: CourseCreateRequestDetailsProps) {
  return (
    <>
      <Box mx={2}>
        <Typography sx={SX_REQUEST_TITLE}>Chi tiết khóa học</Typography>
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
            <RequestCourseMentorInfo idCourse={row.id} />
            <RequestCourseProcess
              idCourse={row.id}
              onClose={onClose}
              refetch={refetch}
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
            <RequestCourseDetails idCourse={row.id} />
            <RequestCourseDate idCourse={row.id} />
            <RequestCourseContent idCourse={row.id} />
            <RequestCourseClassList idCourse={row.id} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
