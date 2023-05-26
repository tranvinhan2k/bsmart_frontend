import { useState } from 'react';

import { Stack } from '@mui/material';

import CRUDTable, {
  MenuItemPayload,
  SearchFilterFormInput,
} from '~/components/molecules/CRUDTable';
import CustomModal from '~/components/atoms/Modal';

import columns from '~/constants/columns';

import { useQueryGetAllCategories, useQueryGetAllSubjects } from '~/hooks';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import { CRUDModes } from '~/models/variables';
import { useCRUDTemplate } from '~/hooks/useCRUDTemplate';
import CreateTemplateForm from './CreateTemplateForm';
import toast from '~/utils/toast';
import ReadOneTemplateForm from './ReadOneTemplateForm';
import UpdateTemplateForm from './UpdateTemplateForm';

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
  } = useCRUDTemplate();
  const { subjects } = useQueryGetAllSubjects();
  const { categories } = useQueryGetAllCategories();
  const rows = [
    {
      id: 1,
      templateName: 'Đánh giá các môn Toán',
      numberOfQuestion: 5,
    },
    {
      id: 2,
      templateName: 'Đánh giá các môn Ngữ Văn',
      numberOfQuestion: 5,
    },
    {
      id: 3,
      templateName: 'Đánh giá các môn Tiếng Anh',
      numberOfQuestion: 5,
    },
    {
      id: 4,
      templateName: 'Đánh giá các môn Địa Lí',
      numberOfQuestion: 5,
    },
    {
      id: 5,
      templateName: 'Đánh giá các môn Sinh Học',
      numberOfQuestion: 5,
    },
    {
      id: 6,
      templateName: 'Đánh giá các môn GDCD',
      numberOfQuestion: 5,
    },
    {
      id: 7,
      templateName: 'Đánh giá các môn Tiếng Pháp',
      numberOfQuestion: 5,
    },
  ];

  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<CRUDModes>('CREATE');
  const [row, setRow] = useState<any>();

  const handleClose = (chooseMode?: CRUDModes) => {
    console.log(open);

    setOpen(!open);
    if (chooseMode) {
      setMode(() => chooseMode);
    }
  };

  const handleSearchValue = (searchData: string) => {
    console.log('search data', searchData);
  };

  const handleAddTemplate = async (data: any) => {
    console.log(data);

    const tmpData = {
      templateName: data.templateName,
      questionList: data.questionList.map((item: any) => item.question.id),
      feedbackType: data.feedbackType.value,
      permission: data.permission.value,
    };
    const id = toast.loadToast('Đang thêm bản mẫu mới');
    try {
      await addTemplateMutation.mutateAsync(tmpData as any);
      toast.updateSuccessToast(id, 'Thên bản mẫu mới thành công');
      handleClose();
    } catch (e: any) {
      toast.updateFailedToast(id, 'Thên bản mẫu mới bị lỗi');
    }
  };
  const handleUpdateTemplate = async (data: any) => {
    console.log(data);

    const tmpData = {
      templateName: data.templateName,
      questionList: data.questionList.map((item: any) => item.question.id),
      feedbackType: data.feedbackType.value,
      permission: data.permission.value,
    };
    const id = toast.loadToast('Đang cập nhật bản mẫu');
    try {
      await updateTemplateMutation.mutateAsync(tmpData as any);
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
      toast.updateSuccessToast(id, 'Đã xóa thành công bản mẫu');
    } catch (e: any) {
      toast.updateFailedToast(id, `Xóa bản mẫu không thành công: ${e.message}`);
    }
  };

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

  const searchFilterFormInputList: SearchFilterFormInput[] = [
    {
      name: 'subject',
      placeholder: 'Môn học',
      variant: 'dropdown',
      data: subjects || [],
    },
    {
      name: 'category',
      placeholder: 'Ngôn ngữ',
      variant: 'dropdown',
      data: categories || [],
    },
  ];

  return (
    <Stack>
      <CRUDTable
        title={texts.title}
        columns={columns.templateColumns}
        rows={templates}
        addItemButtonLabel={texts.addItemLabel}
        onAdd={() => handleClose('CREATE')}
        menuItemList={menuItemList}
        searchPlaceholder={texts.searchTemplatePlaceholder}
        searchFilterFormInputList={searchFilterFormInputList}
        onSearch={handleSearchValue}
        error={error}
        isLoading={isLoading}
        setSelectedRow={setRow}
      />
      {renderModal}
    </Stack>
  );
}
