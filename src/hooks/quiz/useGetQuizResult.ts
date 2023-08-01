import activityApi from '~/api/activity';
import { useCustomQuery } from '../custom/useCustomQuery';

export const useGetQuizResult = (id: number) => {
  return useCustomQuery(['get_result_quiz'], () =>
    activityApi.getResultQuiz(id)
  );
};
