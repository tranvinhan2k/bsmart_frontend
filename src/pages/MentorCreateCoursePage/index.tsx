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
import { useTimeOut } from '~/hooks/useTimeOut';
import {
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import { PostCoursePayload } from '~/models/request';

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

  const { handleTryCatch } = useTryCatch({
    loading: 'Đang tạo khóa học mới',
    error: 'Tạo khóa học thất bại',
    success: 'Tạo khóa học thành công',
  });

  const handleCreateCourse = async (paramCourse: PostCoursePayload) => {
    // ToDO: Goi api create course o day
    const response = await handleTryCatch(() =>
      mutationResult.mutateAsync(paramCourse)
    );
    navigate(
      `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_list}/${response.id}`
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
