import { RoleKeys } from '~/models/variables';
import { useCustomQuery } from '../custom/useCustomQuery';
import classApi from '~/api/class';

export const useQueryGetDetailUserClass = (id: number, role: RoleKeys) => {
  const { data, error, isLoading, refetch } = useCustomQuery(
    ['get_detail_user_class'],
    () => classApi.getDetailUserClass(id, role === 'STUDENT' ? 1 : 2)
  );

  return {
    detailClass: data,
    refetch,
    error,
    isLoading,
  };
};
