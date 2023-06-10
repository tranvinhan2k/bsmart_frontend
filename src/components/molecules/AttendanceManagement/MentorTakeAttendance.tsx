import { useState } from 'react';
import { GridInputSelectionModel } from '@mui/x-data-grid';
import { Box, Typography, Stack } from '@mui/material';
import {
  rowHeightDefault,
  rowsPerPageOptionsDefault,
} from '~/constants/dataGrid';
import { attendanceCheckByMentorColumns } from '~/dataGridColumns/attendanceCheckByMentor';
import DataGrid from '~/components/atoms/DataGrid';
import Button from '~/components/atoms/Button';

const attendanceCheckByMentor = {
  totalPages: 1,
  totalItems: 3,
  currentPage: 0,
  first: true,
  last: true,
  items: [
    {
      id: 0,
      name: 'Lưu Quang Nhật 0',
    },
    {
      id: 1,
      name: 'Lưu Quang Nhật 1',
    },
    {
      id: 2,
      name: 'Lưu Quang Nhật 2',
    },
  ],
};

export default function MentorTakeAttendance() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState('');
  // const { transactions } = useQueryGetTransactions({ page, size, sort });
  const handleNewPage = (params: number) => setPage(params);
  const handleNewSize = (params: number) => setSize(params);
  const isLoading = false;

  const handleOnSelectionModelChange = (datas: any) => {
    console.log(datas);
  };

  return (
    <>
      <DataGrid
        columns={attendanceCheckByMentorColumns}
        loading={isLoading}
        onPageChange={handleNewPage}
        onPageSizeChange={handleNewSize}
        page={page}
        pageSize={size}
        pagination
        paginationMode="server"
        rowCount={attendanceCheckByMentor.totalItems}
        rowHeight={rowHeightDefault}
        rows={attendanceCheckByMentor.items}
        rowsPerPageOptions={rowsPerPageOptionsDefault}
        /*  */
        density="compact"
        disableSelectionOnClick
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        getRowHeight={() => 'auto'}
        /*  */
        checkboxSelection
        hideFooter
        onSelectionModelChange={handleOnSelectionModelChange}
      />
      <Stack
        direction="row-reverse"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        pt={2}
      >
        <Button variant="outlined">Điểm danh</Button>
      </Stack>
    </>
  );
}
