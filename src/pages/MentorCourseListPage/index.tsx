import { Stack, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import { FontFamily, FontSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import MentorCourseItem from '~/components/molecules/MentorCourseItem';
import { useQueryGetAllMentorCourses } from '~/hooks';
import { RequestPagingFilterPayload } from '~/models';
import { scrollToTop } from '~/utils/common';

export default function MentorCourseListPage() {
  const [filterParams, setFilterParams] = useState<RequestPagingFilterPayload>({
    page: 0,
    size: 9,
    sort: undefined,
    status: 'REQUESTING',
  });

  const { courses } = useQueryGetAllMentorCourses(filterParams);

  const handleChangePageNumber = (e: any, value: number) => {
    setFilterParams({
      ...filterParams,
      page: value - 1,
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Stack>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Typography
          sx={{ fontSize: FontSize.medium_28, fontFamily: FontFamily.bold }}
        >
          Khoá học đã tạo
        </Typography>
        <Box>
          <Button customVariant="normal">Tạo khóa học</Button>
        </Box>
      </Stack>
      <Grid
        container
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {courses &&
          courses?.items?.map((item) => (
            <Grid
              item
              xs={12}
              md={6}
              key={item.id}
              sx={{ alignItems: 'stretch' }}
            >
              <MentorCourseItem onClick={() => {}} item={item} key={item.id} />
            </Grid>
          ))}
      </Grid>
      <Stack
        sx={{ justifyContent: 'center', alignItems: 'center', marginTop: 2 }}
      >
        {courses && (
          <Pagination
            page={courses.currentPage}
            onChange={handleChangePageNumber}
            count={courses.totalPages}
          />
        )}
        {courses && courses.items.length === 0 && (
          <Typography>Bạn chưa đăng kí khóa học nào</Typography>
        )}
      </Stack>
    </Stack>
  );
}
