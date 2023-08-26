import { Stack, Typography, Button } from '@mui/material';
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
  isFixed: boolean;
  hookForm: UseFormReturn<any, any>;
  onSubmit: (data: any) => void;
  onDelete?: () => void;
}

export default function AddAssignmentForm({
  isFixed,
  hookForm,
  onSubmit,
  onDelete,
}: Props) {
  const courseId = useGetIdFromUrl('id');
  const { optionClasses } = useQueryGetOptionMentorCourseClasses(courseId);
  const { course } = useContext(CourseContext);

  const inputList: InputData[] = [
    {
      label: 'Hiển thị',
      name: 'visible',
      placeholder: 'Hiển thị',
      variant: 'boolean',
    },
    {
      label: 'Danh sách khóa học được phép xem bài tập',
      name: 'authorizeClasses',
      placeholder: '',
      variant: 'multiSelect',
      data: optionClasses,
    },
    {
      label: 'Tên bài tập',
      name: 'name',
      placeholder: 'Nhập tên bài tập',
      variant: 'text',
    },
    {
      label: 'Mô tả bài tập',
      name: 'description',
      placeholder: 'Nhập mô tả khóa học',
      variant: 'editor',
    },
    {
      label: 'Thời gian được chỉnh sửa (phút)',
      name: 'editBeForSubmitMin',
      placeholder: 'Nhập thời gian được chỉnh sửa',
      variant: 'number',
    },
    {
      label: 'Số lượng tệp cho phép',
      name: 'maxFileSubmit',
      placeholder: 'Thêm số lượng tệp cho phép',
      variant: 'number',
    },
    {
      label: 'Dung Lượng tệp cho phép (MB)',
      name: 'maxFileSize',
      placeholder: 'Thêm dung lượng tệp cho phép',
      variant: 'number',
    },
    {
      label: 'Điểm đạt yêu cầu',
      name: 'passPoint',
      placeholder: 'Nhập điểm đạt yêu cầu',
      variant: 'number',
    },
    {
      label: 'Danh sách tệp đính kèm',
      name: 'attachFiles',
      placeholder: '',
      variant: 'files',
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
        Thêm bài kiểm tra tự luận
      </Typography>
      <Stack
        sx={{
          marginTop: 1,
        }}
      >
        <InputGroup control={hookForm.control} inputList={inputList} />
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
              {onDelete ? 'Lưu thay đổi' : 'Thêm bài kiểm tra tự luận'}
            </Button>
            {Boolean(onDelete) && (
              <Button
                sx={{
                  marginLeft: 1,
                }}
                onClick={onDelete}
                variant="contained"
                color="error"
              >
                Xóa bài tập
              </Button>
            )}
          </Stack>
        ) : (
          <Button variant="contained">Cập nhật bài tập</Button>
        )}
      </Stack>
    </Stack>
  );
}
