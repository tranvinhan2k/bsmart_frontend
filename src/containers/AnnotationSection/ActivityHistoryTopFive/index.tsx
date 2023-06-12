import { Button, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationActionData } from '~/constants';
import { useManageActivityHistory } from '~/hooks/useManageActivityHistory';
import ActivityHistory from '../ActivityHistory';
import { SX_BUTTON, SX_TITLE, SX_WRAPPER } from './style';

export default function ActivityHistoryTopFive() {
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
          <Fragment key={item.id}>
            <ActivityHistory
              type={item.type}
              action={item.action}
              activityTime={item.activityTime}
              activityName={item.activityName}
            />
          </Fragment>
        ))}
    </Stack>
  );
}
