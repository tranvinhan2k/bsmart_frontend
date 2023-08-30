import { useState } from 'react';
import CustomDialog from '~/components/atoms/CustomDialog';
import ManageTable, {
  MenuItemPayload,
} from '~/components/molecules/ManageTable';
import { MentorProfileUpdateStatusType } from '~/constants/profile';
import { rowsPerPageOptionsDefault } from '~/constants/dataGrid';
import { useSearchMentorProfileUpdateRequest } from '~/hooks/user/useSearchMentorProfileUpdateRequest';
import columns from '~/constants/columns';
import ManageTableDetailsUpdateMentorProfileRequest from '../ManageTableDetailsUpdateMentorProfileRequest';

interface ManageTableMentorProfileUpdateRequestProps {
  status: MentorProfileUpdateStatusType;
  refetchGetNoOfRequest: () => void;
}

export default function ManageTableMentorProfileUpdateRequest({
  status,
  refetchGetNoOfRequest,
}: ManageTableMentorProfileUpdateRequestProps) {
  const enum Text {
    searchPlaceholder = 'Tìm kiếm yêu cầu...',
    popoverOptionViewDetails = 'Xem chi tiết',
    popoverOptionNotSupport = 'Chưa hỗ trợ',
  }

  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<'READ' | 'VERIFY' | ''>('');
  const [selectedRow, setSelectedRow] = useState<any>();

  // const [status, setStatus] = useState<string>('STARTING');
  const [q, setQ] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(rowsPerPageOptionsDefault[0]);
  const [sort, setSort] = useState<string[]>(['created,desc']);

  const handleNewPage = (params: number) => setPage(params);
  const handleNewSize = (params: number) => setSize(params);
  const handleTriggerDialog = () => setOpen(!open);

  const { error, mentorProfileUpdateRequestList, isLoading, refetch } =
    useSearchMentorProfileUpdateRequest({ status, q, page, size, sort });
  const rows = mentorProfileUpdateRequestList
    ? mentorProfileUpdateRequestList.items
    : [];

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
  switch (status) {
    case MentorProfileUpdateStatusType.PENDING:
      popoverOptions = optionsViewDetails;
      break;
    default:
      popoverOptions = popoverOptionsDefault;
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
          <ManageTableDetailsUpdateMentorProfileRequest
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
        columns={columns.managedMentorProfileUpdateRequestColumns}
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
        totalItems={mentorProfileUpdateRequestList?.totalItems ?? 0}
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
