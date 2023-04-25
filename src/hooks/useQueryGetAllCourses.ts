import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import coursesApi from '~/api/courses';
import { selectFilterParams } from '~/redux/courses/selector';
import { TypeOptionPayload } from '~/constants';

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
  return {
    error,
    courses: data,
    isLoading,
    filterParams,
  };
};
