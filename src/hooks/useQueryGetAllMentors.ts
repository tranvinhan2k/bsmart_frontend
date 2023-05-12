import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import mentorsApi from '~/api/mentors';
import { selectFilterParams } from '~/redux/mentors/selector';

export const useQueryGetAllMentors = () => {
  const filterParams = useSelector(selectFilterParams);
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['mentors'],
    queryFn: () => mentorsApi.getAllMentor({ ...filterParams }),
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams]);
  return {
    error,
    mentors: data,
    isLoading,
    filterParams,
  };
};
