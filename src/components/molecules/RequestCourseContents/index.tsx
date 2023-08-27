import { Stack, Typography } from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '~/components/atoms/Accordion';
import SubActivityCourseDetails from '../SubActivityCourseDetails';
import { ActivityOfCourseCreateRequestDetails } from '~/models/courses';

interface Props {
  items: ActivityOfCourseCreateRequestDetails[];
}

export default function RequestCourseContents({ items }: Props) {
  return (
    <Stack>
      {items.map((item, index) => (
        <Accordion key={item.id} defaultExpanded={index === 0}>
          <AccordionSummary>
            <Typography>
              <b>Học phần {index + 1}</b>: {item.name}
            </Typography>
          </AccordionSummary>
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
    </Stack>
  );
}
