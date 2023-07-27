import { useState } from 'react';
import CustomDialog from '~/components/atoms/CustomDialog';
import ManageTable, {
  MenuItemPayload,
} from '~/components/molecules/ManageTable';
// import CourseCreateRequestDetails from '~/containers/CreateCourseRequestManageSection/CourseCreateRequestDetails';
import { ClassStatusType } from '~/constants/class';
import { rowsPerPageOptionsDefault } from '~/constants/dataGrid';
import { useSearchManagedClass } from '~/hooks/class/UseSearchManagedClass';
import columns from '~/constants/columns';

interface ManageTableClassProps {
  status: ClassStatusType;
  refetchGetNoOfRequest: () => void;
}

export default function ManageTableClass({
  status,
  refetchGetNoOfRequest,
}: ManageTableClassProps) {
  const enum Text {
    searchPlaceholder = 'Tìm kiếm lớp học...',
    searchButtonLabel = 'Tìm kiếm',
    popoverOptionViewDetails = 'Xem chi tiết',
    popoverOptionNotSupport = 'Chưa hỗ trợ',
  }

  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<'READ' | 'VERIFY' | ''>('');
  const [selectedRow, setSelectedRow] = useState<any>();

  const [q, setQ] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(rowsPerPageOptionsDefault[0]);
  const [sort, setSort] = useState<string[]>([]);
  const handleNewPage = (params: number) => setPage(params);
  const handleNewSize = (params: number) => setSize(params);
  const handleTriggerDialog = () => setOpen(!open);

  const { error, managedClassList, isLoading, refetch } = useSearchManagedClass(
    { status, q, page, size, sort }
  );
  const rows = managedClassList ? managedClassList.items : [];

  const handleSearch = (data: any) => {
    setQ(data.searchValue);
    refetch();
  };

  const handleOpenManagedClassDetails = () => {
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
      icon: 'category',
      title: Text.popoverOptionViewDetails,
      onCLick: handleOpenManagedClassDetails,
    },
  ];

  let popoverOptions;
  let renderColumns;
  switch (status) {
    case ClassStatusType.NOTSTART:
      popoverOptions = optionsViewDetails;
      renderColumns = columns.managedClassNotStartColumns;
      break;
    default:
      popoverOptions = optionsViewDetails;
      renderColumns = columns.managedClassColumns;
      break;
  }

  let renderItem;
  switch (mode) {
    case 'READ':
      renderItem = (
        <CustomDialog
          open={open}
          onClose={handleTriggerDialog}
          maxWidth={false}
        >
          <h1>Chi tiết lớp</h1>
        </CustomDialog>
      );
      break;
    default:
      renderItem = null;
      break;
  }

  return (
    <>
      <ManageTable
        columns={renderColumns}
        rows={rows}
        error={error}
        isLoading={isLoading}
        onPageChange={handleNewPage}
        onPageSizeChange={handleNewSize}
        page={page}
        pageSize={size}
        popoverOptions={popoverOptions}
        rowsPerPageOptions={rowsPerPageOptionsDefault}
        setSelectedRow={setSelectedRow}
        totalItems={managedClassList?.totalItems ?? 0}
        searchHandler={{
          searchPlaceholder: Text.searchPlaceholder,
          onSearch: handleSearch,
        }}
        hideFooterSelectedRowCount
      />
      {renderItem}
    </>
  );
}
