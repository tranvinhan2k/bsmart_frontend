import { Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import TextTitle from '~/components/atoms/texts/TextTitle';
import CRUDTable from '~/components/molecules/CRUDTable';
import { useGetIdFromUrl, useGetMentorMarkReport } from '~/hooks';
import globalStyles from '~/styles';

export interface MarkOfStudentPayload {
  id: number;
  code: string;
  name: string;
  markItems: {
    id: number;
    name: string;
    grade: number;
    time: string;
  }[];
}

export default function MentorClassMarkReportPage() {
  const id = useGetIdFromUrl('id');
  const { data: marks, error, isLoading } = useGetMentorMarkReport(id);

  const markColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'No.',
      width: 50,
    },
    {
      field: 'name',
      headerName: 'Tên học sinh',
      minWidth: 200,
      flex: 1,
    },
  ];

  marks?.[0].markItems.map((item) =>
    markColumns.push({
      field: item.name.replaceAll(' ', '').toLowerCase(),
      headerName: item.name,
      width: 100,
    })
  );

  const filterMarks =
    marks?.map((item) => {
      let tmpItem = item;
      item.markItems.map((subItem) => {
        tmpItem = {
          ...tmpItem,
          [subItem.name.replaceAll(' ', '').toLowerCase()]: subItem.grade,
        };
        return null;
      });
      return tmpItem;
    }) || [];

  return (
    <Stack>
      <TextTitle title="Thông tin lớp học" />
      <Stack sx={globalStyles.viewRoundedWhiteBody}>
        <CRUDTable
          error={error}
          isLoading={isLoading}
          columns={markColumns}
          rows={filterMarks}
        />
      </Stack>
    </Stack>
  );
}
