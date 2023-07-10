import { QueryFunction, useQuery } from '@tanstack/react-query';

export const useCustomQuery = <T>(
  key: string[] | undefined,
  callback: QueryFunction<T, any> | undefined
) => {
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: key,
    queryFn: callback,
  });
  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
