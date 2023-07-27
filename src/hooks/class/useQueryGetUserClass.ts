import { useEffect, useState } from 'react';
import { PagingFilterRequest } from '~/models';
import { useCustomQuery } from '../custom/useCustomQuery';
import accountApi from '~/api/users';
import { ClassStatusKeys } from '~/models/variables';
import { ClassMenuItemPayload } from '~/models/type';

export const useQueryGetUserClass = (role: 'STUDENT' | 'TEACHER') => {
  const [filter, setFilter] = useState<ClassMenuItemPayload[]>();
  const [filterParams, setFilterParams] = useState<PagingFilterRequest>({
    q: '',
    page: 0,
    size: 24,
    status: 'STARTING',
    asRole: role === 'STUDENT' ? 1 : 2,
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
    const handleGetFilterCourse = async () => {
      const response = await accountApi.getUserClass({
        page: 0,
        asRole: role === 'STUDENT' ? 1 : 2,
      });
      setFilter(response.items);
    };

    handleGetFilterCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams]);

  return {
    classes: data?.items,
    allClasses: filter,
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
