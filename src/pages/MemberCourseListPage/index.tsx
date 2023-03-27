import React from 'react';
import { Stack, Typography, Box } from '@mui/material';

import { FontFamily, FontSize } from '~/assets/variables';

import Button from '~/components/atoms/Button';
import CourseItem from '~/components/molecules/CourseItem';

import { MentorCourses } from '~/constants';

import { scrollToTop } from '~/utils/common';

import styles from './styles';
import { useQueryGetAllMemberCourses } from '~/hooks';
import MemberCourseItem from '~/components/molecules/MemberCourseItem';
import toast from '~/utils/toast';

const texts = {
  title: 'Khoá học đã đăng kí',
  button: 'Tạo khóa học',
};

export default function MemberCourseListPage() {
  const { error, courses, isLoading } = useQueryGetAllMemberCourses({
    page: 0,
    size: 1000,
    sort: undefined,
  });

  React.useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Stack>
      <Stack sx={styles.stack1}>
        <Typography sx={styles.typography1}>{texts.title}</Typography>
        <Box>
          <Button customVariant="normal">{texts.button}</Button>
        </Box>
      </Stack>
      <Stack sx={styles.stack2}>
        {courses?.map((item) => (
          <MemberCourseItem
            onClick={() => {
              toast.notifyWarningToast('Tính năng đang phát triển.');
            }}
            item={item}
            key={item.id}
          />
        ))}
      </Stack>
    </Stack>
  );
}
