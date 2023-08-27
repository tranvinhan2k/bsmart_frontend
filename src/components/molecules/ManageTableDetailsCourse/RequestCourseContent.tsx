import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { CourseStatusType } from '~/constants/course';
import { useGetCourseCreateRequestDetails } from '~/hooks/course/useGetCourseCreateRequestDetails';
import RequestCourseContents from '../RequestCourseContents';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_LABEL } from './style';

interface RequestCourseContentProps {
  idCourse: number;
  status: CourseStatusType;
  scrollRef: any;
}

export default function RequestCourseContent({
  idCourse,
  status,
  scrollRef,
}: RequestCourseContentProps) {
  const { courseCreateRequestDetails, isLoading } =
    useGetCourseCreateRequestDetails({ idCourse, status });

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER} ref={scrollRef}>
      {isLoading ? (
        <>
          <Box mb={4}>
            <Typography sx={SX_FORM_LABEL}>Nội dung</Typography>
          </Box>
          <Skeleton />
        </>
      ) : (
        <>
          <Box mb={4}>
            <Typography sx={SX_FORM_LABEL}>Nội dung</Typography>
          </Box>
          <RequestCourseContents
            items={courseCreateRequestDetails?.activities || []}
          />
        </>
      )}
    </Stack>
  );
}
