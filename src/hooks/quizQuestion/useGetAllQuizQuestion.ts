import { useEffect, useState } from 'react';
import questionApi from '~/api/question';
import { useCustomQuery } from '../custom/useCustomQuery';
import { PagingFilterRequest } from '~/models';

export const useGetAllQuizQuestion = () => {
  const [filterParams, setFilterParams] = useState<PagingFilterRequest>({
    q: '',
    page: 0,
  });

  const { data, error, isLoading, refetch } = useCustomQuery(
    ['get_all_quiz_question'],
    () => questionApi.getAllQuizQuestion(filterParams)
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams]);

  return {
    quizQuestions: data,
    error,
    isLoading,
    setFilterParams,
  };
};
