import { useQuery } from '@tanstack/react-query';
import categoriesApi from '~/api/categories';

export const useQueryGetAllCategories = () => {
  const { error, data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getAllCategories(),
  });
  return {
    error,
    categories: data,
    isLoading,
  };
};
