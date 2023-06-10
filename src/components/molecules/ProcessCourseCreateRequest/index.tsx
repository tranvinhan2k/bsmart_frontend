import { useState } from 'react';
import { useManageCourseCreateRequest } from '~/hooks/useManageCourseCreateRequest';
import columns from '~/constants/columns';
import CRUDTable, { MenuItemPayload } from '~/components/molecules/CRUDTable';
import CustomModal from '~/components/atoms/CustomModal';
import ReadOneCreateCourseRequest from '~/containers/CreateCourseRequestManageSection/ReadOneCreateCourseRequest';
import toast from '~/utils/toast';
import { ProcessCreateCourseRequestFormDefault } from '~/models/form';
import { ProcessCreateCourseRequestPayload } from '~/api/courses';

interface ProcessCourseCreateRequestProps {
  status:
    | 'WAITING'
    | 'REQUESTING'
    | 'NOTSTART'
    | 'STARTING'
    | 'EDITREQUEST'
    | 'REJECTED';
}

export default function ProcessCourseCreateRequest({
  status,
}: ProcessCourseCreateRequestProps) {
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
    courseCreateRequest,
    isLoading,
    refetch,
    approveCourseCreateRequestMutation,
  } = useManageCourseCreateRequest({ status, q, size, sort });

  const filterRows =
    courseCreateRequest?.filter((item: any) => {
      if (searchValue) {
        return item?.name?.toLowerCase().includes(searchValue.toLowerCase());
      }
      return item;
    }) || [];

  const handleTriggerModal = () => {
    setOpen(!open);
  };

  const handleSearchCourseCreateRequest = (data: any) => {
    setSearchValue(data.searchValue);
  };
  const handleOpenDetailCourseCreateRequest = () => {
    handleTriggerModal();
    setMode(() => 'READ');
  };

  const toastMsgLoading = 'Đang xử lý...';
  const toastMsgSuccess = 'Xử lý thành công';
  const toastMsgError = (errorMsg: any): string => {
    return `Đã xảy ra lỗi: ${errorMsg.message}`;
  };
  const handleApproveCourseCreateRequest = async (
    data: ProcessCreateCourseRequestFormDefault
  ) => {
    const params: ProcessCreateCourseRequestPayload = {
      id: data.id,
      status: data.status,
      message: data.message,
    };
    const id = toast.loadToast(toastMsgLoading);
    try {
      await approveCourseCreateRequestMutation.mutateAsync(params);
      refetch();
      handleTriggerModal();
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (e: any) {
      toast.updateFailedToast(id, toastMsgError(e.message));
    }
  };

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
      onCLick: handleOpenDetailCourseCreateRequest,
    },
    {
      icon: 'edit',
      title: 'Cập nhật',
      onCLick: () => console.log('Hello'),
    },
  ];
  let menuItemList = null;
  switch (status) {
    case 'WAITING':
      menuItemList = menuItemListRead;
      break;
    default:
      menuItemList = menuItemListDefault;
      break;
  }

  let renderItem = null;
  switch (mode) {
    case 'READ':
      renderItem = (
        <CustomModal open={open} onClose={handleTriggerModal} maxWidth="lg">
          <ReadOneCreateCourseRequest
            row={selectedRow}
            onSubmit={handleApproveCourseCreateRequest}
          />
        </CustomModal>
      );
      break;
    default:
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
        columns={columns.courseCreateRequestColumns}
        // onAdd={}
        searchPlaceholder="Tìm kiếm môn học"
        onSearch={handleSearchCourseCreateRequest}
        rows={filterRows}
        menuItemList={menuItemList}
        //
        getRowId={(row: any) => row?.subCourseId}
      />
      {renderItem}
    </>
  );
}
