import { Stack } from '@mui/material';
import CustomTab from '~/components/atoms/CustomTab';
import RevenueChart, { RevenuePayload } from './RevenueChart';
import RevenueHistory from './RevenueHistory';

// Call the function to generate random data and add it to the existing data array

export default function AdminManagerRevenuePage() {
  return (
    <Stack padding={2}>
      <RevenueChart data={[]} />
    </Stack>
  );
}
