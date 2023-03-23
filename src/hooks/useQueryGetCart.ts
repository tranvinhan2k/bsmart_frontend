import { useQuery } from '@tanstack/react-query';
import cartApi from '~/api/cart';

export const useQueryGetCart = () => {
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: () => cartApi.getCart(),
  });
  return {
    error,
    cart: data,
    isLoading,
    refetch,
  };
};
