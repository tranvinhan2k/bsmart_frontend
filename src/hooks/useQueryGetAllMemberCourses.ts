import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import coursesApi from '~/api/courses';
import { PagingRequestPayload } from '~/models';

export const useQueryGetAllMemberCourses = (
  filterParams: PagingRequestPayload
) => {
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['member_course', filterParams],
    queryFn: () => coursesApi.getMemberCourse(filterParams),
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams]);
  return {
    error,
    courses: data,
    isLoading,
  };
};
