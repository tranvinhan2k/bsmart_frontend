import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  rowHeightDefault,
  rowsPerPageOptionsDefault,
} from '~/constants/dataGrid';
import { mentorCreateCourseRequestColumns } from '~/dataGridColumns/mentorCreateCourseRequestColumns';
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
      name: 'Lớp học C# cơ bản',
      createDate: '2023-04-27T13:07:46.698Z',
      startDate: '2023-04-27T13:07:46.698Z',
      endDate: '2023-04-27T13:07:46.698Z',
      classLevel: 'Cơ bản',
      unitPrice: 1000000,
      numberStudent: 10,
      maxNumberStudent: 50,
    },
    {
      id: 2,
      email: 'nhatluu9991@gmail.com',
      name: 'Lớp học C# cơ bản',
      createDate: '2023-04-27T13:07:46.698Z',
    },
    {
      id: 3,
      email: 'nhatluu9991@gmail.com',
      name: 'Lớp học C# cơ bản',
      createDate: '2023-04-27T13:07:46.698Z',
    },
  ],
};

export default function ProcessCourseCreateRequest() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState('');
  // const { transactions } = useQueryGetTransactions({ page, size, sort });
  const handleNewPage = (params: number) => setPage(params);
  const handleNewSize = (params: number) => setSize(params);
  const isLoading = false;

  const navigation = useNavigate();
  const navigateToRequestDetails = () => {
    navigation('/manager-process-create-course-request/1');
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
      columns={mentorCreateCourseRequestColumns}
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
