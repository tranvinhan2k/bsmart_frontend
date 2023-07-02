import Pagination from '@mui/material/Pagination';
import { useEffect } from 'react';
import { scrollToTop } from '~/utils/common';

interface CustomPaginationProps {
  currentPage: number | undefined;
  totalPages: number | undefined;
  onChange: (e: any, value: number) => void;
}

export default function CustomPagination({
  currentPage = 0,
  totalPages = 0,
  onChange,
}: CustomPaginationProps) {
  const currentIndexPage = currentPage + 1;

  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  if (totalPages === 0) {
    return null;
  }

  return (
    <Pagination
      variant="outlined"
      shape="rounded"
      color="secondary"
      page={currentIndexPage}
      onChange={onChange}
      count={totalPages}
    />
  );
}
