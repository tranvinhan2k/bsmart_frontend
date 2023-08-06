import { Box, Grid, Pagination, Stack, Typography } from '@mui/material';
import { useContext } from 'react';
import { useManagerHistory } from '~/hooks/useManagerHistory';
import ActivityHistoryDetails from './ActivityHistoryDetails';
import { ANNOTATION_BOX, ANNOTATION_H3, SX_FORM_LABEL_GRAY } from './style';
import { NotificationContext } from '~/HOCs/context/NotificationContext';
import NotificationItem from '~/HOCs/context/NotificationItem';
import { MetricSize } from '~/assets/variables';

export default function AnnotationSection() {
  const { notifications } = useContext(NotificationContext);

  return (
    <Grid
      container
      paddingX={{
        xs: 4,
        md: '300px',
      }}
      paddingY={4}
    >
      <Grid item xs={12}>
        <Box sx={ANNOTATION_BOX}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            // spacing={2}
          >
            <Typography component="h3" sx={ANNOTATION_H3}>
              Danh sách hoạt động
            </Typography>
            {notifications.map((item, index) => (
              <NotificationItem
                key={index}
                entity={item.entity}
                id={item.id}
                title={item.title}
                message={item.message}
                time={item.time}
              />
            ))}
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}
