import { useEffect, useState } from 'react';
import questionApi from '~/api/question';
import { useCustomQuery } from '../custom/useCustomQuery';
import { PagingFilterRequest } from '~/models';
import { useDispatchGetAllSubjects } from '../useDispatchGetAllSubjects';

export const useGetAllQuizQuestion = () => {
  const [filterParams, setFilterParams] = useState<PagingFilterRequest>({
    q: '',
    page: 0,
    size: 12000,
    subjectId: [],
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
    filterParams,
  };
};
