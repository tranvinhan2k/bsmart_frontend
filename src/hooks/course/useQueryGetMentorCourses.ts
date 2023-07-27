import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import coursesApi from '~/api/courses';
import { PagingFilterRequest } from '~/models';
import { CourseMenuItemPayload } from '~/models/type';

export const useQueryGetMentorCourses = (filterParams: PagingFilterRequest) => {
  const [allClasses, setAllClasses] = useState<CourseMenuItemPayload[]>();
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['member_course', filterParams],
    queryFn: () => coursesApi.getMentorCourses(filterParams),
  });

  useEffect(() => {
    const handleGetFilterClasses = async () => {
      const response = await coursesApi.getMentorCourses({
        page: 0,
      });
      setAllClasses(response.items);
    };

    handleGetFilterClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    allClasses,
  };
};
