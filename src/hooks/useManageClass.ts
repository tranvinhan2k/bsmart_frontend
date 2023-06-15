import { useQuery } from '@tanstack/react-query';
import classApi from '~/api/class';

export interface UseManageClassPayload {
  id?: number;
}

export const useManageClass = ({ id }: UseManageClassPayload) => {
  const key = 'class';
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: [key, id],
    queryFn: () =>
      classApi.getClassDetails({
        id,
      }),
  });

  return {
    error,
    classDetails: data,
    isLoading,
    refetch,
  };
};
