import React from 'react';
import { Stack, Typography, Box, Grid } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import Button from '~/components/atoms/Button';

import styles from './styles';
import { useQueryGetAllMemberCourses } from '~/hooks';
import MemberCourseItem from '~/components/molecules/MemberCourseItem';
import toast from '~/utils/toast';
import { scrollToTop } from '~/utils/common';

const texts = {
  title: 'Khoá học đã đăng kí',
  button: 'Đăng kí khóa học',
};

export default function MemberCourseListPage() {
  const navigate = useNavigate();
  const { courses } = useQueryGetAllMemberCourses({
    page: 0,
    size: 1000,
    sort: undefined,
  });

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
          courses?.length > 0 &&
          courses?.map((item) => (
            <Grid
              item
              xs={12}
              md={6}
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
        {courses && courses.length === 0 && (
          <Typography>Bạn chưa đăng kí khóa học nào</Typography>
        )}
      </Grid>
    </Stack>
  );
}
