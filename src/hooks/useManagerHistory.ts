import { useQuery } from '@tanstack/react-query';
import activityHistoryApi from '~/api/activityHistory';

export interface UseManageActivityHistoryPayload {
  page?: number;
  size?: number;
  sort?: string;
}

export const useManagerHistory = ({
  page,
  size,
  sort,
}: UseManageActivityHistoryPayload) => {
  const key = 'activity_history';
  const { error, data, isError, isLoading, refetch } = useQuery({
    queryKey: [key, page, size, sort],
    queryFn: () =>
      activityHistoryApi.getActivityHistory({
        page,
        size,
        sort,
      }),
    keepPreviousData: true,
  });

  return {
    error,
    activityHistories: data,
    isError,
    isLoading,
    refetch,
  };
};
