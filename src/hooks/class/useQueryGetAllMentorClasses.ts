import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import coursesApi from '~/api/courses';
import accountApi from '~/api/users';
import { PagingFilterRequest } from '~/models';

export const useQueryGetAllMentorClasses = (
  filterParams: PagingFilterRequest
) => {
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['member_class', filterParams],
    queryFn: () => accountApi.getMentorClasses(filterParams),
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams]);
  return {
    error,
    classes: data,
    isLoading,
    refetch,
  };
};
