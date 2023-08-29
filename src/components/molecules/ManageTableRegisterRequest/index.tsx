import { useState } from 'react';
import CustomDialog from '~/components/atoms/CustomDialog';
import ManageTable, {
  MenuItemPayload,
} from '~/components/molecules/ManageTable';
import { MentorProfileStatusType } from '~/constants/profile';
import { rowsPerPageOptionsDefault } from '~/constants/dataGrid';
import { useSearchRegisterRequest } from '~/hooks/user/useSearchRegisterRequest';
import columns from '~/constants/columns';
import ManageTableDetailsRegisterRequest from '~/components/molecules/ManageTableDetailsRegisterRequest';

interface ManageTableRegisterRequestProps {
  status: MentorProfileStatusType;
  refetchGetNoOfRequest: () => void;
}

export default function ManageTableRegisterRequest({
  status,
  refetchGetNoOfRequest,
}: ManageTableRegisterRequestProps) {
  const enum Text {
    searchPlaceholder = 'Tìm kiếm yêu cầu...',
    popoverOptionViewDetails = 'Xem chi tiết',
    popoverOptionNotSupport = 'Chưa hỗ trợ',
  }

  const [q, setQ] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(rowsPerPageOptionsDefault[0]);
  const [sort, setSort] = useState<string[]>([]);

  const handleNewPage = (params: number) => setPage(params);
  const handleNewSize = (params: number) => setSize(params);

  const [open, setOpen] = useState<boolean>(false);
  const handleTriggerDialog = () => setOpen(!open);

  const [mode, setMode] = useState<'READ' | 'VERIFY' | ''>('');
  const [selectedRow, setSelectedRow] = useState<any>();

  const { error, registerRequestList, isLoading, refetch } =
    useSearchRegisterRequest({ q, status, page, size, sort });
  const rows = registerRequestList ? registerRequestList.items : [];

  const handleSearch = (data: any) => {
    setQ(data.searchValue);
    refetch();
  };

  const handleOpenRegisterRequestDetails = () => {
    handleTriggerDialog();
    setMode(() => 'READ');
  };

  const popoverOptionsDefault: MenuItemPayload[] = [
    {
      icon: 'question',
      title: Text.popoverOptionNotSupport,
      onCLick: () => {},
    },
  ];

  const optionsViewDetails: MenuItemPayload[] = [
    {
      icon: 'category',
      title: Text.popoverOptionViewDetails,
      onCLick: handleOpenRegisterRequestDetails,
    },
  ];

  let popoverOptions;
  let renderColumns;
  switch (status) {
    case MentorProfileStatusType.WAITING:
      popoverOptions = optionsViewDetails;
      renderColumns = columns.managedUserRegisterRequestColumns;
      break;
    case MentorProfileStatusType.STARTING:
      popoverOptions = optionsViewDetails;
      renderColumns = columns.managedUserRegisterRequestColumns;
      break;
    case MentorProfileStatusType.EDITREQUEST:
      popoverOptions = optionsViewDetails;
      renderColumns = columns.managedUserRegisterRequestColumns;
      break;
    case MentorProfileStatusType.REJECTED:
      popoverOptions = optionsViewDetails;
      renderColumns = columns.managedUserRegisterRequestColumns;
      break;
    default:
      popoverOptions = popoverOptionsDefault;
      renderColumns = columns.managedRegisterRequestTmpColumns;
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
          <ManageTableDetailsRegisterRequest
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
        popoverOptions={popoverOptions}
        rowsPerPageOptions={rowsPerPageOptionsDefault}
        setSelectedRow={setSelectedRow}
        totalItems={registerRequestList?.totalItems ?? 0}
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
