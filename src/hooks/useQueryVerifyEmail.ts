import { useMutation, useQuery } from '@tanstack/react-query';
import authApi from '~/api/auth';

export const useQueryVerifyEmail = (code: string | undefined) => {
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['verifyEmail'],
    queryFn: () => authApi.verifyEmail(code),
    keepPreviousData: true,
  });

  const mutationReVerify = useMutation({
    mutationKey: ['reVerifyEmail'],
    mutationFn: authApi.reVerifyEmail,
  });

  return {
    data,
    reverifyMutation: mutationReVerify,
    error,
    isLoading: isLoading || mutationReVerify.isLoading,
    refetch,
  };
};
