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
      <Grid item xs={6}>
        <BarChartRevenue
          chartLabel={`Doanh thu ròng của năm ${year}`}
          chartRowLabel="Doanh thu ròng theo tháng (vnđ)"
          color="#8884d8"
          type="totalIncome"
          data={yearRevenue}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={6}>
        <BarChartRevenue
          chartLabel={`Doanh thu thuần của năm ${year}`}
          chartRowLabel="Doanh thu thuần theo tháng (vnđ)"
          color={Color.tertiary}
          type="revenue"
          data={yearRevenue}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={6}>
        <BarChartRevenue
          chartLabel={`Hỗ trợ học sinh dùng mã giảm của năm ${year}`}
          chartRowLabel="Hỗ trợ học sinh dùng mã giảm theo tháng (vnđ)"
          color={Color.orange}
          type="promotion"
          data={yearRevenue}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={6}>
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
