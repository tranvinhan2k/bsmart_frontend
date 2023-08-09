import { Box, Skeleton, Stack, Typography } from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '~/components/atoms/Accordion';
import SubActivityProcessCourseCreateRequest from '~/components/molecules/SubActivity';
import { useGetCourseCreateRequestDetails } from '~/hooks/course/useGetCourseCreateRequestDetails';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_LABEL } from './style';

interface RequestCourseContentProps {
  idCourse: number;
}

export default function RequestCourseContent({
  idCourse,
}: RequestCourseContentProps) {
  const { courseCreateRequestDetails, isLoading } =
    useGetCourseCreateRequestDetails(idCourse);

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
          {courseCreateRequestDetails?.activities.map((item, i) => (
            <Accordion key={item.id}>
              <AccordionSummary>
                <Typography>
                  <b>Học phần {i + 1}</b>: {item.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {item.subActivities.map((subActivity) => (
                  <SubActivityProcessCourseCreateRequest
                    key={subActivity.id}
                    subActivity={subActivity}
                  />
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}
    </Stack>
  );
}
