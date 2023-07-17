import { Box, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import globalStyles from '~/styles';

import { MetricSize } from '~/assets/variables';

import CreateCourseForm from '~/components/molecules/FormComponent/CreateCourseForm';

import {
  useEffectPreventReload,
  useEffectScrollToTop,
  useMutationCreateCourse,
  useTryCatch,
} from '~/hooks';
import {
  MentorCourseActionLink,
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import { PostCourseRequest } from '~/models/request';

export interface SelectedCoursePayload {
  id?: number;
  categoryId?: number;
  subjectId?: number;
  description?: string;
  name?: string;
}

export default function MentorCreateCoursePage() {
  const navigate = useNavigate();

  const { mutationResult } = useMutationCreateCourse();

  const { handleTryCatch } = useTryCatch('tạo khóa học');

  const handleCreateCourse = async (paramCourse: PostCourseRequest) => {
    const response: number | null = await handleTryCatch(async () =>
      mutationResult.mutateAsync(paramCourse)
    );

    navigate(
      `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${response}/${MentorCourseActionLink.tutorial}`
    );
  };

  useEffectScrollToTop();
  useEffectPreventReload();

  return (
    <Box
      sx={{
        borderRadius: MetricSize.small_10,
        width: '100%',
      }}
    >
      <Typography sx={globalStyles.textTitle}>Tạo khóa học mới</Typography>
      <CreateCourseForm
        // selectedCourse={course}
        // onNextStep={handleNextStep}
        onChangeSelectedCourse={handleCreateCourse}
      />
    </Box>
  );
}
