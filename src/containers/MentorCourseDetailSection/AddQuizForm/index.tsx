import { Stack, Typography, Button } from '@mui/material';
import { useContext } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { CourseContext } from '~/HOCs/context/CourseContext';
import { Color, FontSize, FontFamily } from '~/assets/variables';
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
}

export default function AddQuizForm({ hookForm, onSubmit }: Props) {
  const { id } = useParams();
  const courseId = formatStringToNumber(id);
  const { course } = useContext(CourseContext);

  const { optionClasses } = useQueryGetOptionMentorCourseClasses(courseId);
  const inputList: InputData[] = [
    {
      name: 'visible',
      label: 'Hiển thị',
      placeholder: 'Hiện thị bài trắc nghiệm',
      variant: 'boolean',
    },
    {
      name: 'authorizeClasses',
      label: 'Danh sách lớp được sử dụng',
      placeholder: 'Thêm danh sách lớp',
      variant: 'multiSelect',
      data: optionClasses,
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
      name: 'startDate',
      label: 'Ngày bắt đầu',
      placeholder: 'Nhập giờ bắt đầu',
      variant: 'datetime',
    },
    {
      name: 'endDate',
      label: 'Ngày bắt đầu',
      placeholder: 'Nhập giờ kết thúc',
      variant: 'datetime',
    },
    {
      name: 'time',
      label: 'Thời gian làm bài (phút)',
      placeholder: 'Nhập thời gian làm bài',
      variant: 'number',
    },
    {
      name: 'defaultPoint',
      label: 'Điểm đạt yêu cầu',
      placeholder: 'Nhập diểm đạt yêu cầu',
      variant: 'number',
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
      name: 'confirm',
      label: 'Xác nhận mật khẩu',
      placeholder: 'Xác nhận mật khẩu cho bài kiểm tra',
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
        <Button
          color="secondary"
          sx={{
            marginTop: 1,
            color: Color.white,
          }}
          disabled={
            !hookForm.formState.isDirty ||
            (course?.status !== 'EDITREQUEST' &&
              course?.status !== 'REQUESTING')
          }
          onClick={hookForm.handleSubmit(onSubmit, handleConsoleError)}
          variant="contained"
        >
          Tạo bài trắc nghiệm
        </Button>
      </Stack>
    </Stack>
  );
}
