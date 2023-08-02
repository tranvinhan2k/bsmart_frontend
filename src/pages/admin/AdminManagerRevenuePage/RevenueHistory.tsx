import { Stack } from '@mui/material';
import { RevenuePayload } from './RevenueChart';
import CRUDTable from '~/components/molecules/CRUDTable';

export default function RevenueHistory({ data }: { data: RevenuePayload[] }) {
  return (
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
  );
}
