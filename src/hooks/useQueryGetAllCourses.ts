import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import coursesApi from '~/api/courses';
import { selectFilterParams } from '~/redux/courses/selector';

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
  return {
    error,
    courses: data,
    isLoading,
    filterParams,
  };
};
