import { useQuery } from '@tanstack/react-query';
import { User } from '~/models/user';
import accountApi from '~/api/users';
import { Key } from './key';

export interface UseSearchManagedUserPayload {
  q?: string;
  role?: string | null;
  isVerified?: boolean | null;
  page?: number;
  size?: number | null;
  sort?: string[];
}

export const useSearchManagedUser = ({
  q,
  role,
  isVerified,
  page,
  size,
  sort,
}: UseSearchManagedUserPayload) => {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: [Key.UseSearchManagedUser, q, role, isVerified, page, size, sort],
    queryFn: () =>
      accountApi.searchManagedUser({ q, role, isVerified, page, size, sort }),
    keepPreviousData: true,
  });

  return {
    managedUserList: data,
    error,
    isError,
    isLoading,
    refetch,
  };
};
