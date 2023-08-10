import { CircularProgress, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { SubActivityOfCourseCreateRequestDetails } from '~/models/courses';
import { useGetDetailActivity } from '~/hooks';
import SubActivityContentAssignment from './SubActivityContentAssignment';
import SubActivityContentLesson from './SubActivityContentLesson';
import SubActivityContentQuiz from './SubActivityContentQuiz';
import SubActivityContentResource from './SubActivityContentResource';

interface SubActivityCourseDetailsProps {
  subActivity: SubActivityOfCourseCreateRequestDetails;
}

export default function SubActivityCourseDetails({
  subActivity,
}: SubActivityCourseDetailsProps) {
  const { activity, isLoading } = useGetDetailActivity(subActivity.id);

  let renderItem: ReactNode;
  if (activity?.type) {
    switch (activity.type) {
      case 'LESSON': {
        const detail = activity?.detail;
        renderItem = (
          <SubActivityContentLesson name={activity.name} item={detail} />
        );
        break;
      }
      case 'ASSIGNMENT': {
        const detail = activity?.detail;
        renderItem = (
          <SubActivityContentAssignment name={activity.name} item={detail} />
        );
        break;
      }
      case 'QUIZ': {
        const detail = activity?.detail;
        renderItem = (
          <SubActivityContentQuiz name={activity.name} item={detail} />
        );
        break;
      }
      case 'RESOURCE': {
        const detail = activity?.detail;
        renderItem = (
          <SubActivityContentResource name={activity.name} item={detail} />
        );
        break;
      }
      default:
        renderItem = null;
    }
  }

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1}
      my={3}
    >
      {isLoading ? <CircularProgress size="1rem" /> : renderItem}
    </Stack>
  );
}
