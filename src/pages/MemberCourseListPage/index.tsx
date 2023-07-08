import React, { useState } from 'react';
import { Stack, Typography, Box, Grid } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Button from '~/components/atoms/Button';

import styles from './styles';
import { useQueryGetAllMemberCourses } from '~/hooks';
import MemberCourseItem from '~/components/molecules/MemberCourseItem';
import toast from '~/utils/toast';
import { scrollToTop } from '~/utils/common';
import { PagingRequestPayload } from '~/models';
import CustomPagination from '~/components/atoms/CustomPagination';

const texts = {
  title: 'Khoá học đã đăng kí',
  button: 'Đăng kí khóa học',
};

export default function MemberCourseListPage() {
  const navigate = useNavigate();
  const [filterParams, setFilterParams] = useState<PagingRequestPayload>({
    q: '',
    page: 0,
    size: 9,
    sort: undefined,
    status: 'NOTSTART',
  });
  const { courses } = useQueryGetAllMemberCourses(filterParams);

  const handleChangePageNumber = (e: any, value: number) => {
    setFilterParams({
      ...filterParams,
      page: value - 1,
    });
  };

  const handleNavigateCourseMenu = () => {
    navigate('/course_menu');
  };

  React.useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Stack>
      <Stack sx={styles.stack1}>
        <Typography sx={styles.typography1}>{texts.title}</Typography>
        <Box>
          <Button onClick={handleNavigateCourseMenu} customVariant="normal">
            {texts.button}
          </Button>
        </Box>
      </Stack>
      <Grid container sx={styles.stack2}>
        {courses &&
          courses?.items.length > 0 &&
          courses?.items.map((item) => (
            <Grid
              item
              xs={12}
              md={4}
              key={item.id}
              sx={{ alignItems: 'stretch' }}
            >
              <MemberCourseItem
                onClick={() => {
                  toast.notifyWarningToast('Tính năng đang phát triển.');
                }}
                item={item}
              />
            </Grid>
          ))}
        {courses && courses.items.length === 0 && (
          <Typography>Bạn chưa đăng kí khóa học nào</Typography>
        )}
      </Grid>
      <Stack
        sx={{ justifyContent: 'center', alignItems: 'center', marginTop: 2 }}
      >
        {courses && courses.items.length > 0 && (
          <CustomPagination
            currentPage={courses.currentPage}
            onChange={handleChangePageNumber}
            totalPages={courses.totalPages}
          />
        )}
      </Stack>
    </Stack>
  );
}
