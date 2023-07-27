import { Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import TextTitle from '~/components/atoms/texts/TextTitle';
import CRUDTable from '~/components/molecules/CRUDTable';
import { comparisonData, quizStatusData } from '~/constants';
import { QuizReportStudentPayload } from '~/models/type';
import globalStyles from '~/styles';
import { formatISODateStringToDisplayDateTime } from '~/utils/date';

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
      headerName: 'Điểm',
      flex: 1,
      renderCell: (params) => {
        return `${params.row?.point}/${params.row?.totalNumber}`;
      },
    },
  ];

  const handleSearch = (data: any) => {
    console.log(data);
  };

  return (
    <Stack>
      <TextTitle title="Thông kê điểm số" />
      <Stack sx={globalStyles.viewRoundedWhiteBody}>
        <CRUDTable
          columns={columns}
          rows={rows}
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
