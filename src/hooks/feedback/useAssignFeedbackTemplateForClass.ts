import feedbacksApi from '~/api/feedback';
import { useCustomMutation } from '../custom/useCustomMutation';

export const useAssignFeedbackTemplateForClass = () => {
  return useCustomMutation(
    ['assign_feedback_for_class'],
    feedbacksApi.assignTemplateForClasses
  );
};
