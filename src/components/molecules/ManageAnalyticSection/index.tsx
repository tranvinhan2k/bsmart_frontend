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
import globalStyles from '~/styles';

export default function ManageAnalyticSection() {
  const [tabValue, setTabValue] = useState<number>(2023);
  const handleSetTabValue = (e: ChangeEvent<{ value: unknown }>) =>
    setTabValue(e.target.value as number);

  return (
    <Box padding={3}>
      <Typography
        sx={{
          ...globalStyles.textTitle,
          lineHeight: 1,
        }}
      >
        Báo cáo thống kê
      </Typography>
      <Stack marginTop={2} spacing={2} sx={globalStyles.viewRoundedWhiteBody}>
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
      <Stack marginTop={1}>
        <AnalyticYearRevenue year={tabValue} />
      </Stack>
    </Box>
  );
}
