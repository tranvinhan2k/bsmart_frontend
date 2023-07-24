import { UseFormReturn } from 'react-hook-form';

import { Alert, Stack, Typography } from '@mui/material';

import { Color } from '~/assets/variables';

import FormInput from '~/components/atoms/FormInput';

import { CREATE_COURSE_FIELDS } from '~/form/schema';

import { OptionPayload } from '~/models';

export interface PrivateCourseTabProps {
  categories: OptionPayload[] | undefined;
  levels: OptionPayload[] | undefined;
  subjects: OptionPayload[] | undefined;
  createCourseHookForm: UseFormReturn<any, any>;
}

export default function PrivateCourseTab({
  categories,
  subjects,
  levels,
  createCourseHookForm,
}: PrivateCourseTabProps) {
  if (!categories && !subjects)
    return (
      <Alert severity="error">
        Tài khoản đang dùng chưa phải là giáo viên chính thức hoăc tài khoản
        chưa hợp lệ. Nên không được phép tạo khóa học
      </Alert>
    );
  return (
    <Stack
      sx={{
        background: Color.white,
      }}
    >
      {/* <Typography sx={globalStyles.textSubTitle}>Khóa học tự tạo</Typography>
      <Typography sx={globalStyles.textLowSmallLight}>
        Khóa học tự tạo cho phép giáo viên tự tạo khóa học mới cho riêng mình.
        Chế độ này cho phép giáo viên tự điều chỉnh nội dung giảng dạy.
      </Typography> */}
      <Stack marginTop={1}>
        <FormInput
          name={CREATE_COURSE_FIELDS.name}
          control={createCourseHookForm.control}
          label="Tên Khóa Học"
          placeholder="Nhập tên khóa học"
        />
      </Stack>
      <Stack marginTop={1}>
        <FormInput
          data={categories}
          variant="dropdown"
          name={CREATE_COURSE_FIELDS.categoryId}
          control={createCourseHookForm.control}
          label="Lĩnh Vực"
          placeholder="Nhập lĩnh vực"
        />
      </Stack>
      <Stack marginTop={1}>
        <FormInput
          data={subjects}
          variant="dropdown"
          name={CREATE_COURSE_FIELDS.subjectId}
          control={createCourseHookForm.control}
          label="Ngôn ngữ"
          placeholder="Nhập ngôn ngữ lập trình"
        />
      </Stack>
      <Stack marginTop={1}>
        <FormInput
          data={levels}
          variant="radioGroup"
          name={CREATE_COURSE_FIELDS.level}
          control={createCourseHookForm.control}
          label="Trình độ"
          placeholder="Nhập trình độ của bạn"
        />
      </Stack>
      <Stack marginTop={1}>
        <FormInput
          name={CREATE_COURSE_FIELDS.description}
          variant="editor"
          control={createCourseHookForm.control}
          label="Mô tả khóa học"
          placeholder="Nhập mô tả khóa học"
        />
      </Stack>
    </Stack>
  );
}
