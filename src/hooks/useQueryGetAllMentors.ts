import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import mentorsApi from '~/api/mentors';
import { selectFilterParams } from '~/redux/mentors/selector';
import { PagingFilterRequest } from '~/models';

export const useQueryGetAllMentors = () => {
  const [filterParams, setFilterParams] = useState<PagingFilterRequest>({
    page: 0,
  });
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['mentors'],
    queryFn: () => mentorsApi.getAllMentor(filterParams),
  });

  const handleChangePage = (page: number) => {
    setFilterParams({ ...filterParams, page });
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams]);
  return {
    error,
    mentors: data,
    isLoading,
    filterParams,
    onChangePage: handleChangePage,
  };
};
