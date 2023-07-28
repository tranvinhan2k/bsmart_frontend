import { useQuery } from '@tanstack/react-query';
import { Key } from './key';
import classApi from '~/api/class';

export interface UseSearchManagedClassPayload {
  status: string;
  q?: string | null;
  page?: number;
  size?: number | null;
  sort?: string[];
}

export const useSearchManagedClass = ({
  status,
  q,
  page,
  size,
  sort,
}: UseSearchManagedClassPayload) => {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: [Key.UseSearchManagedClass, status, q, page, size, sort],
    queryFn: () =>
      classApi.searchManagedClass({
        status,
        q,
        page,
        size,
        sort,
      }),
    keepPreviousData: true,
  });

  return {
    managedClassList: data,
    error,
    isError,
    isLoading,
    refetch,
  };
};
