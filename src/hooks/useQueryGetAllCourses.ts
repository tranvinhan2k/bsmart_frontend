import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import coursesApi from '~/api/courses';
import { selectFilterParams } from '~/redux/courses/selector';
import { PagingFilterPayload } from '~/models';
import { CourseMenuItemPayload } from '~/models/type';

export const useQueryGetAllCourse = () => {
  const filterParams = useSelector(selectFilterParams);

  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['courses'],
    queryFn: () => coursesApi.getAllCourse(filterParams),
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams]);

  const courses: PagingFilterPayload<CourseMenuItemPayload> = {
    items: data?.items || [],
    currentPage: data?.currentPage || 0,
    pageSize: data?.pageSize || 0,
    totalItems: data?.totalItems || 0,
    first: data?.first || false,
    last: data?.last || false,
    pageItemSize: data?.pageItemSize || 0,
    totalPages: data?.totalPages || 0,
  };

  return {
    error,
    courses,
    isLoading,
    filterParams,
  };
};
