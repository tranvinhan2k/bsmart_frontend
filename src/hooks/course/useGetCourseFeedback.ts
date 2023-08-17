import { useState } from 'react';
import feedbacksApi from '~/api/feedback';
import { useCustomQuery } from '../custom/useCustomQuery';
import { PagingFilterRequest } from '~/models';

export const useGetCourseFeedback = (id: number) => {
  const [filterParams, setFilterParams] = useState<PagingFilterRequest>({
    id,
    page: 0,
    numberOfStar: 3,
  });

  const handleChangePage = (pageNumber: number) => {
    setFilterParams({ ...filterParams, page: pageNumber });
  };

  const handleChangeNumberOfStar = (numberOfStar: number) => {
    setFilterParams({ ...filterParams, numberOfStar });
  };

  const { data, error, isLoading } = useCustomQuery(
    [
      'get_course_feedback',
      `${filterParams.numberOfStar}`,
      `${filterParams.page}`,
    ],
    () =>
      feedbacksApi.getCourseFeedback({
        id,
        params: filterParams,
      })
  );

  return {
    data,
    error,
    isLoading,
    numberOfStar: filterParams.numberOfStar,
    handleChangePage,
    handleChangeNumberOfStar,
  };
};
