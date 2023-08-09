import activityApi from '~/api/activity';
import { useCustomMutation } from '../custom/useCustomMutation';

export const useSubmitQuiz = () => {
  return useCustomMutation(['submit_quiz'], activityApi.postSubmitQuiz);
};
