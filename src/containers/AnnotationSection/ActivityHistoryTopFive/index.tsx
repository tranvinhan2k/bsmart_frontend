import { Button, Stack, Typography } from '@mui/material';
import { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityHistory from '../ActivityHistory';
import { SX_BUTTON, SX_TITLE, SX_WRAPPER } from './style';
import { NotificationContext } from '~/HOCs/context/NotificationContext';
import { NavigationLink } from '~/constants/routeLink';
import NotificationItem from '~/HOCs/context/NotificationItem';
import { LoadingWrapper } from '~/HOCs';

export default function ActivityHistoryTopFive() {
  const { notifications } = useContext(NotificationContext);

  const navigate = useNavigate();

  const handleSeeAllActivityHistory = () => {
    navigate(`/${NavigationLink.annotation}`);
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

      <LoadingWrapper isEmptyCourse={notifications?.length === 0}>
        {notifications.slice(0, 4)?.map((item, index) => (
          <NotificationItem
            key={index}
            entity={item.entity}
            entityId={item.entityId}
            id={item.id}
            isRead={item.isRead}
            title={item.title}
            message={item.message}
            time={item.time}
          />
        ))}
      </LoadingWrapper>
    </Stack>
  );
}
