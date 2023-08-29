import { useState } from 'react';
// import CourseCreateRequestDetails from '~/containers/CreateCourseRequestManageSection/CourseCreateRequestDetails';
import { ClassStatusType } from '~/constants/class';
import { rowsPerPageOptionsDefault } from '~/constants/dataGrid';
import { useSearchManagedClass } from '~/hooks/class/UseSearchManagedClass';
import columns from '~/constants/columns';
import CustomDialog from '~/components/atoms/CustomDialog';
import ManageTable, {
  MenuItemPayload,
} from '~/components/molecules/ManageTable';
import ManageTableDetailsClass from '../ManageTableDetailsClass';

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
    optionNotSupport = 'Chưa hỗ trợ',
    optionViewDetails = 'Xem chi tiết',
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

  const { managedClassList, error, isLoading, refetch } = useSearchManagedClass(
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

  const optionListDefault: MenuItemPayload[] = [
    {
      icon: 'question',
      title: Text.optionNotSupport,
      onCLick: () => {},
    },
  ];
  const optionListViewDetails: MenuItemPayload[] = [
    {
      icon: 'category',
      title: Text.optionViewDetails,
      onCLick: handleOpenManagedClassDetails,
    },
  ];

  let renderOptions;
  let renderColumns;
  switch (status) {
    case ClassStatusType.NOTSTART:
      renderOptions = optionListViewDetails;
      renderColumns = columns.managedClassNotStartColumns;
      break;
    default:
      renderOptions = optionListViewDetails;
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
          <ManageTableDetailsClass
            row={selectedRow}
            onClose={handleTriggerDialog}
            refetchSearch={refetch}
            refetchGetNoOfRequest={refetchGetNoOfRequest}
          />
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
        popoverOptions={renderOptions}
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
