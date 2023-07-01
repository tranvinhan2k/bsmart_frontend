import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import coursesApi from '~/api/courses';
import { selectFilterParams } from '~/redux/courses/selector';
import { TypeOptionPayload } from '~/constants';
import { PagingFilterPayload } from '~/models';
import { CoursePayload } from '~/models/courses';

export const useQueryGetAllCourse = () => {
  const filterParams = useSelector(selectFilterParams);
  const typesValue: string[] | undefined = filterParams?.types?.map((type) => {
    let result = '';
    TypeOptionPayload.map((item) => {
      if (type === item.id) {
        result = item.value;
      }
      return '';
    });
    return result;
  });
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['courses'],
    queryFn: () =>
      coursesApi.getAllCourse({ ...filterParams, types: typesValue }),
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams]);

  const courses: PagingFilterPayload<CoursePayload> = {
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
