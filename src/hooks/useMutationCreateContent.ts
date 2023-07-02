import { useMutation, useQueryClient } from '@tanstack/react-query';
import coursesApi from '~/api/courses';

export const useMutationCreateContent = () => {
  const key = 'create_content';
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: coursesApi.createCourseContent,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
  return mutationResult;
};
