import { Box, Grid, Stack, Typography } from '@mui/material';
import RequestBasicInfo from './RequestBasicInfo';
import RequestCourseClassList from './RequestCourseClassList';
import RequestCourseContent from './RequestCourseContent';
import RequestCourseDetails from './RequestCourseDetails';
import RequestCourseProcess from './RequestCourseProcess';
import RequestDate from './RequestDate';
import { SX_BOX_STICKY, SX_REQUEST_TITLE } from './style';

interface CourseCreateRequestDetailsProps {
  row: any;
  onClose: () => void;
}

export default function CourseCreateRequestDetails({
  row,
  onClose,
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
            <RequestBasicInfo row={row} />
            <RequestCourseProcess idCourse={row.id} onClose={onClose} />
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
            <RequestDate row={row} />
            <RequestCourseContent idCourse={row.id} />
            <RequestCourseClassList idCourse={row.id} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
