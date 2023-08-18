import { Box, Skeleton, Stack, Typography } from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '~/components/atoms/Accordion';
import SubActivityCourseDetails from '~/components/molecules/SubActivityCourseDetails';
import {
  useGetCourseCreateRequestDetails,
  UseGetCourseCreateRequestDetailsPayload,
} from '~/hooks/course/useGetCourseCreateRequestDetails';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_LABEL } from './style';
import RequestCourseContents from '../RequestCourseContents';

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
