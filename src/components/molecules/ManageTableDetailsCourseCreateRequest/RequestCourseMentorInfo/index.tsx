import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { handleCopyToClipboard } from '~/utils/commonComp';
import {
  useGetCourseCreateRequestDetails,
  UseGetCourseCreateRequestDetailsPayload,
} from '~/hooks/course/useGetCourseCreateRequestDetails';
import { formatISODateDateToDisplayDateTime } from '~/utils/date';
import { formatPhoneNumberVi } from '~/utils/phone';
import { handleViewImgFromUrl } from '~/utils/common';
import Icon from '~/components/atoms/Icon';
import {
  SX_FORM_ITEM_LABEL2,
  SX_FORM_ITEM_VALUE2_WARNING,
  SX_FORM_ITEM_VALUE2,
  SX_FORM_LABEL,
  SX_WRAPPER,
} from '../style';

export default function RequestCourseMentorInfo({
  idCourse,
  status,
}: UseGetCourseCreateRequestDetailsPayload) {
  const { courseCreateRequestDetails, isLoading } =
    useGetCourseCreateRequestDetails({ idCourse, status });

  const enum Text {
    labelMail = 'Mail',
    labelName = 'Họ tên',
    labelPhone = 'Số điện thoại',
    //
    labelJoinDate = 'Ngày tham gia',
    labelNumberOfCourses = 'Khóa học',
    labelNumberOfClass = 'Lớp học',
    labelNumberOfMember = 'Học sinh đã dạy',
    labelNumberOfFeedBack = 'Đánh giá',
    labelScoreFeedback = 'Số đánh giá',
    labelNoRatingYet = 'Chưa có đánh giá',
  }

  const title0 = courseCreateRequestDetails
    ? [
        {
          id: 0,
          label: Text.labelName,
          value: courseCreateRequestDetails.mentor.name,
        },
        {
          id: 1,
          label: Text.labelMail,
          value: courseCreateRequestDetails.mentor.email,
        },
      ]
    : [];

  const title1 = courseCreateRequestDetails
    ? [
        {
          id: 0,
          label: Text.labelPhone,
          value: formatPhoneNumberVi(courseCreateRequestDetails.mentor.phone),
        },
        {
          id: 1,
          label: Text.labelJoinDate,
          value: formatISODateDateToDisplayDateTime(
            courseCreateRequestDetails.mentor.timeParticipation
          ),
        },
      ]
    : [];

  const title2 = courseCreateRequestDetails
    ? [
        {
          id: 1,
          label: Text.labelNumberOfCourses,
          value:
            courseCreateRequestDetails?.mentor?.teachInformation
              ?.numberOfCourse ?? 0,
        },
        {
          id: 2,
          label: Text.labelNumberOfClass,
          value:
            courseCreateRequestDetails?.mentor?.teachInformation
              ?.numberOfClass ?? 0,
        },
        {
          id: 3,
          label: Text.labelNumberOfMember,
          value:
            courseCreateRequestDetails?.mentor?.teachInformation
              ?.numberOfMember ?? 0,
        },
      ]
    : [];

  const numberOfFeedBack = courseCreateRequestDetails
    ? courseCreateRequestDetails?.mentor?.teachInformation?.numberOfFeedBack
    : 0;

  const scoreFeedback = courseCreateRequestDetails
    ? courseCreateRequestDetails?.mentor?.teachInformation?.scoreFeedback
    : 0;

  const ratingDisplay =
    scoreFeedback > 0
      ? `${scoreFeedback}/5 (${numberOfFeedBack})`
      : Text.labelNoRatingYet;

  return (
    <Box sx={SX_WRAPPER}>
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
                onClick={() =>
                  handleViewImgFromUrl(
                    courseCreateRequestDetails?.mentor?.avatar?.url
                  )
                }
              />
              <Box sx={{ width: '100%' }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  {title0.map((item) => (
                    <Grid item xs={12} sm={12} md={12} lg={6} key={item.id}>
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
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  mt={2}
                >
                  {title1.map((item) => (
                    <Grid item xs={12} sm={12} md={12} lg={6} key={item.id}>
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
                <Box mt={6}>
                  <Grid container spacing={{ xs: 2, md: 3 }}>
                    {title2.map((item) => (
                      <Grid item xs={12} sm={6} md={6} lg={3} key={item.id}>
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
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                      <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        <Typography sx={SX_FORM_ITEM_LABEL2}>
                          {Text.labelNumberOfFeedBack}
                        </Typography>
                        {isLoading ? (
                          <Skeleton />
                        ) : (
                          <Typography
                            sx={
                              scoreFeedback > 0
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
