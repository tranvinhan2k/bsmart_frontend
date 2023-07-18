import { useQuery } from '@tanstack/react-query';
import activityApi from '~/api/activity';

export const useGetDetailActivity = (id: number) => {
  const key = 'activity';
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: [key, id],
    queryFn: () => activityApi.getActivity(id),
  });

  return {
    error,
    activity: data,
    isLoading,
    refetch,
  };
};
