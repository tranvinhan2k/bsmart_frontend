import { useState } from 'react';
import CustomDialog from '~/components/atoms/CustomDialog';
import ManageTable, {
  MenuItemPayload,
} from '~/components/molecules/ManageTable';
import { CourseStatusType } from '~/constants/course';
import { rowsPerPageOptionsDefault } from '~/constants/dataGrid';
import { useSearchCourseCreateRequest } from '~/hooks/course/useSearchCourseCreateRequest';
import columns from '~/constants/columns';
import ManageTableDetailsCourseCreateRequest from '../ManageTableDetailsCourseCreateRequest';
import { WithdrawRequestStatusType } from '~/constants/transaction';
import { useSearchManagedWithdrawRequest } from '~/hooks/transaction/useSearchTransaction';

const mockRow = [
  {
    id: 1,
    code: '34s5',
    name: 'Nguyễn Văn A',
    timeProcessed: '08:23 - 18 tháng 7, 2023',
  },
  {
    id: 2,
    code: '63sg',
    name: 'Nguyễn Văn B',
    timeProcessed: '11:09 - 01 tháng 7, 2023',
  },
];

interface Props {
  status: WithdrawRequestStatusType;
  refetchGetNoOfRequest: () => void;
}

export default function ManageTableWithdrawRequest({
  status,
  refetchGetNoOfRequest,
}: Props) {
  const enum Text {
    searchPlaceholder = 'Tìm kiếm yêu cầu...',
    popoverOptionViewDetails = 'Lấy danh sách',
    popoverOptionNotSupport = 'Chưa hỗ trợ',
  }

  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<'READ' | 'VERIFY' | ''>('');
  const [selectedRow, setSelectedRow] = useState<any>();

  // const [status, setStatus] = useState<string>('STARTING');
  const [q, setQ] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(rowsPerPageOptionsDefault[0]);
  const [sort, setSort] = useState<string[]>([]);

  const handleNewPage = (params: number) => setPage(params);
  const handleNewSize = (params: number) => setSize(params);
  const handleTriggerDialog = () => setOpen(!open);

  const { error, managedWithdrawRequestList, isLoading, refetch } =
    useSearchManagedWithdrawRequest({ status, q, page, size, sort });
  const rows = managedWithdrawRequestList
    ? managedWithdrawRequestList.items
    : [];

  const handleSearch = (data: any) => {
    setQ(data.searchValue);
    refetch();
  };

  const handleOpenCourseCreateRequestDetails = () => {
    handleTriggerDialog();
    setMode(() => 'READ');
  };

  const popoverOptionsDefault: MenuItemPayload[] = [
    {
      icon: 'question',
      title: Text.popoverOptionNotSupport,
      onCLick: () => console.log(Text.popoverOptionNotSupport),
    },
  ];
  const optionsViewDetails: MenuItemPayload[] = [
    {
      icon: 'download',
      title: Text.popoverOptionViewDetails,
      onCLick: handleOpenCourseCreateRequestDetails,
    },
  ];

  return (
    <>
      <ManageTable
        columns={columns.managedWithdrawRequestColumns}
        rows={rows}
        error={error}
        isLoading={isLoading}
        onPageChange={handleNewPage}
        onPageSizeChange={handleNewSize}
        page={page}
        pageSize={size}
        // popoverOptions={popoverOptions}
        rowsPerPageOptions={rowsPerPageOptionsDefault}
        setSelectedRow={setSelectedRow}
        totalItems={managedWithdrawRequestList?.totalItems ?? 0}
        searchHandler={{
          searchPlaceholder: Text.searchPlaceholder,
          onSearch: handleSearch,
        }}
        hideFooterSelectedRowCount
      />
      {/* {renderItem} */}
    </>
  );
}
