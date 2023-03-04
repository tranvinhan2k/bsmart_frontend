import { Stack } from '@mui/material';
import { useEffect } from 'react';
import CreateCourseForm from '~/components/molecules/FormComponent/CreateCourseForm';
import { scrollToTop } from '~/utils/common';

export default function MentorCreateCoursePage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <Stack>
      <CreateCourseForm />
    </Stack>
  );
}
