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

const texts = {
  title: 'Quản lí bản mẫu',
  addItemLabel: 'Thêm bản mẫu',
  searchTemplatePlaceholder: 'Tìm kiếm bản mẫu',
};

export default function FeedbackManagerTemplate() {
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

  const template = {
    name: 'Đánh giá học sinh môn Toán',
    questions: [
      {
        id: 0,
        question: 'Con gà hay quả trứng có trước ?',
        answer: 'ai tới trc cũng được, nhưng mày không bao giờ tới trước',
      },
      {
        id: 0,
        question: 'Con gà hay quả trứng có trước ?',
        answer: 'ai tới trc cũng được, nhưng mày không bao giờ tới trước',
      },
    ],
  };

  let renderModal = null;
  switch (mode) {
    case 'CREATE':
      renderModal = (
        <CustomModal open={open} onClose={handleClose}>
          Create
        </CustomModal>
      );
      break;
    case 'READ':
      renderModal = (
        <CustomModal open={open} onClose={handleClose}>
          <CRUDTable
            columns={columns.feedbackQuestionColumns}
            rows={[
              { id: 0, name: 'Câu hỏi về giáo viên 1' },
              { id: 1, name: 'Câu hỏi về giáo viên 2' },
              { id: 2, name: 'Câu hỏi về giáo viên 3' },
              { id: 3, name: 'Câu hỏi về giáo viên 4' },
            ]}
            menuItemList={[
              {
                icon: 'search',
                title: 'Xem chi tiết câu hỏi',
                onCLick: () => {},
              },
            ]}
            onSearch={(searchData: any) => {
              console.log(searchData);
            }}
            searchFilterFormInputList={[
              {
                name: 'subject',
                placeholder: 'Thêm môn học mới',
                variant: 'dropdown',
                data: [{ id: 0, label: '', value: '', categoryId: 0 }],
              },
            ]}
            addItemButtonLabel="Thêm câu hỏi vào bản mẫu"
            onAdd={() => {}}
            searchPlaceholder="Tìm câu hỏi"
            title={template.name}
          />
        </CustomModal>
      );
      break;
    case 'UPDATE':
      renderModal = (
        <CustomModal open={open} onClose={handleClose}>
          Update
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
          handleAccept={() => {}}
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
        rows={rows}
        addItemButtonLabel={texts.addItemLabel}
        onAdd={() => handleClose('CREATE')}
        menuItemList={menuItemList}
        searchPlaceholder={texts.searchTemplatePlaceholder}
        searchFilterFormInputList={searchFilterFormInputList}
        onSearch={handleSearchValue}
      />
      {renderModal}
    </Stack>
  );
}
