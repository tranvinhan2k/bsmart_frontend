import { useState } from 'react';
import transactionsApi from '~/api/transactions';
import { useCustomQuery } from './custom/useCustomQuery';
import { PagingFilterRequest } from '~/models';

export const useGetMentorTransactions = () => {
  const [filterParams, setFilterParams] = useState<PagingFilterRequest>({
    page: 0,
  });
  const { data, error, isLoading, refetch } = useCustomQuery(
    ['get_transactions'],
    () => transactionsApi.getMentorTransactions(filterParams)
  );

  const handleChangePage = (paramPage: number) => {
    setFilterParams({
      ...filterParams,
      page: paramPage,
    });
  };

  return {
    transactions: data?.items,
    error,
    isLoading,
    currentPage: data?.currentPage,
    totalPages: data?.totalPages,
    onChangePage: handleChangePage,
    refetch,
  };
};
