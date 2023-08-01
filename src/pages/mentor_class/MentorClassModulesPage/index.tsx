import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { LoadingWrapper } from '~/HOCs';
import ReturnLink from '~/components/atoms/ReturnLink';
import { ActivityData } from '~/constants';
import { useGetDetailActivity, useGetIdFromUrl } from '~/hooks';
import globalStyles from '~/styles';
import ModuleLessonPage from './ModuleLessonPage';
import ModuleQuizPage from './ModuleQuizPage';
import ModuleResourcePage from './ModuleResourcePage';
import ModuleAssignmentPage from './ModuleAssignmentPage';

export default function MentorClassModulesPage() {
  const moduleId = useGetIdFromUrl('moduleId');
  const { activity, error, isLoading } = useGetDetailActivity(moduleId);

  const activityData = ActivityData.find(
    (item) => item.type === activity?.type
  );

  let data: ReactNode = null;

  if (activity?.type) {
    switch (activity.type) {
      case 'LESSON': {
        const detail = activity?.detail;
        data = <ModuleLessonPage name={activity.name} item={detail} />;
        break;
      }
      case 'ASSIGNMENT': {
        const detail = activity?.detail;
        data = <ModuleAssignmentPage name={activity.name} item={detail} />;
        break;
      }
      case 'QUIZ': {
        const detail = activity?.detail;
        data = <ModuleQuizPage name={activity.name} item={detail} />;
        break;
      }
      case 'RESOURCE': {
        const detail = activity?.detail;
        data = <ModuleResourcePage name={activity.name} item={detail} />;
        break;
      }
      default:
        data = null;
    }
  }

  return (
    <Stack>
      <ReturnLink />
      <LoadingWrapper error={error} isLoading={isLoading}>
        <Typography sx={globalStyles.textSmallLabel}>
          {activityData?.label}
        </Typography>
        <Stack marginTop={1} sx={globalStyles.viewRoundedWhiteBody}>
          {data}
        </Stack>
      </LoadingWrapper>
    </Stack>
  );
}
