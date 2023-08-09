import feedbacksApi from '~/api/feedback';
import { useCustomMutation } from '../custom/useCustomMutation';

export const useMutationSendFeedback = () => {
  return useCustomMutation(['send_feedback'], feedbacksApi.sendFeedback);
};
