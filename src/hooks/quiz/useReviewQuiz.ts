import activityApi from '~/api/activity';
import { useCustomQuery } from '../custom/useCustomQuery';

export const useReviewQuiz = (id: number) => {
  return useCustomQuery(['review_quiz'], () => activityApi.getReviewQuiz(id));
};
