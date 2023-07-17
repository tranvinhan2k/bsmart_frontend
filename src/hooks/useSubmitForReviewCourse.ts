import { useCustomMutation } from './custom/useCustomMutation';
import coursesApi from '~/api/courses';
import { useTryCatch } from './useTryCatch';
import { useCustomQuery } from './custom/useCustomQuery';

export const useSubmitForReviewCourse = (id: number) => {
  const { handleTryCatch } = useTryCatch('gửi yêu cầu phê duyệt');
  const { data, isLoading } = useCustomQuery(['course_percent'], () =>
    coursesApi.getCoursePercent(id)
  );

  const { mutateAsync: handleSubmitForReview } = useCustomMutation(
    ['submit_for_review'],
    coursesApi.putRequestApproval
  );

  return {
    handleTryCatch,
    isCanSubmitted: data?.allowSendingApproval,
    coursePercent: data?.percentComplete,
    isLoading,
    handleSubmitForReview,
  };
};
