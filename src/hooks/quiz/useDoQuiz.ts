import activityApi from '~/api/activity';
import { useCustomQuery } from '../custom/useCustomQuery';

export const useDoQuiz = ({
  id,
  password,
}: {
  id: number;
  password: string;
}) => {
  return useCustomQuery(['do_quiz'], () =>
    activityApi.postDoQuiz({ id, password })
  );
};
