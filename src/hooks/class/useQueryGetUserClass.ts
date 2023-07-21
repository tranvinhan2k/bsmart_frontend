import { useEffect, useState } from 'react';
import { PagingFilterRequest } from '~/models';
import { useCustomQuery } from '../custom/useCustomQuery';
import accountApi from '~/api/users';
import { ClassStatusKeys } from '~/models/variables';
import { ClassStatusList } from '~/constants';

export const useQueryGetUserClass = () => {
  const [filterParams, setFilterParams] = useState<PagingFilterRequest>({
    q: '',
    page: 0,
    size: 24,
    status: 'ALL',
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

  const handleChangeStartDate = (startDate: string) => {
    setFilterParams((prev) => ({ ...prev, startDate }));
  };
  const handleChangeEndDate = (endDate: string) => {
    setFilterParams((prev) => ({ ...prev, endDate }));
  };
  const handleChangeSubjectId = (subjectId: number[]) => {
    setFilterParams((prev) => ({ ...prev, subjectId }));
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
    handleChangeEndDate,
    handleChangePage,
    handleChangeSearchValue,
    handleChangeStartDate,
    handleChangeSubjectId,
    handleChangeStatus,
  };
};
