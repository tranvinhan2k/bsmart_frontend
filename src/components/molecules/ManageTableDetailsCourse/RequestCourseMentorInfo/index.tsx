import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import Icon from '~/components/atoms/Icon';
import { CourseStatusType } from '~/constants/course';
import { useGetCourseCreateRequestDetails } from '~/hooks/course/useGetCourseCreateRequestDetails';
import { handleCopyToClipboard } from '~/utils/commonComp';
import { formatISODateDateToDisplayDateTime } from '~/utils/date';
import { formatPhoneNumberVi } from '~/utils/phone';
import {
  SX_FORM_ITEM_LABEL2,
  SX_FORM_ITEM_VALUE2_WARNING,
  SX_FORM_ITEM_VALUE2,
  SX_FORM_LABEL,
  SX_WRAPPER,
} from '../style';

interface RequestCourseClassListProps {
  idCourse: number;
  status: CourseStatusType;
  scrollRef: any;
}

export default function RequestCourseMentorInfo({
  idCourse,
  status,
  scrollRef,
}: RequestCourseClassListProps) {
  const { courseCreateRequestDetails, isLoading } =
    useGetCourseCreateRequestDetails({ idCourse, status });

  const enum Text {
    labelMail = 'Mail',
    labelName = 'Họ tên',
    labelPhone = 'Số điện thoại',
    labelJoinDate = 'Ngày tham gia',
    //
    labelCoursePossess = 'Khóa học',
    labelClassPossess = 'Lớp học',
    labelRating = 'Đánh giá',
    labelNoOfRating = 'Số đánh giá',
    //
    labelNoRatingYet = 'Chưa có đánh giá',
  }

  const title0 = [
    {
      id: 0,
      label: Text.labelName,
      value: courseCreateRequestDetails
        ? courseCreateRequestDetails?.mentor?.name
        : '',
    },
    {
      id: 1,
      label: Text.labelMail,
      value: courseCreateRequestDetails
        ? courseCreateRequestDetails?.mentor?.email
        : '',
    },
    {
      id: 2,
      label: Text.labelPhone,
      value: courseCreateRequestDetails
        ? formatPhoneNumberVi(courseCreateRequestDetails?.mentor?.phone)
        : '',
    },
    {
      id: 3,
      label: Text.labelJoinDate,
      value: courseCreateRequestDetails
        ? formatISODateDateToDisplayDateTime(
            courseCreateRequestDetails?.mentor?.timeParticipation
          )
        : '',
    },
  ];

  const title2 = [
    {
      id: 0,
      label: Text.labelCoursePossess,
      value: courseCreateRequestDetails
        ? courseCreateRequestDetails?.mentor?.teachInformation?.numberOfCourse
        : 0,
    },
    {
      id: 1,
      label: Text.labelClassPossess,
      value: courseCreateRequestDetails
        ? courseCreateRequestDetails?.mentor?.teachInformation?.numberOfClass
        : 0,
    },
    {
      id: 2,
      label: Text.labelClassPossess,
      value: courseCreateRequestDetails
        ? courseCreateRequestDetails?.mentor?.teachInformation?.numberOfClass
        : 0,
    },
  ];

  const numberOfFeedBack = courseCreateRequestDetails
    ? courseCreateRequestDetails.mentor.teachInformation?.numberOfFeedBack
    : 0;

  const scoreFeedback = courseCreateRequestDetails
    ? courseCreateRequestDetails.mentor.teachInformation?.scoreFeedback
    : 0;

  console.log('numberOfFeedBack', numberOfFeedBack);
  console.log('scoreFeedback', scoreFeedback);
  const ratingDisplay =
    scoreFeedback && scoreFeedback > 0
      ? `${scoreFeedback}/5 (${numberOfFeedBack} lượt đánh giá)`
      : Text.labelNoRatingYet;

  return (
    <Box sx={SX_WRAPPER} ref={scrollRef}>
      <Box p={2}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={1}
        >
          <Grid item xs={12}>
            <Typography sx={SX_FORM_LABEL}>Giảng viên</Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={4}
            >
              <Avatar
                src={courseCreateRequestDetails?.mentor?.avatar?.url}
                variant="rounded"
                sx={{
                  width: 150,
                  height: 150,
                  boxShadow: 3,
                }}
              />
              <Box sx={{ width: '100%' }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={2}
                >
                  {title0.map((item) => (
                    <Grid item xs={12} sm={12} md={12} lg={6} key={item.id}>
                      <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex"
                      >
                        <Typography sx={SX_FORM_ITEM_LABEL2}>
                          {item.label}:
                          <IconButton
                            size="small"
                            onClick={() => handleCopyToClipboard(item.value)}
                          >
                            <Icon
                              name="contentCopyIcon"
                              size="small"
                              color="blue"
                            />
                          </IconButton>
                        </Typography>
                        {isLoading ? (
                          <Skeleton />
                        ) : (
                          <Typography sx={SX_FORM_ITEM_VALUE2} noWrap>
                            {item.value}
                          </Typography>
                        )}
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
                {/* <Box mt={4}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    {title1.map((item) => (
                      <Grid item sm={12} md={6} key={item.id}>
                        <Stack
                          direction="column"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                        >
                          <Typography sx={SX_FORM_ITEM_LABEL2}>
                            {item.label}:
                            <IconButton
                              size="small"
                              onClick={() => handleCopyToClipboard(item.value)}
                            >
                              <Icon
                                name="contentCopyIcon"
                                size="small"
                                color="blue"
                              />
                            </IconButton>
                          </Typography>
                          {isLoading ? (
                            <Skeleton />
                          ) : (
                            <Typography sx={SX_FORM_ITEM_VALUE2} noWrap>
                              {item.value}
                            </Typography>
                          )}
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </Box> */}
                <Box mt={6}>
                  <Grid container spacing={{ xs: 2, md: 3 }}>
                    {title2.map((item) => (
                      <Grid item xs={12} sm={6} md={3} key={item.id}>
                        <Stack
                          direction="column"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                        >
                          <Typography sx={SX_FORM_ITEM_LABEL2}>
                            {item.label}
                          </Typography>
                          {isLoading ? (
                            <Skeleton />
                          ) : (
                            <Typography sx={SX_FORM_ITEM_VALUE2} noWrap>
                              {item.value}
                            </Typography>
                          )}
                        </Stack>
                      </Grid>
                    ))}
                    <Grid item xs={12} sm={6} md={3}>
                      <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        <Typography sx={SX_FORM_ITEM_LABEL2}>
                          {Text.labelRating}
                        </Typography>
                        {isLoading ? (
                          <Skeleton />
                        ) : (
                          <Typography
                            sx={
                              scoreFeedback && scoreFeedback > 0
                                ? SX_FORM_ITEM_VALUE2
                                : SX_FORM_ITEM_VALUE2_WARNING
                            }
                          >
                            {ratingDisplay}
                          </Typography>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
