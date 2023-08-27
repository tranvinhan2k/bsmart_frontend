import { Box, Skeleton, Stack, Typography } from '@mui/material';
import {
  useGetCourseCreateRequestDetails,
  UseGetCourseCreateRequestDetailsPayload,
} from '~/hooks/course/useGetCourseCreateRequestDetails';
import RequestCourseContents from '../RequestCourseContents';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_LABEL } from './style';

export default function RequestCourseContent({
  idCourse,
  status,
}: UseGetCourseCreateRequestDetailsPayload) {
  const { courseCreateRequestDetails, isLoading } =
    useGetCourseCreateRequestDetails({ idCourse, status });

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
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
