import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontSize, FontFamily } from '~/assets/variables';
import {
  MemberDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import { useGetIdFromUrl } from '~/hooks';
import { useGetQuizResult } from '~/hooks/quiz/useGetQuizResult';
import { ActivityQuizPayload } from '~/models/type';
import { reviewQuiz, saveDataQuiz } from '~/redux/user/slice';
import globalStyles from '~/styles';
import { formatTime } from '~/utils/date';
import MentorClassPointsPage from '../MentorClassPointsPage';

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

  const { data } = useGetQuizResult(id);

  const quiz = {
    isQuizOpen: true,
    isAttemptedQuiz: Boolean(data),
    code: item.code,
    time: formatTime(item.time),
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

  const onReview = () => {
    dispatch(
      reviewQuiz({
        quizId: id,
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
        alignItems: 'center',
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
      <Stack style={{ width: '100%' }}>
        <MentorClassPointsPage quizId={item.id} />
      </Stack>
    </Stack>
  );
}
