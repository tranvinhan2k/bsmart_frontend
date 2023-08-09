import { useCustomQuery } from '../custom/useCustomQuery';
import classApi from '~/api/class';

export const useQueryGetDetailUserClass = (id: number) => {
  const { data, error, isLoading, refetch } = useCustomQuery(
    ['get_detail_user_class'],
    () => classApi.getDetailUserClass(id)
  );

  return {
    detailClass: data,
    refetch,
    error,
    isLoading,
  };
};
