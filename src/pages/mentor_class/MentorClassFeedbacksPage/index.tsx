import { Rating, Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import TextTitle from '~/components/atoms/texts/TextTitle';
import CRUDTable from '~/components/molecules/CRUDTable';
import { FeedbackMentorDataPayload } from '~/models/form';
import { FeedbackReportStudentPayload } from '~/models/type';
import globalStyles from '~/styles';

export default function MentorClassFeedbacksPage() {
  const rows: FeedbackReportStudentPayload[] = [
    {
      id: 0,
      name: 'Tran Vi Nhan',
      point: 3,
      report:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia doloribus sed vel. Quas veritatis sequi eaque dolor maxime animi ab repellendus, rem neque non commodi! Nostrum illum dignissimos sed omnis. ',
    },
  ];

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Tên học sinh',
    },
    {
      field: 'point',
      flex: 1,
      headerName: 'Điểm đánh giá',
      renderCell: (params) => {
        return (
          <Rating
            size="small"
            name="half-rating-read"
            value={params.row.point}
            precision={0.5}
            readOnly
          />
        );
      },
    },

    {
      field: 'report',
      flex: 5,
      headerName: 'Đánh giá từ học sinh',
    },
  ];

  return (
    <Stack>
      <TextTitle title="Danh sách đánh giá từ học sinh" />
      <Stack sx={globalStyles.viewRoundedWhiteBody}>
        <CRUDTable columns={columns} rows={rows} />
      </Stack>
    </Stack>
  );
}
