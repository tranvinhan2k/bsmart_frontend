import { useMutation, useQueryClient } from '@tanstack/react-query';
import coursesApi from '~/api/courses';

export const useMutationCreateCourse = () => {
  const key = 'create_course';
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: coursesApi.createCourse,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
  // const mutationPublicResult = useMutation({
  //   mutationKey: [key],
  //   mutationFn: coursesApi.createPublicCourse,
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: [key] });
  //   },
  // });
  return {
    mutationResult,
    // mutationPublicResult,
  };
};
