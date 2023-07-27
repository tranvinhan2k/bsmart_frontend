import activityApi from '~/api/activity';
import { useCustomQuery } from '../custom/useCustomQuery';

export const useGetQuizResult = (id: number) => {
  return useCustomQuery(['do_quiz'], () => activityApi.getResultQuiz(id));
};
