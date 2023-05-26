import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import feedbacksApi from '~/api/feedback';

export interface RequestfeedbackQuestionPayload {
  code: string;
  name: string;
}

export const useCRUDFeedbackQuestion = () => {
  const key = 'feedbackQuestion';
  const queryClient = useQueryClient();

  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['feedbackQuestion'],
    queryFn: () => feedbacksApi.getAllQuestion(),
  });

  const addFeedbackQuestionMutation = useMutation({
    mutationKey: [key],
    mutationFn: feedbacksApi.createQuestion,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  } as any);

  const updateFeedbackQuestionMutation = useMutation({
    mutationKey: [key],
    mutationFn: feedbacksApi.updateQuestion,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  } as any);
  const deleteFeedbackQuestionMutation = useMutation({
    mutationKey: [key],
    mutationFn: feedbacksApi.deleteQuestion,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  } as any);

  return {
    error,
    feedbackQuestions: data,
    isLoading:
      isLoading ||
      addFeedbackQuestionMutation.isLoading ||
      deleteFeedbackQuestionMutation.isLoading ||
      updateFeedbackQuestionMutation.isLoading,
    refetch,
    addFeedbackQuestionMutation,
    deleteFeedbackQuestionMutation,
    updateFeedbackQuestionMutation,
  };
};
