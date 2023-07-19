import { Stack, Typography, Button } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { Color, FontSize, FontFamily } from '~/assets/variables';
import FormInput from '~/components/atoms/FormInput';
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
}

export default function AddAssignmentForm({ hookForm, onSubmit }: Props) {
  const courseId = useGetIdFromUrl('id');
  const { optionClasses } = useQueryGetOptionMentorCourseClasses(courseId);

  const inputList: InputData[] = [
    {
      label: 'Tên bài tập',
      name: 'name',
      placeholder: 'Nhập tên bài tập',
      variant: 'text',
    },
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
    },
    {
      label: 'Mô tả bài tập',
      name: 'description',
      placeholder: 'Nhập mô tả khóa học',
      variant: 'multiline',
    },
    {
      label: 'Ngày bắt đầu',
      placeholder: 'Nhập ngày bắt đầu',
      variant: 'datetime',
      name: 'startDate',
    },
    {
      label: 'Ngày kết thúc',
      name: 'endDate',
      placeholder: 'Nhập ngày kết thúc',
      variant: 'datetime',
    },
    {
      label: 'Giới hạn thời gian',
      name: 'editBeForSubmitMin',
      placeholder: 'Nhập giới hạn thời gian',
      variant: 'number',
    },
    {
      label: 'Số lượng tệp cho phép',
      name: 'maxFileSubmit',
      placeholder: 'Thêm số lượng tệp cho phép',
      variant: 'number',
    },
    {
      label: 'Dung Lượng tệp cho phép',
      name: 'maxFileSize',
      placeholder: 'Thêm dung lượng tệp cho phép',
      variant: 'number',
    },
    {
      label: 'Cho phép ghi đè tệp',
      name: 'isOverWriteAttachFile',
      placeholder: 'Cho phép ghi đè tệp',
      variant: 'boolean',
    },
    {
      label: 'Cho phép ghi đè tệp',
      name: 'overWriteAttachFile',
      placeholder: 'Cho phép ghi đè tệp',
      variant: 'boolean',
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
        <Button
          color="secondary"
          sx={{
            marginTop: 1,
            color: Color.white,
          }}
          onClick={hookForm.handleSubmit(onSubmit, handleConsoleError)}
          variant="contained"
        >
          Thêm bài kiểm tra tự luận
        </Button>
      </Stack>
    </Stack>
  );
}
