import { RoleKeys } from '~/models/variables';
import { useCustomQuery } from '../custom/useCustomQuery';
import accountApi from '~/api/users';

export const useQueryGetDetailUserClass = (id: number, role: RoleKeys) => {
  const { data, error, isLoading, refetch } = useCustomQuery(
    ['get_detail_user_class'],
    () => accountApi.getDetailUserClass(id, role === 'STUDENT' ? 1 : 2)
  );

  return {
    detailClass: data,
    refetch,
    error,
    isLoading,
  };
};
