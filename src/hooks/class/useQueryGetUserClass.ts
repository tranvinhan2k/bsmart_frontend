import { useEffect, useState } from 'react';
import { PagingFilterRequest } from '~/models';
import { useCustomQuery } from '../custom/useCustomQuery';
import accountApi from '~/api/users';
import { ClassStatusKeys } from '~/models/variables';

export const useQueryGetUserClass = (role: 'STUDENT' | 'TEACHER') => {
  const [filterParams, setFilterParams] = useState<PagingFilterRequest>({
    q: '',
    page: 0,
    size: 24,
    status: 'ALL',
    // asRole: role === 'STUDENT' ? 1 : 0,
  });

  const handleChangeSearchValue = (q: string) => {
    setFilterParams((prev) => ({ ...prev, q }));
  };
  const handleChangeStatus = (status: ClassStatusKeys) => {
    setFilterParams((prev) => ({ ...prev, status }));
  };

  const handleChangePage = (page: number) => {
    setFilterParams((prev) => ({ ...prev, page }));
  };

  const handleFilter = (params: {
    startDate: string;
    endDate: string;
    subjectId: number[];
  }) => {
    setFilterParams((prev) => ({
      ...prev,
      startDate: params.startDate,
      endDate: params.endDate,
      subjectId: params.subjectId,
    }));
  };

  const { data, error, isLoading, refetch } = useCustomQuery(
    ['get_user_class'],
    () => accountApi.getUserClass(filterParams)
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams]);

  return {
    classes: data?.items,
    currentPage: data?.currentPage,
    totalPage: data?.totalPages,
    error,
    isLoading,
    filterParams,
    handleChangePage,
    handleChangeSearchValue,
    handleFilter,
    handleChangeStatus,
  };
};
