import { Rating, Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import TextTitle from '~/components/atoms/texts/TextTitle';
import CRUDTable from '~/components/molecules/CRUDTable';
import Content from '~/components/molecules/Content';
import {
  FeedbackReportStudentPayload,
  NotificationPayload,
} from '~/models/type';
import globalStyles from '~/styles';

export default function MentorClassNotificationPage() {
  const rows: NotificationPayload[] = [
    {
      id: 0,
      type: 'Thông báo lớp học',
      message:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quasi, molestiae ab commodi ut iure tempora aliquid vel possimus, iusto nam fuga. Voluptas voluptatum accusantium harum in, mollitia omnis minus? ',
    },
  ];

  const columns: GridColDef[] = [
    {
      field: 'type',
      flex: 1,
      headerName: 'Loại thông báo',
    },
    {
      field: 'message',
      flex: 5,
      headerName: 'Nội dung thông báo',
    },
  ];

  return (
    <Stack>
      <TextTitle title="Thông báo" />
      <Stack sx={globalStyles.viewRoundedWhiteBody}>
        <CRUDTable columns={columns} rows={rows} />
      </Stack>
    </Stack>
  );
}
