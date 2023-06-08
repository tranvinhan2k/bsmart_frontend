import { Box, Button, Divider, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NavigationActionData } from '~/constants';
import { useManageActivityHistory } from '~/hooks/useManageActivityHistory';
import { formatISODateStringToDisplayDate } from '~/utils/date';
import {
  SX_BUTTON,
  SX_WRAPPER,
  SX_TITLE,
  SX_PROFILE_DETAILS,
  SX_PROFILE_DETAILS_HIGHLIGHTED,
} from './style';

export default function RecentActivityList() {
  const page = 0;
  const size = 5;

  const { activityHistories } = useManageActivityHistory({
    page,
    size,
  });

  const navigate = useNavigate();

  const handleSeeAllActivityHistory = () => {
    navigate(`/${NavigationActionData[10].link}`, { replace: true });
  };

  return (
    <Stack sx={SX_WRAPPER}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography component="h4" sx={SX_TITLE}>
          Các hoạt động gần đây
        </Typography>
        <Button
          color="miSmartOrange"
          size="small"
          sx={SX_BUTTON}
          onClick={handleSeeAllActivityHistory}
        >
          Tất cả
        </Button>
      </Stack>
      {activityHistories &&
        activityHistories.items.map((item) => (
          <Box mt={2} key={item.id}>
            <Typography component="p" sx={SX_PROFILE_DETAILS}>
              {item.detail}
            </Typography>
            <Typography component="p" sx={SX_PROFILE_DETAILS_HIGHLIGHTED}>
              {formatISODateStringToDisplayDate(item.activityTime)}
            </Typography>
            <Box mt={2}>
              <Divider />
            </Box>
          </Box>
        ))}
    </Stack>
  );
}
