import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { Color } from '~/assets/variables';
import AnalyticBarChartRevenue from './AnalyticBarChartRevenue';

export default function ManageAnalyticSection() {
  const [tabValue, setTabValue] = useState<number>(2022);
  const handleSetTabValue = (e: ChangeEvent<{ value: unknown }>) =>
    setTabValue(e.target.value as number);

  return (
    <Box p={4}>
      <Typography
        sx={{
          fontSize: 26,
          fontWeight: 500,
          lineHeight: 1,
        }}
      >
        Báo cáo thống kê
      </Typography>
      <Box mb={3} />
      <Stack spacing={2} mb={2}>
        <FormControl size="small">
          <TextField
            value={tabValue}
            onChange={handleSetTabValue}
            select
            size="small"
            label="Chọn năm"
          >
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
          </TextField>
        </FormControl>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <AnalyticBarChartRevenue
            chartLabel={`Doanh thu của năm ${tabValue}`}
            chartRowLabel="Doanh thu theo tháng (vnđ)"
            color="#8884d8"
          />
        </Grid>
        <Grid item xs={6}>
          <AnalyticBarChartRevenue
            chartLabel={`Lợi nhuận thực của năm ${tabValue}`}
            chartRowLabel="Lợi nhuận thực theo tháng (vnđ)"
            color={Color.tertiary}
          />
        </Grid>
        <Grid item xs={6}>
          <AnalyticBarChartRevenue
            chartLabel={`Tổng hỗ trợ học sinh dùng mã giảm của năm ${tabValue}`}
            chartRowLabel="Tổng hỗ trợ học sinh dùng mã giảm theo tháng (vnđ)"
            color={Color.orange}
          />
        </Grid>
        <Grid item xs={6}>
          <AnalyticBarChartRevenue
            chartLabel={`Tổng chiết khấu giáo viên của năm ${tabValue}`}
            chartRowLabel="Tổng chiết khấu giáo viên theo tháng (vnđ)"
            color={Color.red}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
