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
  const { mutateAsync: handleMutationUpdateAssignment } = useCustomMutation(
    ['update_assignment'],
    activityApi.updateAssignment
  );
  const { mutateAsync: handleMutationUpdateResource } = useCustomMutation(
    ['update_resource'],
    activityApi.updateResource
  );
  const { mutateAsync: handleMutationUpdateQuiz } = useCustomMutation(
    ['update_quiz'],
    activityApi.updateQuiz
  );
  return {
    handleMutationUpdateSection,
    handleMutationUpdateLesson,
    handleMutationUpdateAssignment,
    handleMutationUpdateResource,
    handleMutationUpdateQuiz,
  };
};
