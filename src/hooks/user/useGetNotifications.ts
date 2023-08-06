import { useState } from 'react';
import { useCustomQuery } from '../custom/useCustomQuery';
import notificationApi from '~/api/notification';
import { PagingFilterRequest } from '~/models';

export const useGetNotifications = () => {
  const [filterParams, setFilterParams] = useState<PagingFilterRequest>({
    page: 0,
    size: 10000,
  });
  const { data, isLoading, error, refetch } = useCustomQuery(
    ['get_notification'],
    () =>
      notificationApi.getNotifications({
        params: filterParams,
      })
  );

  return {
    data: data?.items || [],
    error,
    isLoading,
    refetch,
  };
};
