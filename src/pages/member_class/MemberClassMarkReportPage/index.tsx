import { Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import TextTitle from '~/components/atoms/texts/TextTitle';
import CRUDTable from '~/components/molecules/CRUDTable';
import { useGetIdFromUrl, useGetMemberMarkReport } from '~/hooks';
import { selectProfile } from '~/redux/user/selector';
import globalStyles from '~/styles';

export interface MarkPayload {
  id: number;
  name: string;
  grade: number;
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
      field: 'name',
      headerName: 'Tên bài kiểm tra',
      flex: 1,
      minWidth: 200,
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
          rows={mark || []}
        />
      </Stack>
    </Stack>
  );
}
