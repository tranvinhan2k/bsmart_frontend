import { Box, Grid, Link, Stack, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { ActivityQuizPayload } from '~/models/type';
import { formatISODateDateToDisplayDateTime } from '~/utils/date';
import { SubActivityType } from '~/constants/activity';
import CustomDialog from '~/components/atoms/CustomDialog';
import Icon, { IconName } from '~/components/atoms/Icon';
import SubActivityHeader from '../SubActivityHeader';
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
  const [open, setOpen] = useState<boolean>(false);
  const handleTriggerDialog = () => setOpen(!open);

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
    {
      id: 2,
      iconName: 'accessTimeIcon',
      label: 'Thời gian bắt đầu',
      value: formatISODateDateToDisplayDateTime(item.startDate),
      size: 6,
    },
    {
      id: 3,
      iconName: 'accessTimeIcon',
      label: 'Thời gian kết thúc',
      value: formatISODateDateToDisplayDateTime(item.endDate),
      size: 6,
    },
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
    <>
      <SubActivityHeader type={SubActivityType.QUIZ} />
      <Link href="#quiz" underline="hover" onClick={handleTriggerDialog}>
        {name}
      </Link>
      <CustomDialog
        title="Kiểm tra trắc nghiệm"
        onClose={handleTriggerDialog}
        open={open}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Box>
            <Grid container spacing={2}>
              {displayList0.map((display) => (
                <Grid item xs={display.size} key={display.id}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={1.5}
                  >
                    <Box>
                      <Icon name={display.iconName} size="small_20" />
                    </Box>
                    <Stack
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                    >
                      <Typography sx={sx.itemLabel}>{display.label}</Typography>
                      <Typography sx={sx.itemValue}>{display.value}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
              ))}
              {displayList1.map((display) => (
                <Grid item xs={display.size} key={display.id}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={1.5}
                  >
                    <Box>
                      <Icon name={display.iconName} size="small_20" />
                    </Box>
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
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </CustomDialog>
    </>
  );
}
