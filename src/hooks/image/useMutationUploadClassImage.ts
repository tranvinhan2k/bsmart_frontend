import { useMutation, useQueryClient } from '@tanstack/react-query';
import imageApi from '~/api/image';

export const useMutationUploadClassImage = () => {
  const key = 'upload_class_image';
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: imageApi.uploadClassImage,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
  return mutationResult;
};
