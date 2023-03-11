import { Stack, Typography, TextField, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Button from '~/components/atoms/Button';
import CollapseStack from '~/components/atoms/CollapseStack';
import FormInput from '~/components/atoms/FormInput';
import { OptionPayload } from '~/models';
import { CourseModulePayload } from '~/models/courses';
import Icon from '~/components/atoms/Icon';
import { CREATE_COURSE_FIELDS } from '~/form/schema';
import useYupValidationResolver from '~/hooks/useYupValidationResolver';
import { validationSchemaCreateCourse } from '~/form/validation';
import { defaultValueCreateCourse } from '~/form/defaultValues';
// TODO : Not implement useHookForm yet !! waiting for API to start
const mockLevelData: OptionPayload[] = [
  {
    id: 0,
    label: 'Beginner',
    value: 'BEGINNER',
  },
  {
    id: 1,
    label: 'Intermediate',
    value: 'Intermediate',
  },
  {
    id: 2,
    label: 'Advanced',
    value: 'Advanced',
  },
  {
    id: 3,
    label: 'Expert',
    value: 'Expert',
  },
];
const mockSubjectTypeData: OptionPayload[] = [
  {
    id: 0,
    label: 'Front End',
    value: 'Front End',
  },
  {
    id: 1,
    label: 'Back End',
    value: 'Back End',
  },
];
const mockSlotNumber: OptionPayload[] = [
  {
    id: 0,
    label: 'Slot 1',
    value: '1',
  },
  {
    id: 1,
    label: 'Slot 2',
    value: '2',
  },
];
const mockDayOfWeek: OptionPayload[] = [
  {
    id: 0,
    label: 'Thu 2',
    value: '2',
  },
  {
    id: 1,
    label: 'Thu 3',
    value: '3',
  },
];

export default function CreateCourseForm() {
  const resolverCreateCourse = useYupValidationResolver(
    validationSchemaCreateCourse
  );
  const createCourseHookForm = useForm({
    defaultValues: defaultValueCreateCourse,
    resolver: resolverCreateCourse,
  });

  function onSubmitSuccess(data: any) {
    console.log(data);
    // TODO: add create course api
  }
  return (
    <Stack>
      <form onSubmit={createCourseHookForm.handleSubmit(onSubmitSuccess)}>
        <CollapseStack label="Thông tin khóa học">
          <Stack padding={1}>
            <FormInput
              name={CREATE_COURSE_FIELDS.name}
              control={createCourseHookForm.control}
              label="Tên Khóa Học"
            />
            <FormInput
              data={mockLevelData}
              variant="radioGroup"
              name={CREATE_COURSE_FIELDS.level}
              control={createCourseHookForm.control}
              label="Trình độ"
            />
            <FormInput
              data={mockSubjectTypeData}
              variant="image"
              name={CREATE_COURSE_FIELDS.image}
              control={createCourseHookForm.control}
              label="Hình ảnh"
            />
            <FormInput
              data={mockSubjectTypeData}
              variant="dropdown"
              name={CREATE_COURSE_FIELDS.category}
              control={createCourseHookForm.control}
              label="Lĩnh Vực"
            />
            <FormInput
              data={mockSubjectTypeData}
              variant="dropdown"
              name={CREATE_COURSE_FIELDS.programmingLanguage}
              control={createCourseHookForm.control}
              label="Ngôn ngữ lập trình"
            />
            <FormInput
              data={mockSubjectTypeData}
              variant="dropdown"
              name={CREATE_COURSE_FIELDS.type}
              control={createCourseHookForm.control}
              label="Hình thức khóa học"
            />
            <FormInput
              name={CREATE_COURSE_FIELDS.courseDescription}
              variant="multiline"
              control={createCourseHookForm.control}
              label="Mô tả khóa học"
            />
          </Stack>
        </CollapseStack>
        <Stack marginTop={2}>
          <Button
            onClick={createCourseHookForm.handleSubmit(onSubmitSuccess)}
            customVariant="form"
          >
            TẠO KHÓA HỌC
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
