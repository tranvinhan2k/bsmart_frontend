import { Box, Button, Grid, Pagination, Typography } from '@mui/material';
import { useState } from 'react';
import img_banner_sub_typing_1 from '~/assets/images/HomePageSection/img_banner_sub_typing_1.jpg';
import { useManageActivityHistory } from '~/hooks/useManageActivityHistory';
import { formatISODateStringToDisplayDate } from '~/utils/date';
import {
  ANNOTATION_BOX,
  ANNOTATION_CONTENT,
  ANNOTATION_CONTENT_CONTENT,
  ANNOTATION_CONTENT_DATE,
  ANNOTATION_CONTENT_IMG,
  ANNOTATION_CONTENT_TITLE,
  ANNOTATION_H3,
} from './style';

export default function AnnotationSection() {
  const [page, setPage] = useState<number>(0);
  const size = 1;

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
    <Grid container my={2}>
      <Grid item xs={1} md={3}>
        <Box />
      </Grid>
      <Grid item xs={10} md={6}>
        <Box sx={ANNOTATION_BOX}>
          <Typography component="h3" sx={ANNOTATION_H3}>
            Thông báo
          </Typography>
          {/* <Button sx={ANNOTATION_BUTTON}>Tất cả</Button>
          <Button sx={ANNOTATION_BUTTON}>Chưa đọc</Button> */}
          {activityHistories && (
            <>
              {activityHistories.items.map((item) => (
                <Box sx={ANNOTATION_CONTENT} key={item.id}>
                  <Grid container my={2} p={2}>
                    <Grid item xs={2}>
                      <Box
                        component="img"
                        sx={ANNOTATION_CONTENT_IMG}
                        alt="img"
                        src={img_banner_sub_typing_1}
                      />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography component="p" sx={ANNOTATION_CONTENT_TITLE}>
                        {item.detail}
                      </Typography>
                      <Typography component="p" sx={ANNOTATION_CONTENT_CONTENT}>
                        {item.detail}
                      </Typography>
                      <Typography component="p" sx={ANNOTATION_CONTENT_DATE}>
                        {formatISODateStringToDisplayDate(item.activityTime)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Pagination
                onChange={handlePagination}
                color="standard"
                size="large"
                count={activityHistories.totalPages}
              />
            </>
          )}
          {/* <Button sx={ANNOTATION_BUTTON}>Tất cả</Button>
          <Button sx={ANNOTATION_BUTTON}>Chưa đọc</Button> */}
          {activityHistories && (
            <>
              {activityHistories.items.map((item) => (
                <Box sx={ANNOTATION_CONTENT} key={item.id}>
                  <Grid container my={2} p={2}>
                    <Grid item xs={2}>
                      <Box
                        component="img"
                        sx={ANNOTATION_CONTENT_IMG}
                        alt="img"
                        src={img_banner_sub_typing_1}
                      />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography component="p" sx={ANNOTATION_CONTENT_TITLE}>
                        {item.detail}
                      </Typography>
                      <Typography component="p" sx={ANNOTATION_CONTENT_CONTENT}>
                        {item.detail}
                      </Typography>
                      <Typography component="p" sx={ANNOTATION_CONTENT_DATE}>
                        {formatISODateStringToDisplayDate(item.activityTime)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Pagination
                onChange={handlePagination}
                color="standard"
                size="large"
                count={activityHistories.totalPages}
              />
            </>
          )}
        </Box>
      </Grid>
      <Grid item xs={1} md={3}>
        <Box />
      </Grid>
    </Grid>
  );
}
