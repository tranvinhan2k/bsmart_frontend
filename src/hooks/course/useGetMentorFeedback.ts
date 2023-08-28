import { useState } from 'react';
import feedbacksApi from '~/api/feedback';
import { useCustomQuery } from '../custom/useCustomQuery';
import { PagingFilterRequest } from '~/models';

export const useGetMentorFeedback = (id: number) => {
  const [filterParams, setFilterParams] = useState<PagingFilterRequest>({
    id,
    page: 0,
    isCourse: false,
  });

  const handleChangePage = (pageNumber: number) => {
    setFilterParams({ ...filterParams, page: pageNumber });
  };

  const handleChangeNumberOfStar = (rate: number) => {
    setFilterParams({ ...filterParams, rate: rate === 0 ? undefined : rate });
  };

  const { data, error, isLoading } = useCustomQuery(
    ['get_mentor_feedback', `${filterParams.rate}`, `${filterParams.page}`],
    () =>
      feedbacksApi.getIntroduceMentorFeedback({
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
