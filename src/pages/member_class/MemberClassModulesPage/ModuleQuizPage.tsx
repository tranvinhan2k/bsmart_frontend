import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FontSize, FontFamily, Color } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import CustomModal from '~/components/atoms/CustomModal';
import FormInput from '~/components/atoms/FormInput';
import TextList from '~/components/atoms/texts/TextList';
import { image } from '~/constants/image';
import { ActivityQuizPayload } from '~/models/type';
import globalStyles from '~/styles';
import {
  formatDate,
  formatISODateDateToDisplayDateTime,
  formatTime,
} from '~/utils/date';

interface Props {
  name: string;
  item: ActivityQuizPayload;
}

export default function ModuleQuizPage({ name, item }: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm();

  const id = 9;

  const quiz = {
    isQuizOpen: true,
    isAttemptedQuiz: true,
    isPassed: true,
    code: 'hsau678',
    startDate: formatISODateDateToDisplayDateTime(new Date()),
    endDate: formatISODateDateToDisplayDateTime(new Date()),
    time: formatTime(120),
  };

  const isQuizOpen = true;
  const isAttemptedQuiz = false;
  const isPassed = true;

  const point = 10;
  const passPoint = 100;

  const onSubmit = (data: any) => {
    navigate(`/dashboard/quiz/${id}`);
  };

  const onClose = () => {
    setOpen(!open);
  };

  const onReview = () => {};

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
        >{`Bài kiểm tra này sẽ được mở vào ngày ${quiz.startDate}`}</Typography>
        <Typography
          sx={globalStyles.textLowSmallLight}
        >{`Bài kiểm tra sẽ sẽ kết thúc vào ngày ${quiz.endDate}`}</Typography>
        <Typography
          sx={globalStyles.textLowSmallLight}
        >{`Thời gian làm bài: ${quiz.time} phút`}</Typography>
      </Stack>
      {!isAttemptedQuiz && (
        <Button disabled={!isQuizOpen} onClick={onClose} variant="contained">
          Vào làm bài
        </Button>
      )}
      {isAttemptedQuiz && (
        <Stack>
          <Stack sx={globalStyles.viewCenter} padding={2}>
            <Stack sx={globalStyles.textSmallLabel}>Điểm số</Stack>
            <Stack
              padding={1}
              sx={{
                fontSize: FontSize.large_35,
                fontFamily: FontFamily.light,
                color: Color.black,
              }}
            >
              {`${point}/${passPoint}`}
            </Stack>
            <Stack
              sx={{
                fontFamily: FontFamily.bold,
                fontSize: FontSize.small_14,
                color: isPassed ? Color.green : Color.red,
              }}
            >
              Đã đậu
            </Stack>
          </Stack>
          <Button
            disabled={!item.isAllowReview}
            onClick={onReview}
            color="success"
            variant="contained"
          >
            Xem lại kết quả
          </Button>
        </Stack>
      )}

      <CustomModal open={open} onClose={onClose}>
        <Stack
          padding={1}
          sx={{
            maxWidth: { xs: '100%', md: '50vw' },
          }}
        >
          <Typography
            sx={{
              fontSize: FontSize.small_16,
              fontFamily: FontFamily.bold,
            }}
          >
            Xác nh̉ận tham gia làm bài kiểm tra
          </Typography>
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
            <Button onClick={onSubmit} variant="contained">
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
