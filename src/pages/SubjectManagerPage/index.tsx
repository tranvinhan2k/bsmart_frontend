import { Stack } from '@mui/material';
import { useState } from 'react';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import CustomModal from '~/components/atoms/Modal';
import CRUDTable, { MenuItemPayload } from '~/components/molecules/CRUDTable';
import columns from '~/constants/columns';
import CreateSubjectsForm from '~/containers/SubjectsManagerSection/CreateSubjectsForm';
import ReadOneSubject from '~/containers/SubjectsManagerSection/ReadOneSubject';
import UpdateSubjectsForm from '~/containers/SubjectsManagerSection/UpdateSubjectsForm';
import { useQueryGetAllCategories } from '~/hooks';
import { useCRUDSubjects } from '~/hooks/useCRUDSubjects';
import toast from '~/utils/toast';

export default function SubjectManagerPage() {
  const { categories } = useQueryGetAllCategories();
  const [searchValue, setSearchValue] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<'CREATE' | 'READ' | 'UPDATE' | 'DELETE'>(
    'CREATE'
  );
  const [selectedRow, setSelectedRow] = useState<any>();

  const {
    addSubjectMutation,
    deleteSubjectMutation,
    error,
    getOneSubjectMutation,
    isLoading,
    refetch,
    subjects,
    updateSubjectMutation,
  } = useCRUDSubjects();

  const filterRows =
    subjects
      ?.map((item: any) => ({
        ...item,
        categoryId: categories?.find((citem) => citem.id === item.categoryId),
      }))
      .filter((item: any) => {
        if (searchValue) {
          return item.name.toLowerCase().includes(searchValue.toLowerCase());
        }
        return item;
      }) || [];

  const handleTriggerModal = () => {
    setOpen(!open);
  };
  const handleSearchSubject = (data: any) => {
    console.log(data);

    setSearchValue(data.searchValue);
  };
  const handleOpenDetailSubject = () => {
    handleTriggerModal();
    setMode(() => 'READ');
  };
  const handleAddSubject = () => {
    handleTriggerModal();
    setMode(() => 'CREATE');
  };
  const handleUpdateSubject = () => {
    handleTriggerModal();
    setMode(() => 'UPDATE');
  };
  const handleDeleteSubject = () => {
    handleTriggerModal();
    setMode(() => 'DELETE');
  };
  const handleSubmitAddSubject = async (data: any) => {
    const id = toast.loadToast('Đang tạo ngôn ngữ lập trình');
    try {
      await addSubjectMutation.mutateAsync({
        ...data,
        categoryId: data.categoryId.id,
      });
      await refetch();
      handleTriggerModal();
      toast.updateSuccessToast(id, 'Tạo ngôn ngữ lập trình thành công.');
    } catch (e: any) {
      toast.updateFailedToast(
        id,
        `Tạo ngôn ngữ lập trình không thành công: ${e.message}`
      );
    }
  };
  const handleSubmitUpdateSubject = async (data: any) => {
    const id = toast.loadToast('Đang cập nhật ngôn ngữ lập trình');
    try {
      await updateSubjectMutation.mutateAsync({
        ...data,
        id: selectedRow.id,
        categoryId: data.categoryId.id,
      });
      await refetch();
      handleTriggerModal();
      toast.updateSuccessToast(id, 'Cập nhật ngôn ngữ lập trình thành công.');
    } catch (e: any) {
      toast.updateFailedToast(
        id,
        `Cập nhật ngôn ngữ lập trình không thành công: ${e.message}`
      );
    }
  };
  const handleSubmitDeleteSubject = async () => {
    const id = toast.loadToast('Đang xóa ngôn ngữ lập trình');
    try {
      await deleteSubjectMutation.mutateAsync(selectedRow.id);
      await refetch();
      handleTriggerModal();
      toast.updateSuccessToast(id, 'Xóa ngôn ngữ lập trình thành công.');
    } catch (e: any) {
      toast.updateFailedToast(
        id,
        `Xóa ngôn ngữ lập trình không thành công: ${e.message}`
      );
    }
  };

  const menuItemList: MenuItemPayload[] = [
    {
      icon: 'subject',
      title: 'Xem chi tiết ngôn ngữ lập trình',
      onCLick: handleOpenDetailSubject,
    },
    {
      icon: 'edit',
      title: 'Cập nhật ngôn ngữ lập trình',
      onCLick: handleUpdateSubject,
    },
    {
      icon: 'delete',
      title: 'Xóa ngôn ngữ lập trình',
      onCLick: handleDeleteSubject,
    },
  ];

  let renderItem = null;
  switch (mode) {
    case 'CREATE':
      renderItem = (
        <CustomModal open={open} onClose={handleTriggerModal}>
          <CreateSubjectsForm onSubmit={handleSubmitAddSubject} />
        </CustomModal>
      );
      break;
    case 'READ':
      renderItem = (
        <CustomModal open={open} onClose={handleTriggerModal}>
          <ReadOneSubject row={selectedRow} />
        </CustomModal>
      );
      break;
    case 'UPDATE':
      renderItem = (
        <CustomModal open={open} onClose={handleTriggerModal}>
          <UpdateSubjectsForm
            row={selectedRow}
            onSubmit={handleSubmitUpdateSubject}
          />
        </CustomModal>
      );
      break;
    case 'DELETE':
      renderItem = (
        <ConfirmDialog
          open={open}
          content="Bạn có chắc xóa ngôn ngữ lập trình này ?"
          title="Xác nhận xóa ngôn ngữ lập trình"
          handleClose={handleTriggerModal}
          handleAccept={handleSubmitDeleteSubject}
        />
      );
      break;
    default:
      break;
  }

  return (
    <Stack padding={2}>
      <CRUDTable
        setSelectedRow={setSelectedRow}
        isLoading={isLoading}
        error={error}
        title="Quản lí ngôn ngữ lập trình"
        addItemButtonLabel="Thêm ngôn ngữ lập trình"
        columns={columns.subjectColumns}
        onAdd={handleAddSubject}
        searchPlaceholder="Tìm kiếm ngôn ngữ lập trình"
        onSearch={handleSearchSubject}
        rows={filterRows}
        menuItemList={menuItemList}
      />
      {renderItem}
    </Stack>
  );
}
