import { Button, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationActionData } from '~/constants';
import { useManageActivityHistory } from '~/hooks/useManageActivityHistory';
import ActivityHistory from '../ActivityHistory';
import CustomFetchingStatus from '~/components/atoms/CustomFetchingStatus';
import { SX_BUTTON, SX_FORM_LABEL_GRAY, SX_TITLE, SX_WRAPPER } from './style';

export default function ActivityHistoryTopFive() {
  const page = 0;
  const size = 5;

  const { activityHistories, isLoading, isError, error } =
    useManageActivityHistory({
      page,
      size,
    });

  const navigate = useNavigate();

  const handleSeeAllActivityHistory = () => {
    navigate(`/${NavigationActionData[10].link}`);
  };

  return (
    <Stack sx={SX_WRAPPER} mt={2}>
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
      <CustomFetchingStatus
        isError={isError}
        isLoading={isLoading}
        error={error}
        hasBackground={false}
      />
      {activityHistories && (
        <>
          {activityHistories.items.length > 0 &&
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
          {activityHistories.items.length < 0 && (
            <Typography sx={SX_FORM_LABEL_GRAY}>Không có dữ liệu</Typography>
          )}
        </>
      )}
    </Stack>
  );
}
