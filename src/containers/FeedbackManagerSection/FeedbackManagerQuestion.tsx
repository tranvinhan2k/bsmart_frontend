import { useState } from 'react';

import { Stack } from '@mui/material';

import CRUDTable, { MenuItemPayload } from '~/components/molecules/CRUDTable';
import CustomModal from '~/components/atoms/CustomModal';

import columns from '~/constants/columns';

import { useQueryGetAllCategories } from '~/hooks';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import { CRUDModes } from '~/models/variables';
import { useCRUDFeedbackQuestion } from '~/hooks/useCRUDFeedbackQuestion';
import CreateFeedbackQuestionForm from './CreateFeedbackQuestionForm';
import toast from '~/utils/toast';
import ReadOneFeedbackQuestion from './ReadOneFeedbackQuestion';
import UpdateFeedbackQuestionForm from './UpdateFeedbackQuestionForm';
import { QuestionTypeOptionList } from '~/constants';

const texts = {
  title: 'Quản lí câu hỏi',
  addItemLabel: 'Thêm câu hỏi',
  searchTemplatePlaceholder: 'Tìm kiếm câu hỏi',
};

export default function FeedbackManagerQuestion() {
  const {
    addFeedbackQuestionMutation,
    deleteFeedbackQuestionMutation,
    error,
    feedbackQuestions,
    isLoading,
  } = useCRUDFeedbackQuestion();

  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<CRUDModes>('CREATE');
  const [row, setSelectedRow] = useState<any>();
  const [searchValue, setSearchValue] = useState<string>('');

  const filterFeedbackQuestion =
    feedbackQuestions
      ?.filter((item: any) => {
        if (searchValue !== '') {
          return item?.question
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        }
        return true;
      })
      .map((item: any) => ({
        ...item,
        questionType: QuestionTypeOptionList.find(
          (qItem) => qItem.value === item.questionType
        ),
      })) || [];

  const handleClose = (chooseMode?: CRUDModes) => {
    console.log(open);

    setOpen(!open);
    if (chooseMode) {
      setMode(() => chooseMode);
    }
  };

  const handleAddFeedbackQuestion = async (data: any) => {
    const id = toast.loadToast('Đang thêm câu hỏi đánh giá');

    try {
      const hashMap: { [key: string]: number } = {};
      if (data.possibleAnswer) {
        data.possibleAnswer.map((item: any) => {
          hashMap[item.label] = item.point;
          return null;
        });
      }

      await addFeedbackQuestionMutation.mutateAsync(
        data.possibleAnswer
          ? {
              ...data,
              possibleAnswer: hashMap,
              questionType: data.questionType.value,
            }
          : {
              ...data,
              questionType: data.questionType.value,
            }
      );
      handleClose();
      toast.updateSuccessToast(id, 'Thêm câu hỏi thành công');
    } catch (e: any) {
      toast.updateFailedToast(
        id,
        `Thêm câu hỏi đánh giá không thành công : ${e.message}`
      );
    }
  };

  const handleSearchValue = (searchData: any) => {
    setSearchValue(searchData.searchValue);
  };

  const handleUpdateFeedbackQuestion = async () => {};

  const handleDeleteFeedbackQuestion = async () => {
    const id = toast.loadToast('Đang xóa câu hỏi đánh giá');
    try {
      await deleteFeedbackQuestionMutation.mutateAsync(row.id);
      toast.updateSuccessToast(id, `Xóa câu hỏi đánh giá thành công`);
    } catch (e: any) {
      toast.updateFailedToast(
        id,
        `Xóa câu hỏi đánh giá không thành công: ${e.message}`
      );
    }
  };

  let renderModal = null;
  switch (mode) {
    case 'CREATE':
      renderModal = (
        <CustomModal open={open} onClose={handleClose}>
          <CreateFeedbackQuestionForm onSubmit={handleAddFeedbackQuestion} />
        </CustomModal>
      );
      break;
    case 'READ':
      renderModal = (
        <CustomModal open={open} onClose={handleClose}>
          <ReadOneFeedbackQuestion row={row} />
        </CustomModal>
      );
      break;
    case 'UPDATE':
      renderModal = (
        <CustomModal open={open} onClose={handleClose}>
          <UpdateFeedbackQuestionForm
            row={row}
            onSubmit={handleUpdateFeedbackQuestion}
          />
        </CustomModal>
      );
      break;
    default:
      renderModal = (
        <ConfirmDialog
          open={open}
          title="Xác nhận xóa câu hỏi này"
          content="Bạn có thực sự muốn xóa câu hỏi này ?"
          handleClose={handleClose}
          handleAccept={handleDeleteFeedbackQuestion}
        />
      );
  }

  const menuItemList: MenuItemPayload[] = [
    {
      icon: 'search',
      title: 'Xem chi tiết câu hỏi',
      onCLick: () => handleClose('READ'),
    },
    {
      icon: 'modeEdit',
      title: 'Cập nhật câu hỏi',
      onCLick: () => handleClose('UPDATE'),
    },
    {
      icon: 'delete',
      title: 'Xóa câu hỏi',
      onCLick: () => handleClose('DELETE'),
    },
  ];

  return (
    <Stack>
      <CRUDTable
        isLoading={isLoading}
        error={error}
        setSelectedRow={setSelectedRow}
        title={texts.title}
        columns={columns.feedbackQuestionColumns}
        rows={filterFeedbackQuestion}
        addItemButtonLabel={texts.addItemLabel}
        onAdd={() => handleClose('CREATE')}
        menuItemList={menuItemList}
        searchPlaceholder={texts.searchTemplatePlaceholder}
        onSearch={handleSearchValue}
      />
      {renderModal}
    </Stack>
  );
}
