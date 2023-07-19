import { Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import CRUDTable from '~/components/molecules/CRUDTable';
import QuestionBankInnerUpdate from './QuestionBankInnerUpdate';
import { useDispatchGetAllSubjects, useGetAllQuizQuestion } from '~/hooks';

export default function AdminManagerQuestionBank() {
  const { optionSubjects } = useDispatchGetAllSubjects();
  const { quizQuestions, error, isLoading } = useGetAllQuizQuestion();

  const columns: GridColDef[] = [
    {
      field: 'content',
      flex: 3,
      headerName: 'Nội dung',
    },
    {
      field: 'version',
      flex: 1,
      headerName: 'Phiên bản',
    },
    {
      field: 'createBy',
      flex: 1,
      headerName: 'Tạo bởi',
    },
    {
      field: 'comment',
      flex: 2,
      headerName: 'Bình luận',
    },
    {
      field: 'isCheck',
      flex: 1,
      headerName: 'Cần kiểm tra',
    },
    {
      field: 'lastUsed',
      flex: 2,
      headerName: 'Lần cập nhật cuối',
    },
  ];

  return (
    <Stack padding={3}>
      <CRUDTable
        onAdd={() => {}}
        addItemButtonLabel="thêm câu hỏi mới"
        error={error}
        isLoading={isLoading}
        rows={quizQuestions}
        title="Ngân hàng câu hỏi"
        columns={columns}
        searchFilterFormInputList={[
          {
            name: 'subjectId',
            variant: 'dropdown',
            placeholder: 'Nhập tên môn học',
            data: optionSubjects,
          },
        ]}
        searchPlaceholder="Nhập nội dung câu hỏi cần tìm"
      />
      <Stack marginTop={1}>
        <QuestionBankInnerUpdate />
      </Stack>
    </Stack>
  );
}
