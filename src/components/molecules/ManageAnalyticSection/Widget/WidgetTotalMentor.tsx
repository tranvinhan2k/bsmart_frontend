import { Avatar, Box, Chip, Stack, Typography } from '@mui/material';
import Icon from '~/components/atoms/Icon';
import sx from './style';

export default function WidgetTotalMentor() {
  return (
    <Box sx={sx.mainWrapper}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography sx={sx.widgetLabel}>Người dùng</Typography>
          <Box mt={3} mb={2}>
            <Typography sx={sx.widgetNumber}>2000/1999</Typography>
          </Box>
        </Stack>
        <Avatar />
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Chip
          sx={{ paddingX: 0.5, mr: 1 }}
          icon={<Icon name="keyboardArrowDownIcon" size="small" />}
          label="15%"
          size="small"
          color="error"
        />
        <Typography sx={sx.widgetDesc}>so với tháng trước</Typography>
      </Stack>
    </Box>
  );
}
