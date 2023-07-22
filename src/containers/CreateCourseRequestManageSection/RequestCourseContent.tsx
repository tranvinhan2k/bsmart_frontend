import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useQueryGetClassesOfCourseWithCourseDetails } from '~/hooks/class/useQueryGetClassesWithCourseDetails';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_LABEL } from './style';

interface RequestCourseContentProps {
  idCourse: number;
}

export default function RequestCourseContent({
  idCourse,
}: RequestCourseContentProps) {
  const { classesOfCourseWithCourseDetails, isLoading } =
    useQueryGetClassesOfCourseWithCourseDetails(idCourse);

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      {isLoading ? (
        <>
          <Box mb={4}>
            <Typography sx={SX_FORM_LABEL}>Nội dung khóa học</Typography>
          </Box>
          <Skeleton />
        </>
      ) : (
        <>
          <Box mb={4}>
            <Typography sx={SX_FORM_LABEL}>Nội dung khóa học</Typography>
          </Box>
          {classesOfCourseWithCourseDetails?.activities.map((item) => (
            // <Accordion defaultExpanded key={item.id}>
            <Accordion key={item.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{item.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Nội dung</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}
    </Stack>
  );
}
