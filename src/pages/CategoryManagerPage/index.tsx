import { Stack } from '@mui/material';
import { useState } from 'react';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import CustomModal from '~/components/atoms/CustomModal';
import CRUDTable, { MenuItemPayload } from '~/components/molecules/CRUDTable';
import columns from '~/constants/columns';
import CreateCategoriesForm from '~/containers/CategoriesManagerSection/CreateCategoriesForm';
import ReadOneCategory from '~/containers/CategoriesManagerSection/ReadOneCategory';
import UpdateCategoriesForm from '~/containers/CategoriesManagerSection/UpdateCategoriesForm';
import { useCRUDCategories } from '~/hooks/useCRUDCategories';
import toast from '~/utils/toast';

export default function CategoryManagerPage() {
  const [searchValue, setSearchValue] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<'CREATE' | 'READ' | 'UPDATE' | 'DELETE'>(
    'CREATE'
  );
  const [selectedRow, setSelectedRow] = useState<any>();

  const {
    error,
    categories,
    isLoading,
    refetch,
    addCategoryMutation,
    deleteCategoryMutation,
    getOneCategoryMutation,
    updateCategoryMutation,
  } = useCRUDCategories();

  const filterRows =
    categories?.filter((item) => {
      if (searchValue) {
        return item?.name?.toLowerCase().includes(searchValue.toLowerCase());
      }
      return item;
    }) || [];

  const handleTriggerModal = () => {
    setOpen(!open);
  };
  const handleSearchCategory = (data: any) => {
    console.log(data);

    setSearchValue(data.searchValue);
  };
  const handleOpenDetailCategory = () => {
    handleTriggerModal();
    setMode(() => 'READ');
  };
  const handleAddCategory = () => {
    handleTriggerModal();
    setMode(() => 'CREATE');
  };
  const handleUpdateCategory = () => {
    handleTriggerModal();
    setMode(() => 'UPDATE');
  };
  const handleDeleteCategory = () => {
    handleTriggerModal();
    setMode(() => 'DELETE');
  };
  const handleSubmitAddCategory = async (data: any) => {
    const id = toast.loadToast('Đang tạo môn học');
    try {
      await addCategoryMutation.mutateAsync(data);
      await refetch();
      handleTriggerModal();
      toast.updateSuccessToast(id, 'Tạo môn học thành công.');
    } catch (e: any) {
      toast.updateFailedToast(id, `Tạo môn học không thành công: ${e.message}`);
    }
  };
  const handleSubmitUpdateCategory = async (data: any) => {
    const id = toast.loadToast('Đang cập nhật môn học');
    try {
      await updateCategoryMutation.mutateAsync({ ...data, id: selectedRow.id });
      await refetch();
      handleTriggerModal();
      toast.updateSuccessToast(id, 'Cập nhật môn học thành công.');
    } catch (e: any) {
      toast.updateFailedToast(
        id,
        `Cập nhật môn học không thành công: ${e.message}`
      );
    }
  };
  const handleSubmitDeleteCategory = async () => {
    const id = toast.loadToast('Đang xóa môn học');
    try {
      await deleteCategoryMutation.mutateAsync(selectedRow.id);
      await refetch();
      handleTriggerModal();
      toast.updateSuccessToast(id, 'Xóa môn học thành công.');
    } catch (e: any) {
      toast.updateFailedToast(id, `Xóa môn học không thành công: ${e.message}`);
    }
  };

  const menuItemList: MenuItemPayload[] = [
    {
      icon: 'category',
      title: 'Xem chi tiết lĩnh vực',
      onCLick: handleOpenDetailCategory,
    },
    {
      icon: 'edit',
      title: 'Cập nhật lĩnh vực',
      onCLick: handleUpdateCategory,
    },
    {
      icon: 'delete',
      title: 'Xóa lĩnh vực',
      onCLick: handleDeleteCategory,
    },
  ];

  let renderItem = null;
  switch (mode) {
    case 'CREATE':
      renderItem = (
        <CustomModal open={open} onClose={handleTriggerModal}>
          <CreateCategoriesForm onSubmit={handleSubmitAddCategory} />
        </CustomModal>
      );
      break;
    case 'READ':
      renderItem = (
        <CustomModal open={open} onClose={handleTriggerModal}>
          <ReadOneCategory row={selectedRow} />
        </CustomModal>
      );
      break;
    case 'UPDATE':
      renderItem = (
        <CustomModal open={open} onClose={handleTriggerModal}>
          <UpdateCategoriesForm
            row={selectedRow}
            onSubmit={handleSubmitUpdateCategory}
          />
        </CustomModal>
      );
      break;
    case 'DELETE':
      renderItem = (
        <ConfirmDialog
          open={open}
          content="Bạn có chắc xóa môn học này ?"
          title="Xác nhận xóa môn học"
          handleClose={handleTriggerModal}
          handleAccept={handleSubmitDeleteCategory}
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
        title="Quản lí lĩnh vực"
        addItemButtonLabel="Thêm lĩnh vực"
        columns={columns.categoryColumns}
        onAdd={handleAddCategory}
        searchPlaceholder="Tìm kiếm môn học"
        onSearch={handleSearchCategory}
        rows={filterRows}
        menuItemList={menuItemList}
      />
      {renderItem}
    </Stack>
  );
}
