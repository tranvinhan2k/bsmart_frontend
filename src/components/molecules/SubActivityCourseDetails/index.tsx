import { Link, Stack } from '@mui/material';
import { useState } from 'react';
import { SubActivityOfCourseCreateRequestDetails } from '~/models/courses';
import { SubActivityType, SubActivityTypeLabel } from '~/constants/activity';
import CustomDialog from '~/components/atoms/CustomDialog';
import SubActivityContent from './SubActivityContent';
import SubActivityHeader from './SubActivityHeader';

interface SubActivityCourseDetailsProps {
  subActivity: SubActivityOfCourseCreateRequestDetails;
}

export default function SubActivityCourseDetails({
  subActivity,
}: SubActivityCourseDetailsProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleTriggerDialog = () => setOpen(!open);

  let renderTitle: string;
  switch (subActivity.type) {
    case SubActivityType.LESSON:
      renderTitle = SubActivityTypeLabel.LESSON;
      break;
    case SubActivityType.ASSIGNMENT:
      renderTitle = SubActivityTypeLabel.ASSIGNMENT;
      break;
    case SubActivityType.QUIZ:
      renderTitle = SubActivityTypeLabel.QUIZ;
      break;
    case SubActivityType.RESOURCE:
      renderTitle = SubActivityTypeLabel.RESOURCE;
      break;
    default:
      renderTitle = '';
      break;
  }

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1}
      my={3}
    >
      <SubActivityHeader type={subActivity.type} />
      <Link href="#lesson" underline="hover" onClick={handleTriggerDialog}>
        {subActivity.name}
      </Link>
      <CustomDialog
        title={renderTitle}
        onClose={handleTriggerDialog}
        open={open}
      >
        <SubActivityContent id={subActivity.id} />
      </CustomDialog>
    </Stack>
  );
}
