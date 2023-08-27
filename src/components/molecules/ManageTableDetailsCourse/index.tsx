import { Box, Grid, Stack, Typography } from '@mui/material';
import { useScrollIntoView } from '~/hooks';
import RequestCourseClassList from './RequestCourseClassList';
import RequestCourseContent from './RequestCourseContent';
import RequestCourseDate from './RequestCourseDate';
import RequestCourseDetails from './RequestCourseDetails';
import RequestCourseMentorInfo from './RequestCourseMentorInfo';
import RequestCourseScroll from './RequestCourseScroll';
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
  const scrollCourseDetails = useScrollIntoView();
  const scrollCourseContent = useScrollIntoView();
  const scrollCourseClassList = useScrollIntoView();
  const scrollCourseMentorInfo = useScrollIntoView();

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
            <RequestCourseDetails
              idCourse={row.id}
              status={row.status}
              scrollRef={scrollCourseDetails.ref}
            />
            <RequestCourseContent
              idCourse={row.id}
              status={row.status}
              scrollRef={scrollCourseContent.ref}
            />
            <RequestCourseClassList
              idCourse={row.id}
              status={row.status}
              scrollRef={scrollCourseClassList.ref}
            />
            <RequestCourseMentorInfo
              idCourse={row.id}
              status={row.status}
              scrollRef={scrollCourseMentorInfo.ref}
            />
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
            {/* <RequestCourseDate idCourse={row.id} status={row.status} /> */}
            <RequestCourseScroll
              scrollCourseDetails={scrollCourseDetails.executeScroll}
              scrollCourseContent={scrollCourseContent.executeScroll}
              scrollCourseClassList={scrollCourseClassList.executeScroll}
              scrollCourseMentorInfo={scrollCourseMentorInfo.executeScroll}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
