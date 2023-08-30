import { Grid } from '@mui/material';
import { Color } from '~/assets/variables';
import { useGetYearRevenue } from '~/hooks/transaction/useGetYearRevenue';
import BarChartRevenue from '../BarChartRevenue';

interface Props {
  year: number;
}

export default function AnalyticYearRevenue({ year }: Props) {
  const { yearRevenue, isLoading } = useGetYearRevenue(year);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <BarChartRevenue
          chartLabel={`Tổng doanh thu của năm ${year}`}
          chartRowLabel="Tổng doanh thu theo tháng (vnđ)"
          color="#8884d8"
          type="totalIncome"
          data={yearRevenue}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <BarChartRevenue
          chartLabel={`Lợi nhuận thực của năm ${year}`}
          chartRowLabel="Lợi nhuận thự theo tháng (vnđ)"
          color={Color.green}
          type="revenue"
          data={yearRevenue}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <BarChartRevenue
          chartLabel={`Hỗ trợ học sinh dùng mã giảm của năm ${year}`}
          chartRowLabel="Hỗ trợ học sinh dùng mã giảm theo tháng (vnđ)"
          color={Color.tertiary}
          type="promotion"
          data={yearRevenue}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <BarChartRevenue
          chartLabel={`Chiết khấu giáo viên của năm ${year}`}
          chartRowLabel="Chiết khấu giáo viên theo tháng (vnđ)"
          color={Color.red}
          type="mentorShare"
          data={yearRevenue}
          isLoading={isLoading}
        />
      </Grid>
    </Grid>
  );
}
