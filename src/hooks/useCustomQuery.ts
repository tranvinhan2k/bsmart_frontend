import { QueryFunction, useQuery } from '@tanstack/react-query';

export const useCustomQuery = (
  key: string[] | undefined,
  callback: QueryFunction<any, any> | undefined
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
