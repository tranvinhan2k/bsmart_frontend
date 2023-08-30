import { Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import TextTitle from '~/components/atoms/texts/TextTitle';
import CRUDTable from '~/components/molecules/CRUDTable';
import { useGetIdFromUrl, useGetMemberMarkReport } from '~/hooks';
import { selectProfile } from '~/redux/user/selector';
import globalStyles from '~/styles';
import { formatISODateDateToDisplayDateTime } from '~/utils/date';

export interface MarkPayload {
  id: number;
  name: string;
  grade: number;
  type: string;
  created: string;
  lastModified: string;
}

export default function MemberClassMarkReportPage() {
  const profile = useSelector(selectProfile);
  const id = useGetIdFromUrl('id');
  const {
    data: mark,
    error,
    isLoading,
  } = useGetMemberMarkReport(id, profile.id);

  const columns: GridColDef[] = [
    {
      field: 'type',
      headerName: 'Loại điểm số',
      width: 90,
    },
    {
      field: 'name',
      headerName: 'Tên bài kiểm tra',
      flex: 1,
    },
    {
      field: 'created',
      headerName: 'Thời điểm đã làm',
      minWidth: 200,
      renderCell: (params) => {
        return formatISODateDateToDisplayDateTime(params.row.created);
      },
    },
    {
      field: 'grade',
      headerName: 'Điểm',
      width: 90,
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
          rows={mark || []}
        />
      </Stack>
    </Stack>
  );
}
