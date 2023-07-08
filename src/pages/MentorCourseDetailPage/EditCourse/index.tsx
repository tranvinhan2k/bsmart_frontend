import { useState } from 'react';

import { Stack, Box } from '@mui/material';
// eslint-disable-next-line import/no-cycle
import { DetailCoursePayload } from '..';
import FormInput from '~/components/atoms/FormInput';
import {
  useMutationUpdateCourse,
  useTryCatch,
  useUpdateCourseForm,
} from '~/hooks';
import Button from '~/components/atoms/Button';
import { Color } from '~/assets/variables';
import { useTimeOut } from '~/hooks/useTimeOut';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import { PutCoursePayload } from '~/models';
import { handleConsoleError } from '~/utils/common';

interface Props {
  id: number;
  course: DetailCoursePayload;
}

export default function EditCourse({ id, course }: Props) {
  const [open, setOpen] = useState(false);

  const { handleTryCatch } = useTryCatch('cập nhật khóa học');
  const { mutateAsync } = useMutationUpdateCourse();

  const deleteCourse = useTryCatch('xóa khóa học');

  const { onSleep } = useTimeOut(1000);

  const handleClose = () => {
    setOpen(!open);
  };

  const handleUpdateCourse = async (param: PutCoursePayload) => {
    await handleTryCatch(async () => mutateAsync({ id, param }));
  };

  const handleDeleteCourse = async () => {
    await deleteCourse.handleTryCatch(() => onSleep(true));
  };

  const { hookForm, categories, filterSubjects, handleSubmit } =
    useUpdateCourseForm(course, handleUpdateCourse);
  return (
    <Stack>
      <FormInput
        disabled
        label="Mã khóa học"
        control={hookForm.control}
        name="code"
      />
      <Stack marginTop={2} />
      <FormInput label="Tên khóa học" control={hookForm.control} name="name" />
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
  );
}
