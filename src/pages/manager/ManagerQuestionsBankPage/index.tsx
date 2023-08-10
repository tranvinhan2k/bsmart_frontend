import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import { QuizQuestionPayload } from '~/components/atoms/FormInput/QuizInput';
import AddQuizQuestions from '~/components/molecules/AddQuizQuestions';
import CRUDTable from '~/components/molecules/CRUDTable';
import ViewQuizQuestions from '~/components/molecules/ViewQuizQuestions';
import { useBoolean } from '~/hooks/useBoolean';
import globalStyles, { viewRoundedWhiteBody } from '~/styles';

export default function ManagerQuestionsBankPage() {
  // state
  const [row, setRow] = useState<QuizQuestionPayload>({
    id: 0,
    answers: [],
    question: '',
    questionType: 'SINGLE',
  });
  const { value: isAdd, toggle: toggleAdd } = useBoolean(false);
  const { value: isDelete, toggle: toggleDelete } = useBoolean(false);
  const { value: isRead, toggle: toggleRead } = useBoolean(false);
  const bankQuestions: QuizQuestionPayload[] = [
    {
      id: 0,
      question: '1 + 1 = 2 ?',
      questionType: 'SINGLE',
      answers: [
        {
          answer: 'yes',
          right: true,
        },
        {
          answer: 'no',
          right: false,
        },
      ],
    },
    {
      id: 1,
      question: '1 + 1 = 3 ?',
      questionType: 'SINGLE',
      answers: [
        {
          answer: 'yes',
          right: true,
        },
        {
          answer: 'no',
          right: false,
        },
      ],
    },
  ];

  const handleViewDetail = () => {};
  const handleUpdate = () => {};
  const handleDelete = () => {};
  const handleSearchValue = () => {};
  const handleAddQuestion = () => {};

  return (
    <Stack padding={3}>
      <Stack>
        <ViewQuizQuestions open={isRead} onClose={toggleRead} question={row} />
        <AddQuizQuestions
          open={isAdd}
          onChange={handleAddQuestion}
          onClose={toggleAdd}
          questionList={bankQuestions}
        />
        <ConfirmDialog
          open={isDelete}
          handleClose={toggleDelete}
          title="Xác nhận xóa câu hỏi này ?"
          content="Bạn chắc chắn xóa câu hỏi này ?"
          handleAccept={handleDelete}
        />
        <CRUDTable
          title="Ngân hàng câu hỏi"
          addItemButtonLabel="Thêm câu hỏi"
          onSearch={handleSearchValue}
          searchPlaceholder="Nhập tên câu hỏi"
          onAdd={toggleAdd}
          setSelectedRow={setRow}
          menuItemList={[
            {
              icon: 'viewDetail',
              onCLick: toggleRead,
              title: 'Xem chi tiết',
            },
            {
              icon: 'delete',
              onCLick: toggleDelete,
              title: 'Xóa câu hỏi',
            },
          ]}
          columns={[
            {
              field: 'question',
              headerName: 'Tên câu hỏi',
              flex: 5,
              minWidth: 300,
            },
            {
              field: 'questionType',
              headerName: 'Loại câu hỏi',
              flex: 2,
              minWidth: 100,
            },
            {
              field: 'answers',
              headerName: 'Số lượng câu trả lời',
              flex: 2,
              minWidth: 100,

              renderCell(params) {
                return params.row?.answers?.length || 0;
              },
            },
          ]}
          rows={bankQuestions || []}
        />
      </Stack>
    </Stack>
  );
}
