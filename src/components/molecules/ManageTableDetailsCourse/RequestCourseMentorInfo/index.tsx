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
import { useGetCourseCreateRequestDetails } from '~/hooks/course/useGetCourseCreateRequestDetails';
import { handleCopyToClipboard } from '~/utils/commonComp';
import { formatISODateDateToDisplayDateTime } from '~/utils/date';
import {
  SX_FORM_ITEM_LABEL2,
  SX_FORM_ITEM_VALUE2,
  SX_FORM_LABEL,
  SX_WRAPPER,
} from '../style';

interface RequestCourseMentorInfoProps {
  idCourse: number;
}
export default function RequestCourseMentorInfo({
  idCourse,
}: RequestCourseMentorInfoProps) {
  const { courseCreateRequestDetails, isLoading } =
    useGetCourseCreateRequestDetails(idCourse);

  const enum Text {
    labelMail = 'Mail',
    labelName = 'Họ tên',
    labelPhone = 'Số điện thoại',
    //
    labelJoinDate = 'Ngày tham gia',
    labelCoursePossess = 'Khóa học',
    labelClassPossess = 'Lớp học',
    labelRating = 'Đánh giá',
    labelNoOfRating = 'Số đánh giá',
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
        {
          id: 2,
          label: Text.labelPhone,
          value: courseCreateRequestDetails.mentor.phone,
        },
        {
          id: 3,
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
          label: Text.labelCoursePossess,
          value: 23,
        },
        {
          id: 2,
          label: Text.labelClassPossess,
          value: 100,
        },
        {
          id: 3,
          label: Text.labelRating,
          value: '4.5/5',
        },
        {
          id: 4,
          label: Text.labelNoOfRating,
          value: '504',
        },
      ]
    : [];

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
