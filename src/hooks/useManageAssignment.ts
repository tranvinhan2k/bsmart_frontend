import { useMutation } from '@tanstack/react-query';
import assignmentApi from '~/api/assignments';

export const useMutationCreateAssignment = () => {
  const key = 'create_assignment';

  const mutationResult = useMutation({
    mutationKey: [key],
    mutationFn: assignmentApi.createAssignment,
  });
  return mutationResult;
};
