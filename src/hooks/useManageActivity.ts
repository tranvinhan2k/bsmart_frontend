import { useQuery } from '@tanstack/react-query';
import activityApi from '~/api/activity';

export interface UseManageActivityPayload {
  id?: number;
}

export const useManageActivity = ({ id }: UseManageActivityPayload) => {
  const key = 'activity';
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: [key, id],
    queryFn: () =>
      activityApi.getActivityDetails({
        id,
      }),
  });

  return {
    error,
    activity: data,
    isLoading,
    refetch,
  };
};
