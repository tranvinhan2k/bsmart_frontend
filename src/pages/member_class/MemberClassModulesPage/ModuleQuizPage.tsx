import { Stack, Typography } from '@mui/material';
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
import {
  MemberDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import { useGetIdFromUrl } from '~/hooks';
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
    isQuizOpen: true,
    isAttemptedQuiz: results?.length !== 0,
    code: item.code,
    time: formatTime(item.time),
    isAllowAfterMin: true,
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
        >{`Số câu hỏi: ${item.questionCount}`}</Typography>
        <Typography sx={globalStyles.textLowSmallLight}>{`Cho phép xem lại : ${
          item.isAllowReview ? 'Có' : 'Không'
        }`}</Typography>
        <Typography
          sx={globalStyles.textLowSmallLight}
        >{`Thời gian được phép xem lại sau khi làm bài: ${item.allowReviewAfterMin} phút`}</Typography>
      </Stack>

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
                    headerName: 'Xem lại bài làm',
                    flex: 1,
                    renderCell: (params) => {
                      return (
                        <Button
                          disabled={!item.isAllowReview}
                          onClick={() => onReview(params.row.id)}
                          color="success"
                          variant="contained"
                        >
                          Xem lại bài làm
                        </Button>
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

      <Button
        sx={{ marginTop: 1 }}
        disabled={!quiz.isQuizOpen}
        onClick={onClose}
        variant="contained"
      >
        Vào làm bài
      </Button>
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
