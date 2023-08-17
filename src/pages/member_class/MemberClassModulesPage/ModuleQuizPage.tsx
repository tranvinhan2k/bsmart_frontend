import { Box, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadingWrapper } from '~/HOCs';
import { FontSize, FontFamily, Color } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import CustomModal from '~/components/atoms/CustomModal';
import FormInput from '~/components/atoms/FormInput';
import MarkDisplay from '~/components/atoms/MarkDisplay';
import CRUDTable from '~/components/molecules/CRUDTable';
import {
  MemberDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import { validationPassword } from '~/form/validation';
import { useGetIdFromUrl, useYupValidationResolver } from '~/hooks';
import { useGetQuizResult } from '~/hooks/quiz/useGetQuizResult';
import { ActivityQuizPayload } from '~/models/type';
import { reviewQuiz, saveDataQuiz } from '~/redux/user/slice';
import globalStyles from '~/styles';
import { handleConsoleError } from '~/utils/common';
import { formatISODateDateToDisplayDateTime, formatTime } from '~/utils/date';

interface Props {
  name: string;
  item: ActivityQuizPayload;
}

export interface QuizResultPayload {
  point: number;
  correctNumber: number;
  totalQuestion: number;
}

export default function ModuleQuizPage({ name, item }: Props) {
  const id = useGetIdFromUrl('moduleId');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm({});

  const {
    data: results,
    isLoading: isResultLoading,
    error: errorResult,
  } = useGetQuizResult(item.id);

  const quiz = {
    quizId: item.id,
    questionCount: item.questionCount,
    status: item.status,
    isQuizOpen: new Date(item.startDate).getTime() <= new Date().getTime(),
    isAttemptedQuiz: Boolean(results),
    code: item.code,
    startDate: formatISODateDateToDisplayDateTime(item.startDate),
    endDate: formatISODateDateToDisplayDateTime(item.endDate),
    time: formatTime(item.time),
    isAllowAfterMin:
      new Date().getTime() <=
      new Date(item.endDate).getTime() + item.allowReviewAfterMin,
  };

  const onSubmit = (param: any) => {
    dispatch(
      saveDataQuiz({
        quizId: id,
        quizTime: item.time,
        quizPassword: param?.password || '',
        quizName: name,
      })
    );
    navigate(
      `/${NavigationLink.dashboard}/${MemberDashboardNavigationActionLink.quiz}/${id}`
    );
  };

  const onClose = () => {
    setOpen(!open);
  };

  const onReview = (paramId: number) => {
    dispatch(
      reviewQuiz({
        quizId: paramId,
        quizTime: item.time,
        quizName: name,
      })
    );
    navigate(
      `/${NavigationLink.dashboard}/${MemberDashboardNavigationActionLink.review}/${id}`
    );
  };

  return (
    <Stack
      sx={{
        justifyContent: 'center',
      }}
      marginTop={1}
    >
      <Typography
        textAlign="center"
        sx={{
          fontSize: FontSize.medium_24,
          fontFamily: FontFamily.medium,
        }}
      >
        {name}
      </Typography>
      <Stack textAlign="center" margin={2}>
        <Typography
          sx={globalStyles.textLowSmallLight}
        >{`Mã bài kiểm tra: ${quiz.code}`}</Typography>
        <Typography
          sx={globalStyles.textLowSmallLight}
        >{`Bài kiểm tra này sẽ được mở vào ngày ${quiz.startDate}`}</Typography>
        <Typography
          sx={globalStyles.textLowSmallLight}
        >{`Bài kiểm tra sẽ sẽ kết thúc vào ngày ${quiz.endDate}`}</Typography>
        <Typography
          sx={globalStyles.textLowSmallLight}
        >{`Thời gian làm bài: ${quiz.time} phút`}</Typography>
        <Typography
          sx={globalStyles.textLowSmallLight}
        >{`Lượt làm bài kiểm tra: ${quiz.time} phút`}</Typography>
      </Stack>
      {!quiz.isAttemptedQuiz && (
        <Button
          disabled={!quiz.isQuizOpen}
          onClick={onClose}
          variant="contained"
        >
          Vào làm bài
        </Button>
      )}
      {quiz.isAttemptedQuiz && (
        <Stack>
          <LoadingWrapper isLoading={isResultLoading} error={errorResult}>
            <Stack sx={{ minHeight: '300px' }}>
              <DataGrid
                sx={{
                  '.MuiDataGrid-columnHeader': {
                    background: Color.white4,
                    fontSize: FontSize.small_14,
                    fontFamily: FontFamily.bold,
                  },
                }}
                hideFooter
                columns={[
                  {
                    field: 'submitAt',
                    headerName: 'Thời gian đã làm',
                    flex: 2,
                    renderCell: (params) => {
                      return formatISODateDateToDisplayDateTime(
                        params.row.submitAt
                      );
                    },
                  },
                  {
                    field: 'correctNumber',
                    headerName: 'Số câu trả lời đúng',
                    width: 150,
                  },
                  {
                    field: 'totalQuestion',
                    headerName: 'Tổng số câu hỏi',
                    width: 150,
                  },
                  {
                    field: 'point',
                    headerName: 'Điểm',
                    width: 150,
                  },
                  {
                    field: 'reviewFeatures',
                    headerName: 'Xem lại kết quả',
                    flex: 1,
                    renderCell: (params) => {
                      return (
                        quiz.isAllowAfterMin && (
                          <Button
                            sx={{ marginTop: 1 }}
                            disabled={!item.isAllowReview}
                            onClick={() => onReview(params.row.id)}
                            color="success"
                            variant="contained"
                          >
                            Xem lại kết quả
                          </Button>
                        )
                      );
                    },
                  },
                ]}
                rows={results || []}
              />
            </Stack>
          </LoadingWrapper>
        </Stack>
      )}

      <CustomModal
        open={open}
        onClose={onClose}
        title="Xác nhận tham gia làm bài kiểm tra"
      >
        <Stack
          sx={{
            maxWidth: { xs: '100%', md: '50vw' },
          }}
        >
          <Typography
            sx={{
              marginTop: 1,
              fontSize: FontSize.small_14,
              fontFamily: FontFamily.light,
            }}
          >
            Vui lòng nhập mật khẩu để vào làm bài kiểm tra. Khi mà bạn đã nhập
            mật khẩu, hệ thống sẽ điều hướng bạn tới trang làm kiểm tra. Bạn có
            chắc chắn muốn làm bài kiểm tra không ?
          </Typography>
          <Stack marginY={2}>
            <FormInput control={control} name="password" variant="password" />
          </Stack>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            marginTop={1}
          >
            <Button
              onClick={handleSubmit(onSubmit, handleConsoleError)}
              variant="contained"
            >
              Xác nhận
            </Button>
            <Button
              onClick={onClose}
              sx={{
                marginLeft: 1,
              }}
              variant="contained"
              color="error"
            >
              Hủy bỏ
            </Button>
          </Stack>
        </Stack>
      </CustomModal>
    </Stack>
  );
}
