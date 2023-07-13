import { useState } from 'react';

import { Stack, Box } from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import { MentorDetailCoursePayload } from '../../MentorCourseDetailPage';
import FormInput from '~/components/atoms/FormInput';
import {
  useMutationDeleteCourse,
  useMutationUpdateCourse,
  useQueryGetAllPublicCourses,
  useTryCatch,
  useUpdateCourseForm,
} from '~/hooks';
import Button from '~/components/atoms/Button';
import { Color } from '~/assets/variables';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import { PutCourseRequest } from '~/models';
import { handleConsoleError } from '~/utils/common';
import {
  MentorCourseActionLink,
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import { formatStringToNumber } from '~/utils/number';
import { useQueryGetDetailUserCourse } from '~/hooks/course/useQueryGetDetailUserCourse';
import { LoadingWrapper } from '~/HOCs';

export default function MentorCourseInformationPage() {
  const { id } = useParams();
  const courseId = formatStringToNumber(id);

  const { data, error, isLoading } = useQueryGetDetailUserCourse(courseId);

  const tempCourse = data?.course;

  const course: MentorDetailCoursePayload | undefined = {
    description: tempCourse?.courseDescription || '',
    categoryId: tempCourse?.category || {
      id: 0,
      value: '',
      label: '',
    },
    code: tempCourse?.courseCode || '',
    level: tempCourse?.level || 'ADVANCED',
    name: tempCourse?.courseName || '',
    status: tempCourse?.status || 'REQUESTING',
    subjectId: tempCourse?.subject || {
      id: 0,
      value: '',
      label: '',
    },
  };

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { handleTryCatch } = useTryCatch('cập nhật khóa học');
  const { mutateAsync } = useMutationUpdateCourse();
  const { mutateAsync: mutateDeleteAsync } = useMutationDeleteCourse();

  const deleteCourse = useTryCatch('xóa khóa học');

  const handleClose = () => {
    setOpen(!open);
  };

  const handleUpdateCourse = async (param: PutCourseRequest) => {
    await handleTryCatch(async () => mutateAsync({ id, param }));
  };

  const handleDeleteCourse = async () => {
    await deleteCourse.handleTryCatch(async () => mutateDeleteAsync(id));
    navigate(
      `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_list}`
    );
  };

  const { hookForm, categories, filterSubjects, levels, handleSubmit } =
    useUpdateCourseForm(course, handleUpdateCourse);

  return (
    <LoadingWrapper isLoading={isLoading} error={error}>
      <Stack>
        <FormInput
          disabled
          label="Mã khóa học"
          control={hookForm.control}
          name="code"
        />
        <Stack marginTop={2} />
        <FormInput
          label="Tên khóa học"
          control={hookForm.control}
          name="name"
        />
        <Stack marginTop={2} />
        <FormInput
          variant="dropdown"
          data={categories}
          label="Lĩnh Vực"
          control={hookForm.control}
          name="categoryId"
        />
        <Stack marginTop={2} />
        <FormInput
          variant="dropdown"
          data={filterSubjects}
          label="Môn học"
          control={hookForm.control}
          name="subjectId"
        />
        <Stack marginTop={2} />
        <FormInput
          variant="radioGroup"
          data={levels}
          label="Trình độ"
          control={hookForm.control}
          name="level"
        />
        <Stack marginTop={2} />
        <FormInput
          variant="editor"
          label="Mô tả khóa học"
          control={hookForm.control}
          name="description"
        />
        <Box marginTop={1}>
          <Button
            onClick={hookForm.handleSubmit(handleSubmit, handleConsoleError)}
            disabled={!hookForm.formState.isDirty}
            sx={{
              color: Color.white,
            }}
            variant="contained"
            color="secondary"
          >
            Thay đổi thông tin
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              marginLeft: 1,
              color: Color.white,
            }}
            variant="contained"
            color="error"
          >
            Xóa khóa học
          </Button>
          <ConfirmDialog
            open={open}
            handleAccept={handleDeleteCourse}
            handleClose={handleClose}
            content="Bạn có chắc xóa khóa học này ? Khóa học sẽ bị xóa vĩnh viễn không khôi phục lại được."
            title="Xác nhận xóa khóa học"
          />
        </Box>
      </Stack>
    </LoadingWrapper>
  );
}
