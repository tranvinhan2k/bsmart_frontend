import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import mentorsApi from '~/api/mentors';
import { PagingFilterRequest } from '~/models';

export const useQueryGetAllMentors = () => {
  const [filterParams, setFilterParams] = useState<PagingFilterRequest>({
    page: 0,
    accountStatus: 'STARTING',
  });
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['mentors', filterParams.q, filterParams.subjectId],
    queryFn: () => mentorsApi.getAllMentor(filterParams),
  });

  const handleChangePage = (page: number) => {
    setFilterParams({ ...filterParams, page });
  };
  const handleSearch = (searchValue: string) => {
    setFilterParams({ ...filterParams, q: searchValue });
  };
  const handleChangeSubject = (subjectIds: number[]) => {
    setFilterParams({ ...filterParams, subjectId: subjectIds });
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
    onSearch: handleSearch,
    onChangeSubject: handleChangeSubject,
  };
};
