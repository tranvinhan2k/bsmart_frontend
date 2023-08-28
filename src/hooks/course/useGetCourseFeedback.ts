import { useState } from 'react';
import feedbacksApi from '~/api/feedback';
import { useCustomQuery } from '../custom/useCustomQuery';
import { PagingFilterRequest } from '~/models';

export const useGetCourseFeedback = (id: number) => {
  const [filterParams, setFilterParams] = useState<PagingFilterRequest>({
    id,
    page: 0,
    rate: undefined,
  });

  const handleChangePage = (pageNumber: number) => {
    setFilterParams({ ...filterParams, page: pageNumber });
  };

  const handleChangeNumberOfStar = (rate: number) => {
    setFilterParams({ ...filterParams, rate: rate === 0 ? undefined : rate });
  };

  const { data, error, isLoading } = useCustomQuery(
    ['get_course_feedback', `${filterParams.rate}`, `${filterParams.page}`],
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
    numberOfStar: filterParams.rate,
    handleChangePage,
    handleChangeNumberOfStar,
  };
};
