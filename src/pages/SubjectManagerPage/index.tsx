import { Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import CustomModal from '~/components/atoms/CustomModal';
import CRUDTable, { MenuItemPayload } from '~/components/molecules/CRUDTable';
import columns from '~/constants/columns';
import CreateSubjectsForm from '~/containers/SubjectsManagerSection/CreateSubjectsForm';
import ReadOneSubject from '~/containers/SubjectsManagerSection/ReadOneSubject';
import UpdateSubjectsForm from '~/containers/SubjectsManagerSection/UpdateSubjectsForm';
import { useDispatchGetAllCategories } from '~/hooks';
import { useCRUDSubjects } from '~/hooks/useCRUDSubjects';
import globalStyles from '~/styles';
import { formatStringToNumber } from '~/utils/number';
import toast from '~/utils/toast';

export default function SubjectManagerPage() {
  const { optionCategories: categories } = useDispatchGetAllCategories();
  const [searchValue, setSearchValue] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<'CREATE' | 'READ' | 'UPDATE' | 'DELETE'>(
    'CREATE'
  );
  const [selectedRow, setSelectedRow] = useState<any>();

  const subjectColumns: GridColDef[] = [
    {
      field: 'code',
      headerAlign: 'left',
      type: 'string',
      headerName: 'Mã môn học',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'name',
      headerAlign: 'left',
      type: 'string',
      headerName: 'Tên môn học',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'categoryId',
      headerAlign: 'left',
      type: 'string',
      headerName: 'Lĩnh vực',
      minWidth: 300,
      flex: 1,
      editable: true,
      valueGetter: (params: any) => {
        return `${
          params.row.categoryIds?.map(
            (item: any) =>
              categories.find((subItem) => subItem.id === item)?.label || ''
          ) || ''
        } `;
      },
    },
  ];

  const {
    addSubjectMutation,
    deleteSubjectMutation,
    error,
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
        name: data.name,
        code: data.code,
        categoryIds: data.categoryId,
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
        name: data.name,
        code: data.code,
        id: selectedRow.id,
        categoryIds: data.categoryIds.map((item: any) =>
          formatStringToNumber(item)
        ),
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
      title: 'Xem chi tiết môn học',
      onCLick: handleOpenDetailSubject,
    },
    {
      icon: 'edit',
      title: 'Cập nhật môn học',
      onCLick: handleUpdateSubject,
    },
    {
      icon: 'delete',
      title: 'Xóa ngôn môn học',
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
          content="Bạn có chắc xóa môn học này ?"
          title="Xác nhận xóa môn học"
          handleClose={handleTriggerModal}
          handleAccept={handleSubmitDeleteSubject}
        />
      );
      break;
    default:
      break;
  }

  return (
    <Stack paddingX={3} paddingY={2}>
      <Typography sx={globalStyles.textTitle}>Quản lí môn học</Typography>
      <Stack marginTop={1} sx={globalStyles.viewRoundedWhiteBody}>
        <CRUDTable
          setSelectedRow={setSelectedRow}
          isLoading={isLoading}
          error={error}
          addItemButtonLabel="Thêm môn học"
          columns={subjectColumns}
          onAdd={handleAddSubject}
          searchPlaceholder="Tìm kiếm ngôn ngữ lập trình"
          onSearch={handleSearchSubject}
          rows={filterRows}
          menuItemList={menuItemList}
        />
        {renderItem}
      </Stack>
    </Stack>
  );
}
