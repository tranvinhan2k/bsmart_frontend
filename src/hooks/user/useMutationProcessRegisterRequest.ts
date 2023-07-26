import { useMutation } from '@tanstack/react-query';
import registerRequestsApi from '~/api/registerRequest';
import { keyUseMutationProcessRegisterRequest } from './key';

export const useMutationProcessRegisterRequest = () => {
  const processCourseCreateRequestMutation = useMutation({
    mutationKey: [keyUseMutationProcessRegisterRequest],
    mutationFn: registerRequestsApi.approveRegisterRequest,
  });

  return { processCourseCreateRequestMutation };
};
