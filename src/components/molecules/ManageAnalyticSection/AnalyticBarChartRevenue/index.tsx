import { Box, Stack, Typography } from '@mui/material';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { formatMoney } from '~/utils/money';
import sx from './style';

const data = [
  {
    month: 1,
    totalIncome: 67000000,
    pv: 2400,
    amt: 2400,
  },
  {
    month: 2,
    totalIncome: 88000000,
    pv: 1398,
    amt: 2210,
  },
  {
    month: 3,
    totalIncome: 29000000,
    pv: 9800,
    amt: 2290,
  },
  {
    month: 4,
    totalIncome: 27000000,
    pv: 3908,
    amt: 2000,
  },
  {
    month: 5,
    totalIncome: 48000000,
    pv: 4800,
    amt: 2181,
  },
  {
    month: 6,
    totalIncome: 23000000,
    pv: 3800,
    amt: 2500,
  },
  {
    month: 7,
    totalIncome: 35000000,
    pv: 4300,
    amt: 2100,
  },
  {
    month: 8,
    totalIncome: 70000000,
    pv: 9800,
    amt: 2290,
  },
  {
    month: 9,
    totalIncome: 57000000,
    pv: 3908,
    amt: 2000,
  },
  {
    month: 10,
    totalIncome: 18000000,
    pv: 4800,
    amt: 2181,
  },
  {
    month: 11,
    totalIncome: 29000000,
    pv: 3800,
    amt: 2500,
  },
  {
    month: 12,
    totalIncome: 14000000,
    pv: 4300,
    amt: 2100,
  },
];

interface Props {
  chartLabel: string;
  chartRowLabel: string;
  color: string;
}
export default function AnalyticBarChartRevenue({
  chartLabel,
  chartRowLabel,
  color,
}: Props) {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={4}
      sx={{ width: '100%', boxShadow: 3, padding: 2, borderRadius: 2 }}
    >
      <Typography sx={sx.titleBarChart}>{chartLabel}</Typography>
      <Box sx={sx.wrapperBarChart}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={150} height={40} data={data} margin={{ top: 20 }}>
            <XAxis dataKey="month" />
            {/* <YAxis /> */}
            <Legend />
            <Tooltip formatter={(value: number) => formatMoney(value)} />
            <Bar
              dataKey="totalIncome"
              fill={color}
              isAnimationActive={false}
              name={chartRowLabel}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Stack>
  );
}
