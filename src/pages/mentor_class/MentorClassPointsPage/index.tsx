import { Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import TextTitle from '~/components/atoms/texts/TextTitle';
import CRUDTable from '~/components/molecules/CRUDTable';
import { QuizReportStudentPayload } from '~/models/type';
import globalStyles from '~/styles';

export default function MentorClassPointsPage() {
  const rows: QuizReportStudentPayload[] = [
    {
      id: 0,
      name: 'Tran Vi Nhan',
      correctNumber: 12,
      point: 12,
      submitAt: new Date().toISOString(),
      totalNumber: 12,
    },
  ];

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Tên học sinh',
    },
    {
      field: 'submitAt',
      flex: 1,
      headerName: 'Thời gian nộp bài',
    },

    {
      field: 'correctNumber',
      headerName: 'Số câu hỏi trả lời đúng',
    },
    {
      field: 'totalNumber',
      headerName: 'Số câu hỏi',
    },
    {
      field: 'point',
      headerName: 'Số câu đạt được',
    },
  ];

  return (
    <Stack>
      <TextTitle title="Thông kê điểm số" />
      <Stack sx={globalStyles.viewRoundedWhiteBody}>
        <CRUDTable columns={columns} rows={rows} />
      </Stack>
    </Stack>
  );
}
