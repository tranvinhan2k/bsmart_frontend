import activityApi from '~/api/activity';
import { useCustomQuery } from '../custom/useCustomQuery';

export const useMentorListQuiz = (id: number, classId: number) => {
  return useCustomQuery(['mentor_quizz'], () =>
    activityApi.getMentorListQuiz({
      id,
      params: {
        page: 0,
        classId,
      },
    })
  );
};
