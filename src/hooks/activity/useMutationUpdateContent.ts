import activityApi from '~/api/activity';
import { useCustomMutation } from '../custom/useCustomMutation';

export const useMutationUpdateContent = () => {
  const { mutateAsync: handleMutationUpdateSection } = useCustomMutation(
    ['update_section'],
    activityApi.updateSection
  );
  const { mutateAsync: handleMutationUpdateLesson } = useCustomMutation(
    ['update_lesson'],
    activityApi.updateLesson
  );
  return {
    handleMutationUpdateSection,
    handleMutationUpdateLesson,
  };
};
