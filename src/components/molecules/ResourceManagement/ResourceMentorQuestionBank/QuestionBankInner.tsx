import { useState } from 'react';
import {
  rowHeightDefault,
  rowsPerPageOptionsDefault,
} from '~/constants/dataGrid';
import { questionBankInnerColumns } from '~/dataGridColumns/questionBankInner';
import DataGrid from '~/components/atoms/DataGrid';

const questionBankInners = {
  totalPages: 1,
  totalItems: 3,
  currentPage: 0,
  first: true,
  last: true,
  items: [
    {
      id: 1,
      content: '1+1=?',
      version: 'v1',
      createdBy: {
        name: 'Admin',
        date: '2023-04-27T13:07:46.698Z',
      },
      noOfComments: '0',
      isCheckingNeed: false,
      lastUsed: '2023-04-27T13:07:46.698Z',
      modifiedBy: {
        name: 'Admin',
        date: '2023-04-27T13:07:46.698Z',
      },
    },
    {
      id: 2,
      content: '1+2=?',
      version: 'v1',
      createdBy: {
        name: 'Admin',
        date: '2023-04-27T13:07:46.698Z',
      },
      noOfComments: '0',
      isCheckingNeed: false,
      lastUsed: false,
      modifiedBy: {
        name: 'Admin',
        date: '2023-04-27T13:07:46.698Z',
      },
    },
    {
      id: 3,
      content: '1+3=?',
      version: 'v1',
      createdBy: {
        name: 'Admin',
        date: '2023-04-27T13:07:46.698Z',
      },
      noOfComments: '0',
      isCheckingNeed: false,
      lastUsed: false,
      modifiedBy: {
        name: 'Admin',
        date: '2023-04-27T13:07:46.698Z',
      },
    },
  ],
};

const popoverOptions = [
  {
    id: 0,
    label: 'Xem chi tiết',
    optionFunc: () => console.log('Xem chi tiết'),
  },
];

export default function QuestionBankInner() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState('');
  // const { transactions } = useQueryGetTransactions({ page, size, sort });
  const handleNewPage = (params: number) => setPage(params);
  const handleNewSize = (params: number) => setSize(params);
  const isLoading = false;

  return (
    <DataGrid
      columns={questionBankInnerColumns}
      density="compact"
      loading={isLoading}
      page={page}
      pageSize={size}
      pagination
      paginationMode="server"
      rowCount={questionBankInners.totalItems}
      rows={questionBankInners.items}
      rowsPerPageOptions={rowsPerPageOptionsDefault}
      /*  */
      disableSelectionOnClick
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      getRowHeight={() => 'auto'}
      onPageChange={handleNewPage}
      onPageSizeChange={handleNewSize}
      popoverOptions={popoverOptions}
      rowHeight={rowHeightDefault}
    />
  );
}
