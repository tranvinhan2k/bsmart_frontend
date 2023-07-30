import { useMutation } from '@tanstack/react-query';
import accountApi from '~/api/users';
import { Key } from './key';

export const useMutationUpdateDegreeRequest = () => {
  const mutationResult = useMutation({
    mutationKey: [Key.UseMutationProcessRegisterRequest],
    mutationFn: accountApi.updateDegreeRequest,
  });
  return mutationResult;
};
