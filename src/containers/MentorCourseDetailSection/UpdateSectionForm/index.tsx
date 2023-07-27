import { Stack, Typography, Button } from '@mui/material';
import { useContext, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { CourseContext } from '~/HOCs/context/CourseContext';
import {
  Color,
  FontSize,
  FontFamily,
  isAllowUpdateActivity,
} from '~/assets/variables';
import InputGroup, { InputData } from '~/components/atoms/FormInput/InputGroup';
import { validationClassContentSection } from '~/form/validation';
import {
  useGetIdFromUrl,
  useQueryGetOptionMentorCourseClasses,
  useYupValidationResolver,
} from '~/hooks';
import { ActivityDetailPayload } from '~/models/type';

interface Props {
  section: ActivityDetailPayload | undefined;
  onSubmit: (data: any) => void;
  onDelete: () => void;
}

export default function UpdateSectionForm({
  section,
  onSubmit,
  onDelete,
}: Props) {
  const { course } = useContext(CourseContext);
  const courseId = useGetIdFromUrl('id');
  const { optionClasses } = useQueryGetOptionMentorCourseClasses(courseId);

  const resolver = useYupValidationResolver(validationClassContentSection);

  const hookForm = useForm({
    resolver,
    defaultValues: useMemo(() => {
      return section;
    }, [section]),
  });

  useEffect(() => {
    hookForm.reset(section);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  const inputList: InputData[] = [
    {
      label: 'Tên học phần',
      name: 'name',
      placeholder: 'Nhập tên học phần',
      variant: 'text',
    },
    {
      label: 'Hiển thị',
      name: 'visible',
      placeholder: 'Hiển thị nội dung',
      variant: 'boolean',
    },
    {
      label: 'Danh sách lớp được quyền xem nội dung này',
      name: 'authorizeClasses',
      placeholder: 'Hiển thị danh sách lớp',
      variant: 'multiSelect',
      data: optionClasses,
    },
  ];

  return (
    <Stack
      sx={{
        transition: 'all 1000ms ease',
        marginTop: 3,
      }}
    >
      <Stack>
        <InputGroup control={hookForm.control} inputList={inputList} />
        <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button
            disabled={
              !hookForm.formState.isDirty ||
              !isAllowUpdateActivity(course.status) ||
              section?.isFixed
            }
            color="secondary"
            sx={{
              color: Color.white,
            }}
            onClick={hookForm.handleSubmit((data: any) => {
              onSubmit({ ...data, id: section?.id || 0 });
              hookForm.reset();
            })}
            variant="contained"
          >
            Lưu thay đổi
          </Button>
          <Button
            disabled={!isAllowUpdateActivity(course.status) || section?.isFixed}
            onClick={onDelete}
            sx={{
              marginLeft: 1,
            }}
            variant="contained"
            color="error"
          >
            Xóa học phần
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
