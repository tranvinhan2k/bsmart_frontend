import activityApi from '~/api/activity';
import { useCustomMutation } from '../custom/useCustomMutation';
import { CourseStatusKeys } from '~/models/variables';
import { isAllowUpdateActivity } from '~/assets/variables';

export const useMutationUpdateContent = (status: CourseStatusKeys) => {
  const isAllow = isAllowUpdateActivity(status);

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
  const { mutateAsync: handleMutationSubmitForReviewQuiz } = useCustomMutation(
    ['submit_quiz'],
    activityApi.submitForReviewQuiz
  );
  const { mutateAsync: handleMutationSubmitForReviewSection } =
    useCustomMutation(['submit_section'], activityApi.submitForReviewSection);
  const { mutateAsync: handleMutationSubmitForReviewLesson } =
    useCustomMutation(['submit_lesson'], activityApi.submitForReviewLesson);
  const { mutateAsync: handleMutationSubmitForReviewResource } =
    useCustomMutation(['submit_section'], activityApi.submitForReviewResource);
  const { mutateAsync: handleMutationSubmitForReviewAssignment } =
    useCustomMutation(
      ['submit_section'],
      activityApi.submitForReviewAssignment
    );

  return {
    handleMutationUpdateSection: isAllow
      ? handleMutationUpdateSection
      : handleMutationSubmitForReviewSection,
    handleMutationUpdateLesson: isAllow
      ? handleMutationUpdateLesson
      : handleMutationSubmitForReviewLesson,
    handleMutationUpdateAssignment: isAllow
      ? handleMutationUpdateAssignment
      : handleMutationSubmitForReviewAssignment,
    handleMutationUpdateResource: isAllow
      ? handleMutationUpdateResource
      : handleMutationSubmitForReviewResource,
    handleMutationUpdateQuiz: isAllow
      ? handleMutationUpdateQuiz
      : handleMutationSubmitForReviewQuiz,
  };
};
