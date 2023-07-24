import { useCustomQuery } from '../custom/useCustomQuery';
import accountApi from '~/api/users';

export const useQueryGetDetailUserClass = (id: number) => {
  const { data, error, isLoading, refetch } = useCustomQuery(
    ['get_detail_user_class'],
    () => accountApi.getDetailUserClass(id)
  );

  return {
    detailClass: data,
    refetch,
    error,
    isLoading,
  };
};
