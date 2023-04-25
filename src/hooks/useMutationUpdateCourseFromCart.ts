import { useMutation, useQueryClient } from '@tanstack/react-query';
import cartApi from '~/api/cart';

export const useMutationUpdateCourseFromCart = () => {
  const key = 'update_course_to_cart';
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: cartApi.updateCourse,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
  return mutationResult;
};
