import { useMutation } from '@tanstack/react-query';
import { Key } from './key';
import registerRequestsApi from '~/api/registerRequest';

// export interface UseMutationProcessManagerRequestEditMentorPayload {
//   id: number;
// }

export const useMutationProcessManagerRequestEditMentor = () => {
  const processManagerRequestEditMentor = useMutation({
    mutationKey: [Key.useMutationProcessManagerRequestEditMentor],
    mutationFn: registerRequestsApi.processManagerRequestEditMentor,
  });

  return { processManagerRequestEditMentor };
};
