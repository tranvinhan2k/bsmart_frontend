import { Box, Grid, Stack, Typography } from '@mui/material';
import { CourseStatusType } from '~/constants/course';
import RequestCourseClassList from './RequestCourseClassList';
import RequestCourseContent from './RequestCourseContent';
import RequestCourseDate from './RequestCourseDate';
import RequestCourseDetails from './RequestCourseDetails';
import RequestCourseMentorInfo from './RequestCourseMentorInfo';
import RequestCourseProcess from './RequestCourseProcess';
import { SX_BOX_STICKY, SX_REQUEST_TITLE } from './style';

interface CourseCreateRequestDetailsProps {
  row: any;
  fixedStatus: CourseStatusType;
  onClose: () => void;
  refetchSearch: () => void;
  refetchGetNoOfRequest: () => void;
}

export default function ManageTableDetailsCourseCreateRequest({
  row,
  fixedStatus,
  onClose,
  refetchSearch,
  refetchGetNoOfRequest,
}: CourseCreateRequestDetailsProps) {
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
            <RequestCourseDetails idCourse={row.id} status={fixedStatus} />
            <RequestCourseMentorInfo idCourse={row.id} status={fixedStatus} />
            <RequestCourseContent idCourse={row.id} status={fixedStatus} />
            <RequestCourseClassList idCourse={row.id} status={fixedStatus} />
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
            <RequestCourseDate idCourse={row.id} status={fixedStatus} />
            {fixedStatus === CourseStatusType.WAITING && (
              <RequestCourseProcess
                idCourse={row.id}
                status={fixedStatus}
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
