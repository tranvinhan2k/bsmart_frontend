import { useQuery } from '@tanstack/react-query';
import feedbacksApi from '~/api/feedback';

export const useQueryGetAllQuestion = () => {
  const { error, data, isLoading } = useQuery({
    queryKey: ['questions'],
    queryFn: () => feedbacksApi.getOptionQuestion(),
  });
  return {
    error,
    feedbackQuestion: data,
    isLoading,
  };
};
