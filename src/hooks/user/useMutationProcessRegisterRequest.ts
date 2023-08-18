import { useMutation } from '@tanstack/react-query';
import { Key } from './key';
import registerRequestsApi from '~/api/registerRequest';

export interface UseMutationProcessRegisterRequestPayload {
  id: number;
  status: string;
  message: string;
}

export const useMutationProcessRegisterRequest = () => {
  const processCourseCreateRequestMutation = useMutation({
    mutationKey: [Key.UseMutationProcessRegisterRequest],
    mutationFn: registerRequestsApi.processRegisterRequest,
  });

  return { processCourseCreateRequestMutation };
};
