import { QueryFunction, useQuery } from '@tanstack/react-query';
import { BankDataPayload } from '~/models/data';

export const useCustomQuery = (
  key: string[] | undefined,
  callback: QueryFunction<BankDataPayload[], string[]> | undefined
) => {
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: key,
    queryFn: callback,
  });
  return {
    banks: data,
    error,
    isLoading,
    refetch,
  };
};
