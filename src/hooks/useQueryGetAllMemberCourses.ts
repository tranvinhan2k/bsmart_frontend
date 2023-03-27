import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import coursesApi from '~/api/courses';
import { RequestPagingFilterPayload } from '~/models';

export const useQueryGetAllMemberCourses = (
  filterParams: RequestPagingFilterPayload
) => {
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['member_course'],
    queryFn: () => coursesApi.getMemberCourse(filterParams),
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams]);
  return {
    error,
    courses: data?.items,
    isLoading,
  };
};
