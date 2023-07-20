import { useState } from 'react';
import { ProcessRegisterRequestFormDefault } from '~/models/form';
import { ProcessRegisterRequestPayload } from '~/api/mentorProfile';
import { useManageRegisterRequest } from '~/hooks/useManageRegisterRequest';
import columns from '~/constants/columns';
import CRUDTable, { MenuItemPayload } from '~/components/molecules/CRUDTable';
import ReadOneRegisterRequest from '~/containers/RegisterRequestManageSection/ReadOneRegisterRequest';
import toast from '~/utils/toast';
import CustomDialog from '~/components/atoms/CustomDialog';
import { useGetAllUser } from '~/hooks/user/useGetAllUser';

interface AdminManageUserProps {
  userRole: 'TEACHER' | 'STUDENT';
}

export default function AdminManageUser({ userRole }: AdminManageUserProps) {
  const [searchValue, setSearchValue] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<'READ' | 'VERIFY' | ''>('');
  const [selectedRow, setSelectedRow] = useState<any>();

  // const [status, setStatus] = useState<string>('STARTING');
  const [q, setQ] = useState<string>('');
  // const [role, setRole] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean | ''>('');
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [sort, setSort] = useState<string[]>(['']);

  const { error, userList, isLoading, refetch } = useGetAllUser({
    q,
    role: userRole,
    isVerified,
    page,
    size,
    sort,
  });

  const filterRows = userList.items;

  const handleTriggerModal = () => {
    setOpen(!open);
  };

  const handleSearchRegisterRequest = (data: any) => {
    setSearchValue(data.searchValue);
  };
  const handleOpenDetailRegisterRequest = () => {
    handleTriggerModal();
    setMode(() => 'READ');
  };

  // const toastMsgLoading = 'Đang xử lý...';
  // const toastMsgSuccess = 'Xử lý thành công';
  // const toastMsgError = (errorMsg: any): string =>
  //   `Đã xảy ra lỗi: ${errorMsg.message}`;
  // const handleApproveRegisterRequest = async (
  //   data: ProcessRegisterRequestFormDefault
  // ) => {
  //   const params: ProcessRegisterRequestPayload = {
  //     id: selectedRow.mentorProfile.id,
  //     status: data.status,
  //     message: data.message,
  //   };
  //   const id = toast.loadToast(toastMsgLoading);
  //   try {
  //     await approveRegisterRequestMutation.mutateAsync(params);
  //     refetch();
  //     handleTriggerModal();
  //     toast.updateSuccessToast(id, toastMsgSuccess);
  //   } catch (e: any) {
  //     toast.updateFailedToast(id, toastMsgError(e.message));
  //   }
  // };

  // let renderItem = null;
  // switch (mode) {
  //   case 'READ':
  //     renderItem = (
  //       <CustomDialog open={open} onClose={handleTriggerModal} maxWidth="lg">
  //         <ReadOneRegisterRequest
  //           row={selectedRow}
  //           onSubmit={handleApproveRegisterRequest}
  //         />
  //       </CustomDialog>
  //     );
  //     break;
  //   default:
  //     break;
  // }

  const menuItemListDefault: MenuItemPayload[] = [
    {
      icon: 'question',
      title: 'Chưa hỗ trợ',
      onCLick: () => console.log('Chưa hỗ trợ'),
    },
  ];
  const menuItemListRead: MenuItemPayload[] = [
    {
      icon: 'category',
      title: 'Xem chi tiết',
      onCLick: handleOpenDetailRegisterRequest,
    },
    {
      icon: 'edit',
      title: 'Cập nhật',
      onCLick: () => console.log('Hello'),
    },
  ];
  let menuItemList = null;
  let selectedColumns = columns.userMemberColumns;
  switch (userRole) {
    case 'TEACHER':
      menuItemList = menuItemListRead;
      selectedColumns = columns.userMentorColumns;
      break;
    default:
      menuItemList = menuItemListDefault;
      selectedColumns = columns.userMemberColumns;
      break;
  }

  return (
    <>
      <CRUDTable
        setSelectedRow={setSelectedRow}
        isLoading={isLoading}
        error={error}
        // title="Danh sách người dùng"
        addItemButtonLabel="Thêm môn học"
        columns={selectedColumns}
        // onAdd={}
        searchPlaceholder="Tìm kiếm giáo viên..."
        onSearch={handleSearchRegisterRequest}
        rows={filterRows}
        menuItemList={menuItemList}
      />
      {/* {renderItem} */}
    </>
  );
}
