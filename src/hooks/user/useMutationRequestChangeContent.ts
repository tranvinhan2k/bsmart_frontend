import { useMutation } from '@tanstack/react-query';
import registerRequestsApi from '~/api/registerRequest';

export interface UseMutationRequestChangeContentPayload {
  id: number;
  status: string;
  message: string;
}

export const useMutationRequestChangeContent = () => {
  const changeContentRequestMutation = useMutation({
    mutationKey: ['change_content_request'],
    mutationFn: registerRequestsApi.processChangeContentRequest,
  });

  return { changeContentRequestMutation };
};
