import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import coursesApi from '~/api/courses';
import { PagingFilterRequest } from '~/models';

export const useQueryGetMentorCourses = (filterParams: PagingFilterRequest) => {
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['member_course', filterParams],
    queryFn: () => coursesApi.getMentorCourses(filterParams),
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams]);
  return {
    error,
    isLoading,
    refetch,
    courses: data?.items,
    first: data?.first,
    last: data?.last,
    totalPages: data?.totalPages,
    totalItems: data?.totalItems,
    currentPage: data?.currentPage,
    pageItemSize: data?.pageItemSize,
    pageSize: data?.pageSize,
  };
};
