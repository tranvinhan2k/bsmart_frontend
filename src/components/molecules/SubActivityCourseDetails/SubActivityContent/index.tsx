import { CircularProgress, Stack } from '@mui/material';
import { SubActivityType } from '~/constants/activity';
import { useGetDetailActivity } from '~/hooks';
import SubActivityContentAssignment from './SubActivityContentAssignment';
import SubActivityContentLesson from './SubActivityContentLesson';
import SubActivityContentQuiz from './SubActivityContentQuiz';
import SubActivityContentResource from './SubActivityContentResource';

interface SubActivityContentProps {
  id: number;
}

export default function SubActivityContent({ id }: SubActivityContentProps) {
  const { activity } = useGetDetailActivity(id);

  let renderItem = (
    <Stack direction="column" justifyContent="flex-start" alignItems="center">
      <CircularProgress />
    </Stack>
  );

  if (activity?.type) {
    switch (activity.type) {
      case SubActivityType.LESSON: {
        const detail = activity?.detail;
        renderItem = (
          <SubActivityContentLesson name={activity.name} item={detail} />
        );
        break;
      }
      case SubActivityType.ASSIGNMENT: {
        const detail = activity?.detail;
        renderItem = (
          <SubActivityContentAssignment name={activity.name} item={detail} />
        );
        break;
      }
      case SubActivityType.QUIZ: {
        const detail = activity?.detail;
        renderItem = (
          <SubActivityContentQuiz name={activity.name} item={detail} />
        );
        break;
      }
      case SubActivityType.RESOURCE: {
        const detail = activity?.detail;
        renderItem = (
          <SubActivityContentResource name={activity.name} item={detail} />
        );
        break;
      }
      default:
        renderItem = <p>Đã xảy ra lỗi</p>;
        break;
    }
  }
  return renderItem;
}
