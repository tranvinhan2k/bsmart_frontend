import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import registerRequestsApi from '~/api/registerRequest';

export interface RequestCategoryPayload {
  code: string;
  name: string;
}
export interface UseManageRegisterRequestPayload {
  status?: string;
  q?: string;
  size?: number;
  sort?: string;
}

export const useManageRegisterRequest = ({
  status,
  q,
  size,
  sort,
}: UseManageRegisterRequestPayload) => {
  const key = 'register_request';
  const queryClient = useQueryClient();

  const { error, data, isLoading, refetch } = useQuery({
    queryKey: [key, status, q, size, sort],
    queryFn: () =>
      registerRequestsApi.searchRegisterRequests({ status, q, size, sort }),
    keepPreviousData: true,
  });

  const approveRegisterRequestMutation = useMutation({
    mutationKey: [key.concat('_verify')],
    mutationFn: registerRequestsApi.approveRegisterRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });

  return {
    error,
    registerRequest: data,
    isLoading,
    refetch,
    approveRegisterRequestMutation,
  };
};
