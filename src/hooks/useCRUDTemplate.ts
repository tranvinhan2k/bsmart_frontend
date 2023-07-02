import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import feedbacksApi from '~/api/feedback';

export interface RequestfeedbackQuestionPayload {
  code: string;
  name: string;
}

export const useCRUDTemplate = () => {
  const key = 'template';
  const queryClient = useQueryClient();

  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['template'],
    queryFn: () => feedbacksApi.getAllTemplate(),
  });

  const addTemplateMutation = useMutation({
    mutationKey: [key],
    mutationFn: feedbacksApi.createTemplate,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  } as any);

  const updateTemplateMutation = useMutation({
    mutationKey: [key],
    mutationFn: feedbacksApi.updateTemplate,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  } as any);
  const deleteTemplateMutation = useMutation({
    mutationKey: [key],
    mutationFn: feedbacksApi.deleteTemplate,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  } as any);

  return {
    error,
    templates: data,
    isLoading:
      isLoading ||
      addTemplateMutation.isLoading ||
      deleteTemplateMutation.isLoading ||
      updateTemplateMutation.isLoading,
    refetch,
    addTemplateMutation,
    deleteTemplateMutation,
    updateTemplateMutation,
  };
};
