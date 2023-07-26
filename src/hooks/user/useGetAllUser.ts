import { useQuery } from '@tanstack/react-query';
import { User } from '~/models/user';
import { PagingFilterPayload } from '~/models';
import accountApi from '~/api/users';

export interface RequestCategoryPayload {
  code: string;
  name: string;
}
export interface UseGetAllUserPayload {
  q?: string;
  role?: string;
  isVerified?: boolean | '';
  page?: number;
  size?: number;
  sort?: string[];
}

export const useGetAllUser = ({
  q,
  role,
  isVerified,
  page,
  size,
  sort,
}: UseGetAllUserPayload) => {
  const key = 'get_all_user';

  const { error, data, isLoading, refetch } = useQuery({
    queryKey: [key, q, role, isVerified, page, size, sort],
    queryFn: () =>
      accountApi.getAllUser({ q, role, isVerified, page, size, sort }),
    keepPreviousData: true,
  });

  const userList: PagingFilterPayload<User> = {
    items: data?.items || [],
    currentPage: data?.currentPage || 0,
    pageSize: data?.pageSize || 0,
    totalItems: data?.totalItems || 0,
    first: data?.first || false,
    last: data?.last || false,
    pageItemSize: data?.pageItemSize || 0,
    totalPages: data?.totalPages || 0,
  };

  return {
    error,
    userList,
    isLoading,
    refetch,
  };
};
