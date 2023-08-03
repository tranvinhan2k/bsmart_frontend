import { Stack } from '@mui/material';
import CustomTab from '~/components/atoms/CustomTab';
import RevenueChart, { RevenuePayload } from './RevenueChart';
import RevenueHistory from './RevenueHistory';

function generateRandomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function generateRandomData(numItems: number): RevenuePayload[] {
  const newData: RevenuePayload[] = [];
  const buyers = ['Nhan Tran', 'John Doe', 'Jane Smith'];
  const startDate = new Date(2020, 0, 1);
  const endDate = new Date(2024, 11, 31);

  for (let i = 0; i < numItems; i += 1) {
    const id = newData.length + i;
    const date = generateRandomDate(startDate, endDate).toISOString();
    const revenue = Math.floor(Math.random() * 100) + 1; // Random revenue between 1 and 100
    const total = Math.floor(Math.random() * 500) + 1; // Random total between 1 and 500
    const buyer = buyers[Math.floor(Math.random() * buyers.length)];

    newData.push({ id, date, revenue, total, buyer });
  }

  return newData;
}

// Call the function to generate random data and add it to the existing data array

export default function AdminManagerRevenuePage() {
  const data = generateRandomData(120);

  return (
    <Stack padding={2}>
      <RevenueChart data={data} />
    </Stack>
  );
}
