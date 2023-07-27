import feedbacksApi from '~/api/feedback';
import { useCustomQuery } from '../custom/useCustomQuery';

export const useQueryMentorFeedback = (id: number) => {
  return useCustomQuery(['mentor_feedbacks'], () =>
    feedbacksApi.getMentorFeedback(id)
  );
};
