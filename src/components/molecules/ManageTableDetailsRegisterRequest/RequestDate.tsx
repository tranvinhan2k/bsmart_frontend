import { Box, Grid, Stack, Typography } from '@mui/material';
import {
  formatISODateStringToDisplayDate,
  formatISODateStringToDisplayTime,
} from '~/utils/date';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_ITEM_LABEL,
  SX_FORM_ITEM_VALUE,
  SX_FORM_LABEL,
} from './style';

interface RequestDateProps {
  row: any;
}

export default function RequestDate({ row }: RequestDateProps) {
  const title0 = [
    {
      id: 0,
      label: 'Ngày gửi',
      value: formatISODateStringToDisplayDate(row.timeSendRequest) ?? '',
    },
    {
      id: 1,
      label: 'Thời gian gửi',
      value: formatISODateStringToDisplayTime(row.timeSendRequest) ?? '',
    },
    {
      id: 2,
      label: 'Lần gửi thứ',
      value: row.count ?? '',
    },
  ];

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Box mb={2}>
        <Typography sx={SX_FORM_LABEL}>Thời gian gửi yêu cầu</Typography>
      </Box>

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        columnSpacing={8}
        rowSpacing={2}
      >
        {title0.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Typography sx={SX_FORM_ITEM_LABEL}>{item.label}:</Typography>
              <Typography sx={SX_FORM_ITEM_VALUE}>{item.value}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
