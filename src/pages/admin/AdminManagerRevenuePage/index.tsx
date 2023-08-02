import { Stack } from '@mui/material';
import CustomTab from '~/components/atoms/CustomTab';
import RevenueChart, { RevenuePayload } from './RevenueChart';
import RevenueHistory from './RevenueHistory';

export default function AdminManagerRevenuePage() {
  const data: RevenuePayload[] = [
    {
      id: 0,
      date: '2022-08-01T17:30:09.724Z',
      revenue: 30,
      total: 100,
      buyer: 'Nhan Tran',
    },
    {
      id: 1,
      date: '2023-03-01T17:30:09.724Z',
      revenue: 10,
      total: 200,
      buyer: 'Nhan Tran',
    },
    {
      id: 2,
      date: '2021-01-01T17:30:09.724Z',
      revenue: 40,
      total: 300,
      buyer: 'Nhan Tran',
    },
    {
      id: 3,
      date: '2023-02-01T17:30:09.724Z',
      revenue: 10,
      total: 30,
      buyer: 'Nhan Tran',
    },
  ];
  return (
    <Stack padding={2}>
      <RevenueChart data={data} />
      <RevenueHistory data={data} />
    </Stack>
  );
}
