import { Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useEffect } from 'react';
import { Color } from '~/assets/variables';
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

  // useEffect(() => {
  //   scrollToTop();
  // }, [currentPage]);

  if (totalPages === 0) {
    return null;
  }

  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Pagination
        sx={{
          button: {
            background: Color.white,
          },
          '.Mui-selected': {
            background: `${Color.tertiary} !important`,
            color: `${Color.white} !important`,
          },
          '.MuiPaginationItem-previousNext': {
            background: `${Color.grey} !important`,
            borderColor: `${Color.grey} !important`,
            color: `${Color.white} !important`,
          },
        }}
        variant="outlined"
        shape="rounded"
        color="secondary"
        page={currentIndexPage}
        onChange={onChange}
        count={totalPages}
      />
    </Stack>
  );
}
