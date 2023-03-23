import { useMutation, useQueryClient } from '@tanstack/react-query';
import cartApi from '~/api/cart';

export const useMutationAddCourseToCart = () => {
  const key = 'add_course_to_cart';
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: cartApi.addCourseToCart,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
  return mutationResult;
};
