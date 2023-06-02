import { useState } from 'react';
import { useManageRegisterRequest } from '~/hooks/useManageRegisterRequest';
import columns from '~/constants/columns';
import CRUDTable, { MenuItemPayload } from '~/components/molecules/CRUDTable';
import CustomModal from '~/components/atoms/Modal';
import ReadOneRegisterRequest from '~/containers/RegisterRequestManageSection/ReadOneRegisterRequest';
import toast from '~/utils/toast';

interface ProcessRegisterRequestPayload {
  status: 'REQUESTING' | 'STARTING' | 'EDITREQUEST' | 'REJECTED';
}

export default function ProcessRegisterRequest({
  status,
}: ProcessRegisterRequestPayload) {
  const menuItemListDefault: MenuItemPayload[] = [
    {
      icon: 'question',
      title: 'Chưa hỗ trợ',
      onCLick: () => console.log('Chưa hỗ trợ'),
    },
  ];

  const [searchValue, setSearchValue] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<'READ' | 'VERIFY' | ''>('');
  const [selectedRow, setSelectedRow] = useState<any>();

  // const [status, setStatus] = useState<string>('STARTING');
  const [q, setQ] = useState<string>('');
  const [size, setSize] = useState<number>(10);
  const [sort, setSort] = useState<string>('');

  const {
    error,
    registerRequest,
    isLoading,
    refetch,
    verifyRegisterRequestMutation,
  } = useManageRegisterRequest({ status, q, size, sort });

  const filterRows =
    registerRequest?.filter((item: any) => {
      if (searchValue) {
        return item?.name?.toLowerCase().includes(searchValue.toLowerCase());
      }
      return item;
    }) || [];

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

  const toastMsgLoading = 'Đang phê duyệt ...';
  const toastMsgSuccess = 'Phê duyệt thành công';
  const toastMsgError = (errorMsg: any): string => {
    return `Cập nhật không thành công: ${errorMsg.message}`;
  };
  const handleVerifyRegisterRequest = async () => {
    const id = toast.loadToast(toastMsgLoading);
    try {
      await verifyRegisterRequestMutation.mutateAsync(
        selectedRow.mentorProfile.id
      );
      refetch();
      handleTriggerModal();
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (e: any) {
      toast.updateFailedToast(id, toastMsgError(e.message));
    }
  };

  let renderItem = null;
  let menuItemList = null;
  switch (mode) {
    case 'READ':
      renderItem = (
        <CustomModal open={open} onClose={handleTriggerModal} maxWidth="lg">
          <ReadOneRegisterRequest
            row={selectedRow}
            onSubmit={handleVerifyRegisterRequest}
          />
        </CustomModal>
      );
      break;
    default:
      break;
  }
  switch (status) {
    case 'REQUESTING':
      menuItemList = menuItemListRead;
      break;
    default:
      menuItemList = menuItemListDefault;
      break;
  }

  return (
    <>
      <CRUDTable
        setSelectedRow={setSelectedRow}
        isLoading={isLoading}
        error={error}
        title="Phê duyệt yêu cầu tạo tài khoản giáo viên"
        addItemButtonLabel="Thêm môn học"
        columns={columns.registerRequestColumns}
        // onAdd={}
        searchPlaceholder="Tìm kiếm môn học"
        onSearch={handleSearchRegisterRequest}
        rows={filterRows}
        menuItemList={menuItemList}
      />
      {renderItem}
    </>
  );
}
