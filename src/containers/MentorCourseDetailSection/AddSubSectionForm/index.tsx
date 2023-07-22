import { Stack, Typography, Button } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { Color, FontSize, FontFamily } from '~/assets/variables';
import InputGroup, { InputData } from '~/components/atoms/FormInput/InputGroup';
import { useGetIdFromUrl, useQueryGetOptionMentorCourseClasses } from '~/hooks';

interface Props {
  hookForm: UseFormReturn<any, any>;
  onSubmit: (data: any) => void;
  onDelete?: (data: any) => void;
}

export default function AddSubSectionForm({
  hookForm,
  onSubmit,
  onDelete,
}: Props) {
  const courseId = useGetIdFromUrl('id');

  const { optionClasses } = useQueryGetOptionMentorCourseClasses(courseId);

  const inputList: InputData[] = [
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
  ];
  return (
    <Stack>
      <Typography
        sx={{
          fontSize: FontSize.small_16,
          fontFamily: FontFamily.medium,
        }}
      >
        Thêm bài học
      </Typography>

      <Stack
        sx={{
          marginTop: 1,
        }}
      >
        <Stack>
          <InputGroup inputList={inputList} control={hookForm.control} />
        </Stack>
        <Stack
          sx={{
            marginTop: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Button
            disabled={!hookForm.formState.isDirty}
            color="secondary"
            sx={{
              color: Color.white,
            }}
            onClick={hookForm.handleSubmit(onSubmit)}
            variant="contained"
          >
            {onDelete ? 'Cập nhật nội dung' : 'Tạo bài học'}
          </Button>
          {Boolean(onDelete) && (
            <Button
              color="error"
              sx={{
                marginLeft: 1,
                color: Color.white,
              }}
              onClick={onDelete}
              variant="contained"
            >
              Xóa bài học
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}