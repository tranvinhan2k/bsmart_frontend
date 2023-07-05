import { useState } from 'react';

import { Stack, Box } from '@mui/material';
// eslint-disable-next-line import/no-cycle
import { DetailCoursePayload } from '..';
import FormInput from '~/components/atoms/FormInput';
import { useTryCatch, useUpdateCourseForm } from '~/hooks';
import Button from '~/components/atoms/Button';
import { Color } from '~/assets/variables';
import { useTimeOut } from '~/hooks/useTimeOut';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';

interface Props {
  course: DetailCoursePayload;
}

export default function EditCourse({ course }: Props) {
  const [open, setOpen] = useState(false);

  const { handleTryCatch } = useTryCatch({
    loading: 'Đang cập nhật khóa học',
    success: 'Cập nhật khóa học thành công',
    error: 'Cập nhật khóa học thất bại',
  });

  const deleteCourse = useTryCatch({
    loading: 'Đang xóa khóa học ...',
    success: 'Xóa khóa học thành công.',
    error: 'Xóa khóa học thất bại',
  });

  const { onSleep } = useTimeOut(1000);

  const handleClose = () => {
    setOpen(!open);
  };

  const handleLoadUpdateApi = async () => {
    await handleTryCatch(() => onSleep(true));
  };

  const handleDeleteCourse = async () => {
    await deleteCourse.handleTryCatch(() => onSleep(true));
  };

  const { hookForm, optionCategories, optionSubjects, handleUpdateCourse } =
    useUpdateCourseForm(course, handleLoadUpdateApi);
  return (
    <Stack>
      <FormInput label="Tên khóa học" control={hookForm.control} name="name" />
      <Stack marginTop={2} />
      <FormInput
        variant="dropdown"
        data={optionSubjects}
        label="Lĩnh Vực"
        control={hookForm.control}
        name="categoryId"
      />
      <Stack marginTop={2} />
      <FormInput
        variant="dropdown"
        data={optionCategories}
        label="Môn học"
        control={hookForm.control}
        name="subjectId"
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
          onClick={hookForm.handleSubmit(handleUpdateCourse, (e) =>
            console.log(e)
          )}
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
  );
}
