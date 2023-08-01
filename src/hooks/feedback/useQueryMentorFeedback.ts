import { useState } from 'react';
import feedbacksApi from '~/api/feedback';
import { useCustomQuery } from '../custom/useCustomQuery';
import { PagingFilterRequest } from '~/models';

export const useQueryMentorFeedback = (id: number) => {
  const [filterParams, setFilterParams] = useState<PagingFilterRequest>({
    page: 0,
  });

  return useCustomQuery(['mentor_feedbacks'], () =>
    feedbacksApi.getMentorFeedback({
      id,
      params: filterParams,
    })
  );
};
