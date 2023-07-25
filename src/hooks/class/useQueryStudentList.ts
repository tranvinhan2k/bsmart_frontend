import { useEffect, useState } from 'react';
import { useCustomQuery } from '../custom/useCustomQuery';
import classApi from '~/api/class';
import { PagingFilterRequest } from '~/models';

export const useQueryStudentList = (id: number) => {
  const [filterParams, setFilterParams] = useState<PagingFilterRequest>({
    page: 0,
  });

  const handleChangePageNumber = (paramPageNumber: number) => {
    setFilterParams({ ...filterParams, page: paramPageNumber });
  };

  const { data, error, isLoading, refetch } = useCustomQuery([], () =>
    classApi.getMentorClassStudentList({
      id,
      params: filterParams,
    })
  );

  useEffect(() => {
    refetch();
  }, [filterParams, refetch]);

  return {
    studentList: data?.items,
    currentPage: data?.currentPage,
    totalPages: data?.totalPages,
    error,
    isLoading,
    handleChangePageNumber,
  };
};
