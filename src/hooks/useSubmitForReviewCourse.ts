import { useCustomMutation } from './custom/useCustomMutation';
import coursesApi from '~/api/courses';
import { useTryCatch } from './useTryCatch';

export const useSubmitForReviewCourse = () => {
  const { handleTryCatch } = useTryCatch('gửi yêu cầu phê duyệt');

  const { mutateAsync: handleSubmitForReview } = useCustomMutation(
    ['submit_for_review'],
    coursesApi.putRequestApproval
  );

  return {
    handleTryCatch,
    handleSubmitForReview,
  };
};
