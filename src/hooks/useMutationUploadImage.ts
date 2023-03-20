import { useMutation, useQueryClient } from '@tanstack/react-query';
import imageApi from '~/api/image';

export const useMutationUploadImage = () => {
  const key = 'upload_image';
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: imageApi.uploadImage,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
  return mutationResult;
};
