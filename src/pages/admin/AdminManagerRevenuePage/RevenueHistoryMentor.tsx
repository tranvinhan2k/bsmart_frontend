import { Stack, Typography } from '@mui/material';
// eslint-disable-next-line import/no-cycle
import { RevenuePayload } from './RevenueChart';
import CRUDTable from '~/components/molecules/CRUDTable';
import globalStyles from '~/styles';
import { formatISODateDateToDisplayDateTime } from '~/utils/date';
import { formatMoney } from '~/utils/money';

export default function RevenueHistoryMentor({
  data,
}: {
  data: RevenuePayload[];
}) {
  return (
    <Stack>
      {/* <Typography sx={globalStyles.textSubTitle}>Lịch sử giao dịch</Typography> */}

      <Stack marginTop={1}>
        <CRUDTable
          rows={data}
          columns={[
            {
              field: 'id',
              flex: 1,
            },
            {
              field: 'date',
              flex: 1,
              renderCell: (params) => {
                return formatISODateDateToDisplayDateTime(params.row.date);
              },
            },
            {
              field: 'revenue',
              flex: 1,
              renderCell: (params) => {
                return formatMoney(params.row.revenue);
              },
            },
            {
              field: 'total',
              flex: 1,
              renderCell: (params) => {
                return formatMoney(params.row.total);
              },
            },
            {
              field: 'typeOfTransactions',
              headerName: 'Loại giao dịch',
              flex: 1,
            },
            {
              field: 'status',
              headerName: 'Trạng thái',
              flex: 1,
            },
          ]}
        />
      </Stack>
    </Stack>
  );
}
