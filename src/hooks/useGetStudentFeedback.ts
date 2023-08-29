import feedbacksApi from '~/api/feedback';
import { useCustomQuery } from './custom/useCustomQuery';

export const useGetStudentFeedback = (classId: number) => {
  return useCustomQuery(['get_student_feedbacks'], () =>
    feedbacksApi.getFeedback(classId)
  );
};
