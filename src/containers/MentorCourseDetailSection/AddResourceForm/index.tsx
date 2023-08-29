import { Stack, Typography, Button, FormHelperText } from '@mui/material';
import { useContext } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CourseContext } from '~/HOCs/context/CourseContext';
import {
  Color,
  FontSize,
  FontFamily,
  isAllowUpdateActivity,
} from '~/assets/variables';
import InputGroup, { InputData } from '~/components/atoms/FormInput/InputGroup';
import { useGetIdFromUrl, useQueryGetOptionMentorCourseClasses } from '~/hooks';
import { QuizQuestionTypeKeys } from '~/models/variables';
import { handleConsoleError } from '~/utils/common';

export type AddSubSectionFormPayload =
  | ({
      name: string;
      visible: boolean;
      parentActivityId: 0;
      authorizeClasses: [0];
      courseId: 0;
    } & {
      type: 'LESSON';
    })
  | {
      type: 'QUIZ';
      code: string;
      startDate: string;
      endDate: string;
      time: number;
      defaultPoint: number;
      isSuffleQuestion: boolean;
      isAllowReview: boolean;
      allowReviewAfterMin: number;
      password: string;
      quizQuestions: {
        question: string;
        questionType: QuizQuestionTypeKeys;
        answers: {
          answer: string;
          isRight: boolean;
        }[];
      }[];
    };

interface Props {
  hookForm: UseFormReturn<any, any>;
  onSubmit: (data: any) => void;
  onDelete?: () => void;
}

export default function AddResourceForm({
  hookForm,
  onSubmit,
  onDelete,
}: Props) {
  const courseId = useGetIdFromUrl('id');
  const { course } = useContext(CourseContext);

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
      isHide: optionClasses.length === 0,
    },
    {
      label: 'Tên tài nguyên',
      name: 'name',
      placeholder: 'Nhập tên học phần',
      variant: 'text',
    },
    {
      label: 'Tệp đính kèm',
      name: 'file.0',
      placeholder: 'Nhập tệp đính kèm',
      variant: 'file',
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
        Thêm tài nguyên môn học
      </Typography>
      <Stack
        sx={{
          marginTop: 1,
        }}
      >
        <InputGroup control={hookForm.control} inputList={inputList} />
        {hookForm.getFieldState('file').invalid && (
          <FormHelperText error>{`${
            hookForm.getFieldState('file')?.error?.message
          }`}</FormHelperText>
        )}
        {isAllowUpdateActivity(course.status) ? (
          <Stack
            sx={{
              marginTop: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Button
              color="secondary"
              sx={{
                color: Color.white,
              }}
              onClick={hookForm.handleSubmit(onSubmit, handleConsoleError)}
              variant="contained"
            >
              {!onDelete ? 'Tạo tài nguyên' : 'Lưu thay đổi'}
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
        ) : (
          <Button variant="contained">Cập nhật tài nguyên</Button>
        )}
      </Stack>
    </Stack>
  );
}
