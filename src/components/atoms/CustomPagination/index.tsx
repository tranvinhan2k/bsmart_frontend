import Pagination from '@mui/material/Pagination';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (e: any, value: number) => void;
}

export default function CustomPagination({
  currentPage,
  totalPages,
  onChange,
}: CustomPaginationProps) {
  return (
    <Pagination page={currentPage} onChange={onChange} count={totalPages} />
  );
}
