import { Box } from '@mui/material';
import StatisticTotalRevenue from './StatisticTotalRevenue';

export default function ManageAnalyticSection() {
  return (
    <Box p={4}>
      <StatisticTotalRevenue
        chartLabel="Doanh thu của năm"
        chartRowLabel="Doanh thu theo tháng"
      />
      <StatisticTotalRevenue
        chartLabel="Lợi nhuận thực của năm"
        chartRowLabel="Lợi nhuận thực theo tháng"
      />
    </Box>
  );
}
