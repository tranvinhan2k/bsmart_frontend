import { Box, Grid, Pagination, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useManageActivityHistory } from '~/hooks/useManageActivityHistory';
import ActivityHistoryDetails from './ActivityHistoryDetails';
import { ANNOTATION_BOX, ANNOTATION_H3, SX_FORM_LABEL_GRAY } from './style';

export default function AnnotationSection() {
  const [page, setPage] = useState<number>(0);
  const size = 5;

  const { activityHistories, refetch } = useManageActivityHistory({
    page,
    size,
  });

  const handlePagination = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value - 1);
    refetch();
  };

  return (
    <Grid container my={5}>
      <Grid item xs={1} md={3}>
        <Box />
      </Grid>
      <Grid item xs={10} md={6}>
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
            {activityHistories && (
              <>
                {activityHistories.items.length > 0 && (
                  <>
                    {activityHistories.items.map((item) => (
                      <ActivityHistoryDetails
                        key={item.id}
                        action={item.action}
                        activityName={item.activityName}
                        activityTime={item.activityTime}
                        type={item.type}
                      />
                    ))}
                    <Pagination
                      onChange={handlePagination}
                      color="standard"
                      size="large"
                      count={activityHistories.totalPages}
                    />
                  </>
                )}
                {activityHistories.items.length < 0 && (
                  <Typography sx={SX_FORM_LABEL_GRAY}>
                    Không có dữ liệu
                  </Typography>
                )}
              </>
            )}
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={1} md={3}>
        <Box />
      </Grid>
    </Grid>
  );
}
