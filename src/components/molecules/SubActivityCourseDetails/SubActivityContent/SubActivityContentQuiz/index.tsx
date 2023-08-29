import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { ActivityQuizPayload } from '~/models/type';
import Icon, { IconName } from '~/components/atoms/Icon';
import QuestionDisplay from './QuestionDisplay';
import sx from './style';

interface SubActivityContentQuizProps {
  name: string;
  item: ActivityQuizPayload;
}

interface DisplayListProps {
  id: number;
  iconName: IconName;
  label: string;
  value: string | number;
  size: number;
}
interface DisplayListBooleanProps {
  id: number;
  iconName: IconName;
  label: string;
  value: boolean;
  size: number;
}

export default function SubActivityContentQuiz({
  name,
  item,
}: SubActivityContentQuizProps) {
  const displayList0: DisplayListProps[] = [
    {
      id: 0,
      iconName: 'tagIcon',
      label: 'Mã',
      value: item.code ?? '',
      size: 6,
    },
    {
      id: 1,
      iconName: 'labelIcon',
      label: 'Tên',
      value: name ?? '',
      size: 6,
    },
    // {
    //   id: 2,
    //   iconName: 'accessTimeIcon',
    //   label: 'Thời gian bắt đầu',
    //   value: formatISODateDateToDisplayDateTime(item.startDate),
    //   size: 6,
    // },
    // {
    //   id: 3,
    //   iconName: 'accessTimeIcon',
    //   label: 'Thời gian kết thúc',
    //   value: formatISODateDateToDisplayDateTime(item.endDate),
    //   size: 6,
    // },
    {
      id: 4,
      iconName: 'accessTimeIcon',
      label: 'Thời gian làm bài (phút)',
      value: item.time ?? '',
      size: 6,
    },
    {
      id: 5,
      iconName: 'formatListNumberedIcon',
      label: 'Số câu hỏi',
      value: item.questionCount ?? '',
      size: 6,
    },
    {
      id: 6,
      iconName: 'accessTimeIcon',
      label: 'Thời gian xem lại (phút)',
      value: item.allowReviewAfterMin ?? '',
      size: 6,
    },
    {
      id: 7,
      iconName: 'gradingIcon',
      label: 'Điểm đạt yêu cầu',
      value: item.defaultPoint ?? '',
      size: 6,
    },
  ];

  const displayList1: DisplayListBooleanProps[] = [
    {
      id: 0,
      iconName: 'visibilityIcon',
      label: 'Cho phép xem lại',
      value: item.isAllowReview,
      size: 6,
    },
    {
      id: 1,
      iconName: 'shuffleIcon',
      label: 'Trộn bài kiểm tra',
      value: item.isSuffleQuestion,
      size: 6,
    },
    {
      id: 2,
      iconName: 'lockIcon',
      label: 'Mật khẩu',
      value: Boolean(item.password),
      size: 6,
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={3}>
        <Typography>Thông số bài kiểm tra</Typography>
        {displayList0.map((display) => (
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1.5}
            key={display.id}
            mt={2}
            p={1}
          >
            <Icon name={display.iconName} size="small_20" />
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography sx={sx.itemLabel}>{display.label}</Typography>
              <Typography sx={sx.itemValue}>{display.value}</Typography>
            </Stack>
          </Stack>
        ))}
        {displayList1.map((display) => (
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1.5}
            key={display.id}
            p={1}
          >
            <Icon name={display.iconName} size="small_20" />
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography sx={sx.itemLabel}>{display.label}</Typography>
              {display.value ? (
                <CheckIcon
                  titleAccess="Có"
                  style={{
                    color: green[500],
                  }}
                />
              ) : (
                <CloseIcon
                  titleAccess="Không"
                  style={{
                    color: red[500],
                  }}
                />
              )}
            </Stack>
          </Stack>
        ))}
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item xs={12} sm={12} md={7}>
        <Box ml={2}>
          <Typography>Danh sách câu hỏi</Typography>
          <Box mt={2}>
            <QuestionDisplay quizQuestions={item.quizQuestions} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
