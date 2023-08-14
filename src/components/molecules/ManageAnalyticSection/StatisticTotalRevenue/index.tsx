import {
  Box,
  FormControl,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  {
    month: 1,
    totalIncome: 6700,
    pv: 2400,
    amt: 2400,
  },
  {
    month: 2,
    totalIncome: 8800,
    pv: 1398,
    amt: 2210,
  },
  {
    month: 3,
    totalIncome: 2990,
    pv: 9800,
    amt: 2290,
  },
  {
    month: 4,
    totalIncome: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    month: 5,
    totalIncome: 4890,
    pv: 4800,
    amt: 2181,
  },
  {
    month: 6,
    totalIncome: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    month: 7,
    totalIncome: 3590,
    pv: 4300,
    amt: 2100,
  },
  {
    month: 8,
    totalIncome: 7000,
    pv: 9800,
    amt: 2290,
  },
  {
    month: 9,
    totalIncome: 5780,
    pv: 3908,
    amt: 2000,
  },
  {
    month: 10,
    totalIncome: 1840,
    pv: 4800,
    amt: 2181,
  },
  {
    month: 11,
    totalIncome: 2990,
    pv: 3800,
    amt: 2500,
  },
  {
    month: 12,
    totalIncome: 7490,
    pv: 4300,
    amt: 2100,
  },
];

const data2 = [
  {
    month: 'Tháng 1',
    totalIncome: 10000,
  },
  {
    month: 'Tháng 2',
    totalIncome: 10000,
  },
  {
    month: 'Tháng 3',
    totalIncome: 10000,
  },
  {
    month: 'Tháng 4',
    totalIncome: 15999,
  },
  {
    month: 'Tháng 5',
    totalIncome: 10000,
  },
  {
    month: 'Tháng 6',
    totalIncome: 10000,
  },
  {
    month: 'Tháng 7',
    totalIncome: 10000,
  },
  {
    month: 'Tháng 8',
    totalIncome: 15999,
  },
  {
    month: 'Tháng 9',
    totalIncome: 20999,
  },
  {
    month: 'Tháng 10',
    totalIncome: 15999,
  },
  {
    month: 'Tháng 11',
    totalIncome: 10000,
  },
  {
    month: 'Tháng 12',
    totalIncome: 10000,
  },
];

interface Props {
  chartLabel: string;
  chartRowLabel: string;
}
export default function StatisticTotalRevenue({
  chartLabel,
  chartRowLabel,
}: Props) {
  const [tabValue, setTabValue] = useState<number>(0);
  const handleSetTabValue = (e: ChangeEvent<{ value: unknown }>) =>
    setTabValue(e.target.value as number);

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={4}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Stack sx={{ width: '20%', height: '100%' }}>
          <Stack spacing={2}>
            <Typography>{chartLabel}</Typography>
            <FormControl size="small">
              <TextField
                value={tabValue}
                onChange={handleSetTabValue}
                select
                size="small"
              >
                <MenuItem value={0}>2022</MenuItem>
                <MenuItem value={1}>2023</MenuItem>
              </TextField>
            </FormControl>
          </Stack>
        </Stack>
        <Box sx={{ height: 300, width: '80%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={40} data={data} margin={{ top: 20 }}>
              <XAxis dataKey="month" />
              <YAxis />
              <Legend />
              <Tooltip />
              <Bar
                dataKey="totalIncome"
                fill="#8884d8"
                isAnimationActive={false}
                name={chartRowLabel}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Stack>
    </Stack>
  );
}
