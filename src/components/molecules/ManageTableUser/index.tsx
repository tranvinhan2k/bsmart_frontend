import { useState } from 'react';
import { MenuItemPayload } from '~/components/molecules/CRUDTable';
import { rowsPerPageOptionsDefault } from '~/constants/dataGrid';
import { useSearchManagedUser } from '~/hooks/user/useSearchManagedUser';
import columns from '~/constants/columns';
import CustomDialog from '~/components/atoms/CustomDialog';
import ManageTable from '~/components/molecules/ManageTable';
import ManageTableDetailsManagedMember from '~/components/molecules/ManageTableDetailsManagedMember';
import ManageTableDetailsManagedMentor from '~/components/molecules/ManageTableDetailsManagedMentor';
import { ManagedMentorPayload } from '~/models/type';
import CustomModal from '~/components/atoms/CustomModal';

interface ManageTableUserProps {
  userRole: 'TEACHER' | 'STUDENT';
  refetchGetNoOfRequest: () => void;
}

export default function ManageTableUser({
  userRole,
  refetchGetNoOfRequest,
}: ManageTableUserProps) {
  const enum Text {
    searchPlaceholderMentor = 'Tìm kiếm giáo viên...',
    searchPlaceholderMember = 'Tìm kiếm học sinh...',
    optionNotSupport = 'Chưa hỗ trợ',
    optionViewDetails = 'Xem chi tiết',
    optionViewRevenue = 'Xem doanh thu',
  }
  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<'READ' | 'REVENUE' | ''>('');
  const [selectedRow, setSelectedRow] = useState<ManagedMentorPayload>();

  const [q, setQ] = useState<string>('');
  const isVerified = true;

  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(rowsPerPageOptionsDefault[0]);
  const [sort, setSort] = useState<string[]>([]);
  const handleNewPage = (params: number) => setPage(params);
  const handleNewSize = (params: number) => setSize(params);
  const handleTriggerDialog = () => setOpen(!open);

  const { managedUserList, error, isLoading, refetch } = useSearchManagedUser({
    q,
    role: userRole,
    isVerified,
    page,
    size,
    sort,
  });
  const rows = managedUserList ? managedUserList.items : [];

  const handleSearch = (data: any) => {
    setQ(data.searchValue);
    refetch();
  };

  const handleOpenManagedUserDetails = () => {
    handleTriggerDialog();
    setMode(() => 'READ');
  };
  const handleOpenManageRevenue = () => {
    handleTriggerDialog();
    setMode(() => 'REVENUE');
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
      onCLick: handleOpenManagedUserDetails,
    },
    {
      icon: 'biMoney',
      title: Text.optionViewRevenue,
      onCLick: handleOpenManageRevenue,
    },
  ];

  let renderOptions;
  let renderColumns;
  let renderSearchPlaceholder;
  switch (userRole) {
    case 'TEACHER':
      renderOptions = optionListViewDetails;
      renderColumns = columns.managedUserMentorColumns;
      renderSearchPlaceholder = Text.searchPlaceholderMentor;
      break;
    case 'STUDENT':
      renderOptions = optionListViewDetails;
      renderColumns = columns.managedUserMemberColumns;
      renderSearchPlaceholder = Text.searchPlaceholderMember;
      break;
    default:
      renderOptions = optionListDefault;
      renderColumns = columns.managedUserMentorColumns;
      renderSearchPlaceholder = Text.searchPlaceholderMentor;
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
          {userRole === 'TEACHER' ? (
            <ManageTableDetailsManagedMentor
              rowId={selectedRow && selectedRow.id}
              onClose={handleTriggerDialog}
              refetchSearch={refetch}
              refetchGetNoOfRequest={refetchGetNoOfRequest}
            />
          ) : (
            <ManageTableDetailsManagedMember
              rowId={selectedRow && selectedRow.id}
              onClose={handleTriggerDialog}
              refetchSearch={refetch}
              refetchGetNoOfRequest={refetchGetNoOfRequest}
            />
          )}
        </CustomDialog>
      );
      break;
    case 'REVENUE':
      renderItem = (
        <CustomModal
          open={open}
          onClose={handleTriggerDialog}
          title="Doanh thu của người dùng"
        >
          Doanh Thu
        </CustomModal>
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
        totalItems={managedUserList?.totalItems ?? 0}
        searchHandler={{
          searchPlaceholder: renderSearchPlaceholder,
          onSearch: handleSearch,
        }}
        hideFooterSelectedRowCount
      />
      {renderItem}
    </>
  );
}
