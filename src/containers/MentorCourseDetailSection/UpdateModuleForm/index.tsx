import { Stack, Typography, Button } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Color, FontSize, FontFamily } from '~/assets/variables';
import InputGroup, { InputData } from '~/components/atoms/FormInput/InputGroup';
import { validationClassContentSection } from '~/form/validation';
import {
  useGetIdFromUrl,
  useQueryGetOptionMentorCourseClasses,
  useYupValidationResolver,
} from '~/hooks';
import { ActivityPayload } from '~/models/type';

interface Props {
  module: ActivityPayload;
  onSubmit: (data: any) => void;
}

export default function UpdateModuleForm({ module, onSubmit }: Props) {
  const courseId = useGetIdFromUrl('id');

  const { optionClasses } = useQueryGetOptionMentorCourseClasses(courseId);

  const resolver = useYupValidationResolver(validationClassContentSection);
  const hookForm = useForm({
    resolver,
    defaultValues: useMemo(() => {
      return module;
    }, [module]),
  });

  useEffect(() => {
    hookForm.reset(module);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module]);

  const inputList: InputData[] = [
    {
      label: 'Tên bài học',
      name: 'name',
      placeholder: 'Nhập tên học phần',
      variant: 'text',
    },
    {
      label: 'Mô tả học phần',
      name: 'description',
      placeholder: 'Nhập nội dung mô tã học phần',
      variant: 'editor',
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
      isHide: optionClasses.length === 0,
    },
  ];

  return (
    <Stack
      sx={{
        transition: 'all 1000ms ease',
        marginTop: 1,
        width: '100%',
      }}
    >
      <Typography
        sx={{
          fontSize: FontSize.small_16,
          fontFamily: FontFamily.medium,
          marginBottom: 1,
        }}
      >
        Cập nhật
      </Typography>
      <Stack>
        <InputGroup inputList={inputList} control={hookForm.control} />
        <Button
          color="secondary"
          sx={{
            color: Color.white,
            marginTop: 1,
          }}
          onClick={hookForm.handleSubmit((data: any) => {
            onSubmit({ ...data, id: module.id });
          })}
          variant="contained"
        >
          Cập nhật
        </Button>
      </Stack>
    </Stack>
  );
}
