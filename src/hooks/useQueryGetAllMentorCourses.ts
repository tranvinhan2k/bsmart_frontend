import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import coursesApi from '~/api/courses';
import { RequestPagingFilterPayload } from '~/models';

export const useQueryGetAllMentorCourses = (
  filterParams: RequestPagingFilterPayload
) => {
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['member_course', filterParams],
    queryFn: () => coursesApi.getMentorCourse(filterParams),
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams]);
  return {
    error,
    courses: data,
    isLoading,
    refetch,
  };
};
