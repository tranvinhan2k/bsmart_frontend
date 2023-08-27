import { Stack, Typography, Button } from '@mui/material';
import { useContext } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { CourseContext } from '~/HOCs/context/CourseContext';
import {
  Color,
  FontSize,
  FontFamily,
  isAllowUpdateActivity,
} from '~/assets/variables';
import InputGroup, { InputData } from '~/components/atoms/FormInput/InputGroup';
import { useQueryGetOptionMentorCourseClasses } from '~/hooks';
import { QuizQuestionTypeKeys } from '~/models/variables';
import { handleConsoleError } from '~/utils/common';
import { formatStringToNumber } from '~/utils/number';

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

export default function AddQuizForm({ hookForm, onSubmit, onDelete }: Props) {
  const { id } = useParams();
  const courseId = formatStringToNumber(id);
  const { course } = useContext(CourseContext);

  const { optionClasses } = useQueryGetOptionMentorCourseClasses(courseId);
  const inputList: InputData[] = [
    {
      name: 'visible',
      label: 'Hiển thị',
      placeholder: 'Hiển thị bài trắc nghiệm',
      variant: 'boolean',
    },
    {
      name: 'authorizeClasses',
      label: 'Danh sách lớp được sử dụng',
      placeholder: 'Thêm danh sách lớp',
      variant: 'multiSelect',
      data: optionClasses,
      isHide: optionClasses.length === 0,
    },
    {
      name: 'name',
      label: 'Tên bài trắc nghiệm',
      placeholder: 'Nhập tên bài trắc nghiệm',
      variant: 'text',
    },
    {
      name: 'code',
      label: 'Mã bài kiểm tra',
      placeholder: 'Nhập mã bài kiểm tra',
      variant: 'text',
    },
    {
      name: 'isSuffleQuestion',
      label: 'Trộn bài kiểm tra',
      placeholder: 'Trộn bài kiểm tra',
      variant: 'boolean',
    },
    {
      name: 'isAllowReview',
      label: 'Khả năng xem lại',
      placeholder: 'Cho phép học sinh xem lại bài làm',
      variant: 'boolean',
    },
    {
      name: 'allowReviewAfterMin',
      label: 'Thời gian chờ xem lại (phút)',
      placeholder: 'Thời gian được xem lại bài',
      variant: 'number',
    },
    {
      name: 'password',
      label: 'Mật khẩu',
      placeholder: 'Nhập mật khẩu cho bài kiểm tra',
      variant: 'password',
    },
    {
      name: 'quizQuestions',
      label: 'Danh sách câu hỏi',
      placeholder: 'Nhập danh sách câu hỏi',
      variant: 'quizPicker',
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
        Thêm bài kiểm tra trắc nghiệm
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
              {onDelete ? 'Cập nhật bài kiểm tra' : 'Tạo bài trắc nghiệm'}
            </Button>
            {onDelete && (
              <Button
                sx={{
                  marginLeft: 1,
                }}
                onClick={onDelete}
                variant="contained"
                color="error"
              >
                Hủy bài kiểm tra
              </Button>
            )}
          </Stack>
        ) : (
          <Button variant="contained">Cập nhật nội dung</Button>
        )}
      </Stack>
    </Stack>
  );
}
