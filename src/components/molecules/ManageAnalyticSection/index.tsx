import {
  Box,
  FormControl,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import AnalyticYearRevenue from './AnalyticYearRevenue';

export default function ManageAnalyticSection() {
  const [tabValue, setTabValue] = useState<number>(2023);
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
            <MenuItem value={2023}>2023</MenuItem>
            <MenuItem value={2022}>2022</MenuItem>
          </TextField>
        </FormControl>
      </Stack>
      <AnalyticYearRevenue year={tabValue} />
    </Box>
  );
}
