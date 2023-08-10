import questionApi from '~/api/question';
import { useCustomQuery } from '../custom/useCustomQuery';

export const useGetBanksQuizQuestions = () => {
  return useCustomQuery(
    ['get_all_bank_questions'],
    questionApi.getAllBanksQuizQuestionForQuizInput
  );
};
