import {
  MutationFunction,
  MutationKey,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const useCustomMutation = (
  key: MutationKey,
  callback: MutationFunction<any, any> | undefined
) => {
  const queryClient = useQueryClient();

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: callback,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
  return mutationResult;
};
