import { useQuery } from '@tanstack/react-query';
import imageApi from '~/api/image';

export const useQueryGetImage = (id: string) => {
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['image'],
    queryFn: () => imageApi.getImage(id),
    keepPreviousData: true,
  });
  return {
    image: data,
    error,
    isLoading,
    refetch,
  };
};
