import { useState } from 'react';

import { Stack, Switch } from '@mui/material';

import { GridColDef } from '@mui/x-data-grid';
import CRUDTable, { MenuItemPayload } from '~/components/molecules/CRUDTable';

import columns from '~/constants/columns';

import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import { CRUDModes } from '~/models/variables';
import { useCRUDTemplate } from '~/hooks/useCRUDTemplate';
import CreateTemplateForm from './CreateTemplateForm';
import toast from '~/utils/toast';
import ReadOneTemplateForm from './ReadOneTemplateForm';
import UpdateTemplateForm from './UpdateTemplateForm';
import CustomModal from '~/components/atoms/CustomModal';
import { CreateFeedbackPayload } from '~/models';
import { FeedbackQuestionPayload } from '~/components/atoms/FormInput/FeedbackQuestionInput';
import { useGetIdFromUrl } from '~/hooks';

const texts = {
  title: 'Quản lí bản mẫu',
  addItemLabel: 'Thêm bản mẫu',
  searchTemplatePlaceholder: 'Tìm kiếm bản mẫu',
};

export default function FeedbackManagerTemplate() {
  const {
    addTemplateMutation,
    deleteTemplateMutation,
    updateTemplateMutation,
    error,
    templates,
    isLoading,
    refetch,
    handleChangeDefaultValue,
    handleTryCatchChangeDefaultValue,
  } = useCRUDTemplate();

  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<CRUDModes>('CREATE');
  const [row, setRow] = useState<any>();

  const handleClose = (chooseMode?: CRUDModes) => {
    setOpen(!open);
    if (chooseMode) {
      setMode(() => chooseMode);
    }
  };

  const handleChangeDefault = async (id: number) => {
    await handleTryCatchChangeDefaultValue(async () =>
      handleChangeDefaultValue(id)
    );
    await refetch();
  };

  const handleSearchValue = (searchData: string) => {
    console.log('search data', searchData);
  };

  const handleAddTemplate = async (data: any) => {
    console.log('data', data);

    const tmpData: CreateFeedbackPayload = {
      name: data.name,
      type: data.type.value,
      questions: data.questions.map((item: FeedbackQuestionPayload) => ({
        question: item.question,
        type: item.answerType,
        answers: item.answers,
      })),
    };
    const id = toast.loadToast('Đang thêm bản mẫu mới');
    try {
      await addTemplateMutation.mutateAsync(tmpData as any);
      await refetch();
      toast.updateSuccessToast(id, 'Thên bản mẫu mới thành công');
      handleClose();
    } catch (e: any) {
      toast.updateFailedToast(id, `Thên bản mẫu mới bị lỗi: ${e.message}`);
    }
  };
  const handleUpdateTemplate = async (data: any) => {
    const tmpData: CreateFeedbackPayload = {
      name: data.name,
      type: data.type.value,
      questions: data.questions.map((item: FeedbackQuestionPayload) => ({
        question: item.question,
        type: item.answerType,
        answers: item.answers,
      })),
    };
    const id = toast.loadToast('Đang cập nhật bản mẫu');
    try {
      await updateTemplateMutation.mutateAsync(tmpData as any);
      await refetch();

      toast.updateSuccessToast(id, 'Cập nhẩt bản mẫu mới thành công');
      handleClose();
    } catch (e: any) {
      toast.updateFailedToast(id, `Cập nhật bản mẫu mới bị lỗi: ${e.message}`);
    }
  };

  const handleDelete = async () => {
    const id = toast.loadToast('Đang xóa bản mẫu..');
    try {
      await deleteTemplateMutation.mutateAsync(row.id);
      await refetch();

      handleClose();
      toast.updateSuccessToast(id, 'Đã xóa thành công bản mẫu');
    } catch (e: any) {
      toast.updateFailedToast(id, `Xóa bản mẫu không thành công: ${e.message}`);
    }
  };
  const templateColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Tên bản mẫu',
      flex: 5,
      editable: true,
    },
    {
      field: 'isFixed',
      headerName: 'Trạng thái bản mẫu',
      width: 150,
      renderCell: (params: any) => {
        return params.row.isFixed ? 'Đã khóa' : 'Cho phép chỉnh sửa ';
      },
    },
    {
      field: 'totalClassUsed',
      headerName: 'Tổng cộng lớp đã chọn',
      width: 200,
      renderCell: (params: any) => {
        return 3;
      },
    },
    {
      field: 'isDefault',
      headerName: 'Bản mẫu mặc định',
      width: 150,
      renderCell: (params: any) => {
        return (
          <Switch
            checked={params.row.isDefault}
            onChange={() => handleChangeDefault(params.row.id)}
          />
        );
      },
    },
    {
      field: 'questions',
      headerName: 'Số lượng câu hỏi',
      width: 150,
      editable: true,
      valueGetter: (params: any) => {
        return `${params?.row?.questions?.length || 'Chưa thêm câu hỏi'} `;
      },
    },
  ];
  let renderModal = null;
  switch (mode) {
    case 'CREATE':
      renderModal = (
        <CustomModal open={open} onClose={handleClose}>
          <CreateTemplateForm onSubmit={handleAddTemplate} />
        </CustomModal>
      );
      break;
    case 'READ':
      renderModal = (
        <CustomModal open={open} onClose={handleClose}>
          <ReadOneTemplateForm row={row} />
        </CustomModal>
      );
      break;
    case 'UPDATE':
      renderModal = (
        <CustomModal open={open} onClose={handleClose}>
          <UpdateTemplateForm row={row} onSubmit={handleUpdateTemplate} />
        </CustomModal>
      );
      break;
    default:
      renderModal = (
        <ConfirmDialog
          open={open}
          title="Xác nhận xóa bản mẫu"
          content="Bạn có thực sự muốn xóa bản mẫu này ?"
          handleClose={handleClose}
          handleAccept={handleDelete}
        />
      );
  }

  const menuItemList: MenuItemPayload[] = [
    {
      icon: 'search',
      title: 'Xem chi tiết bản mẫu',
      onCLick: () => handleClose('READ'),
    },
    {
      icon: 'modeEdit',
      title: 'Cập nhật bản mẫu',
      onCLick: () => handleClose('UPDATE'),
    },
    {
      icon: 'delete',
      title: 'Xóa bản mẫu',
      onCLick: () => handleClose('DELETE'),
    },
  ];

  return (
    <Stack>
      <CRUDTable
        title={texts.title}
        columns={templateColumns}
        rows={templates?.items || []}
        addItemButtonLabel={texts.addItemLabel}
        onAdd={() => handleClose('CREATE')}
        menuItemList={menuItemList}
        searchPlaceholder={texts.searchTemplatePlaceholder}
        onSearch={handleSearchValue}
        error={error}
        isLoading={isLoading}
        setSelectedRow={setRow}
      />
      {renderModal}
    </Stack>
  );
}
