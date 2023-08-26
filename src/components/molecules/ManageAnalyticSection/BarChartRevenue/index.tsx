import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatMoney } from '~/utils/money';
import { YearRevenue } from '~/models/transaction';
import globalStyles from '~/styles';
import sx from './style';

const dataMock: YearRevenue[] = [
  {
    month: 1,
    totalIncome: 67000000,
    revenue: 3434300,
    promotion: 2400,
    mentorShare: 2400,
  },
  {
    month: 2,
    totalIncome: 88000000,
    revenue: 3434300,
    promotion: 2400,
    mentorShare: 2400,
  },
  {
    month: 3,
    totalIncome: 29000000,
    revenue: 3434300,
    promotion: 2400,
    mentorShare: 2400,
  },
  {
    month: 4,
    totalIncome: 27000000,
    revenue: 3434300,
    promotion: 2400,
    mentorShare: 2400,
  },
  {
    month: 5,
    totalIncome: 48000000,
    revenue: 3434300,
    promotion: 2400,
    mentorShare: 2400,
  },
  {
    month: 6,
    totalIncome: 23000000,
    revenue: 3434300,
    promotion: 2400,
    mentorShare: 2400,
  },
  {
    month: 7,
    totalIncome: 35000000,
    revenue: 3434300,
    promotion: 2400,
    mentorShare: 2400,
  },
  {
    month: 8,
    totalIncome: 70000000,
    revenue: 3434300,
    promotion: 2400,
    mentorShare: 2400,
  },
  {
    month: 9,
    totalIncome: 57000000,
    revenue: 3434300,
    promotion: 2400,
    mentorShare: 2400,
  },
  {
    month: 10,
    totalIncome: 18000000,
    revenue: 3434300,
    promotion: 2400,
    mentorShare: 2400,
  },
  {
    month: 11,
    totalIncome: 29000000,
    revenue: 3434300,
    promotion: 2400,
    mentorShare: 2400,
  },
  {
    month: 12,
    totalIncome: 14000000,
    revenue: 3434300,
    promotion: 2400,
    mentorShare: 2400,
  },
];

interface Props {
  chartLabel: string;
  chartRowLabel: string;
  color: string;
  type: 'totalIncome' | 'revenue' | 'promotion' | 'mentorShare';
  data: YearRevenue[] | undefined;
  isLoading: boolean;
}

export default function BarChartRevenue({
  chartLabel,
  chartRowLabel,
  color,
  type,
  data,
  isLoading,
}: Props) {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={4}
      sx={{
        width: '100%',
        ...globalStyles.viewRoundedWhiteBody,
      }}
    >
      <Typography sx={sx.titleBarChart}>{chartLabel}</Typography>
      {isLoading && <CircularProgress />}
      {data && (
        <Box sx={sx.wrapperBarChart}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={40} data={data} margin={{ top: 20 }}>
              <XAxis dataKey="month" />
              <YAxis />
              <Legend />
              <Tooltip formatter={(value: number) => formatMoney(value)} />
              <Bar
                dataKey={type}
                fill={color}
                isAnimationActive={false}
                name={chartRowLabel}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Stack>
  );
}
