import { useQuery } from '@tanstack/react-query';
import configApi from '~/api/config';
import { Key } from './key';

export const useGetConfigReferralCode = () => {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: [Key.UseGetConfigReferralCode],
    queryFn: () => configApi.getConfigReferralCode(),
  });

  return {
    configReferralCode: data,
    error,
    isError,
    isLoading,
    refetch,
  };
};
