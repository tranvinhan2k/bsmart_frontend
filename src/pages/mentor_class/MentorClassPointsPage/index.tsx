import { Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import TextTitle from '~/components/atoms/texts/TextTitle';
import CRUDTable from '~/components/molecules/CRUDTable';
import { comparisonData, quizStatusData } from '~/constants';
import { useGetIdFromUrl } from '~/hooks';
import { useMentorListQuiz } from '~/hooks/quiz/useMentorListQuiz';
import {
  QuizReportStudentPayload,
  QuizReportTeacherPayload,
} from '~/models/type';
import globalStyles from '~/styles';
import { formatISODateStringToDisplayDateTime } from '~/utils/date';

export default function MentorClassPointsPage({ quizId }: { quizId: number }) {
  const classId = useGetIdFromUrl('id');

  const { data, error, isLoading } = useMentorListQuiz(quizId, classId);

  const columns: GridColDef<QuizReportTeacherPayload>[] = [
    {
      field: 'name',
      headerName: 'Tên học sinh',
      flex: 1,
    },
    {
      field: 'submitAt',
      flex: 6,
      headerName: 'Thời gian nộp bài',
      renderCell: (params) => {
        const formatCell = formatISODateStringToDisplayDateTime(
          params.row?.submitAt
        );
        return formatCell;
      },
    },
    {
      field: 'point',
      headerName: 'Điểm tối đa',
      flex: 1,
    },
    {
      field: 'correctPoint',
      headerName: 'Điểm',
      flex: 1,
      renderCell: (params) => {
        return `${params.row.correctNumber.map(
          (item) => `${(item / params.row.totalQuestion) * params.row.point}`
        )}`;
      },
    },
  ];

  const handleSearch = (params: any) => {
    console.log(params);
  };

  return (
    <Stack>
      <Typography sx={globalStyles.textSmallLabel}>Thông kê điểm số</Typography>
      <Stack>
        <CRUDTable
          isLoading={isLoading}
          error={error}
          columns={columns}
          rows={data?.items || []}
          searchPlaceholder="Nhập tên học sinh bạn muốn tìm kiếm"
          onSearch={handleSearch}
          searchFilterFormInputList={[
            {
              name: 'status',
              data: quizStatusData,
              placeholder: 'Nhập trạng thái của bài kiểm tra',
              variant: 'dropdown',
            },
            {
              name: 'comparison',
              data: comparisonData,
              placeholder: 'Nhập phép so sánh',
              variant: 'dropdown',
            },
            {
              name: 'point',
              variant: 'number',
              placeholder: 'Điểm số của học sinh',
            },
            {
              name: 'startDate',
              variant: 'date',
              placeholder: 'Nhập ngày bắt đầu',
            },
            {
              name: 'endDate',
              variant: 'date',
              placeholder: 'Nhập ngày kết thúc',
            },
          ]}
        />
      </Stack>
    </Stack>
  );
}
