import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  rowHeightDefault,
  rowsPerPageOptionsDefault,
} from '~/constants/dataGrid';
import { mentorRegisterRequestColumns } from '~/dataGridColumns/mentorRegisterRequest';
import DataGrid from '~/components/atoms/DataGrid';

const mentorRegisterRequests = {
  totalPages: 1,
  totalItems: 3,
  currentPage: 0,
  first: true,
  last: true,
  items: [
    {
      id: 0,
      email: 'nhatluu9991@gmail.com',
      fullName: 'Lưu Quang Nhật',
      birthDay: '2023-04-27T13:07:46.698Z',
      phone: '0987654321',
    },
    {
      id: 2,
      email: 'nhatluu9991@gmail.com',
      fullName: 'Lưu Quang Nhật',
      birthDay: '2023-04-27T13:07:46.698Z',
      phone: '0987654321',
    },
    {
      id: 3,
      email: 'nhatluu9991@gmail.com',
      fullName: 'Lưu Quang Nhật',
      birthDay: '2023-04-27T13:07:46.698Z',
      phone: '09876543210',
    },
  ],
};

export default function ProcessRegisterRequest() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState('');
  // const { transactions } = useQueryGetTransactions({ page, size, sort });
  const handleNewPage = (params: number) => setPage(params);
  const handleNewSize = (params: number) => setSize(params);
  const isLoading = false;

  const navigation = useNavigate();
  const navigateToRequestDetails = () => {
    navigation('/manager-process-register-request/1');
  };

  const popoverOptions = [
    {
      id: 0,
      label: 'Xem chi tiết',
      optionFunc: navigateToRequestDetails,
    },
  ];

  return (
    <DataGrid
      columns={mentorRegisterRequestColumns}
      loading={isLoading}
      onPageChange={handleNewPage}
      onPageSizeChange={handleNewSize}
      page={page}
      pageSize={size}
      pagination
      paginationMode="server"
      rowCount={mentorRegisterRequests.totalItems}
      rows={mentorRegisterRequests.items}
      rowsPerPageOptions={rowsPerPageOptionsDefault}
      /*  */
      density="compact"
      disableSelectionOnClick
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      getRowHeight={() => 'auto'}
      popoverOptions={popoverOptions}
      rowHeight={rowHeightDefault}
      /*  */
    />
  );
}
