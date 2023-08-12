import { Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import TextTitle from '~/components/atoms/texts/TextTitle';
import CRUDTable from '~/components/molecules/CRUDTable';
import { useGetIdFromUrl, useGetMemberMarkReport } from '~/hooks';
import { MarkOfStudentPayload } from '~/pages/mentor_class/MentorClassMarkReportPage';
import globalStyles from '~/styles';
import {
  formatDate,
  formatISODateDateToDisplayDateTime,
  formatISODateStringToDisplayDateTime,
} from '~/utils/date';

export default function MemberClassMarkReportPage() {
  const id = useGetIdFromUrl('id');
  const { data: mark, error, isLoading } = useGetMemberMarkReport(id);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Tên bài kiểm tra',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'time',
      headerName: 'Thời điểm',
      width: 200,
      renderCell: (params) => {
        return formatISODateStringToDisplayDateTime(params.row.time);
      },
    },
    {
      field: 'grade',
      headerName: 'Điểm',
    },
  ];

  return (
    <Stack>
      <TextTitle title="Thông tin lớp học" />
      <Stack sx={globalStyles.viewRoundedWhiteBody}>
        <CRUDTable
          error={error}
          isLoading={isLoading}
          columns={columns}
          rows={mark?.markItems || []}
        />
      </Stack>
    </Stack>
  );
}
