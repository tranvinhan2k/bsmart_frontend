import { useState, useEffect } from 'react';
import classApi from '~/api/class';
import { useCustomQuery } from '../custom/useCustomQuery';
import { PagingFilterRequest } from '~/models';

export const useQueryGetMentorCourseClasses = (id: number) => {
  const [filterParam, setFilterParam] = useState<PagingFilterRequest>({
    q: '',
    page: 0,
    size: 5,
  });

  const { data, error, isLoading, refetch } = useCustomQuery(
    ['mentor_course_classes'],
    () =>
      classApi.getMentorCourseCLasses({
        id,
        params: filterParam,
      })
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParam]);

  return {
    currentPage: data?.currentPage,
    classes: data?.items,
    totalPages: data?.totalPages,
    setFilterParam,
    filterParam,
    error,
    isLoading,
    refetch,
  };
};
