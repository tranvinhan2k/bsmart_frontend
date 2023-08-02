import { Stack, Typography } from '@mui/material';
import { RevenuePayload } from './RevenueChart';
import CRUDTable from '~/components/molecules/CRUDTable';
import globalStyles from '~/styles';

export default function RevenueHistory({ data }: { data: RevenuePayload[] }) {
  return (
    <Stack>
      <Typography sx={globalStyles.textSubTitle}>Lịch sử giao dịch</Typography>

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
            },
            {
              field: 'revenue',
              flex: 1,
            },
            {
              field: 'total',
              flex: 1,
            },
            {
              field: 'buyer',
              flex: 1,
            },
          ]}
        />
      </Stack>
    </Stack>
  );
}
