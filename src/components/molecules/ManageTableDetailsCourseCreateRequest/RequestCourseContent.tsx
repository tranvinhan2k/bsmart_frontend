import { Box, Skeleton, Stack, Typography } from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '~/components/atoms/Accordion';
import SubActivityCourseDetails from '~/components/molecules/SubActivityCourseDetails';
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
          {courseCreateRequestDetails?.activities.map((item, index) => (
            <Accordion key={item.id} defaultExpanded={index === 0}>
              <AccordionSummary>
                <Typography>
                  <b>Học phần {index + 1}</b>: {item.name}
                </Typography>
              </AccordionSummary>
              {/*  */}
              <AccordionDetails>
                {item.subActivities.map((subActivity) => (
                  <SubActivityCourseDetails
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
