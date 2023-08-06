import { Box, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { useGetManagedMentorDetails } from '~/hooks/user/useGetManagedMentorDetails';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_ITEM_LABEL2,
  SX_FORM_ITEM_VALUE2,
  SX_FORM_ITEM_VALUE2_WARNING,
  SX_FORM_LABEL,
} from './style';

interface RequestTeachingInfoProps {
  idMentor: number;
}

export default function RequestTeachingInfo({
  idMentor,
}: RequestTeachingInfoProps) {
  const enum Text {
    mainTitle = 'Thống kê và đánh giá',
    labelNumberOfCourses = 'Khóa học',
    labelNumberOfClass = 'Lớp học',
    labelNumberOfMember = 'Học sinh đã dạy',
    labelNumberOfFeedBack = 'Đánh giá',
    labelScoreFeedback = 'Số đánh giá',
    labelNoRatingYet = 'Chưa có đánh giá',
  }
  const { managedMentorDetails, isLoading } =
    useGetManagedMentorDetails(idMentor);
  const title0 = managedMentorDetails
    ? [
        {
          id: 1,
          label: Text.labelNumberOfCourses,
          value: managedMentorDetails?.teachInformation?.numberOfCourse ?? 0,
        },
        {
          id: 2,
          label: Text.labelNumberOfClass,
          value: managedMentorDetails?.teachInformation?.numberOfClass ?? 0,
        },
        {
          id: 3,
          label: Text.labelNumberOfMember,
          value: managedMentorDetails?.teachInformation?.numberOfMember ?? 0,
        },
      ]
    : [];

  const numberOfFeedBack = managedMentorDetails
    ? managedMentorDetails?.teachInformation?.numberOfFeedBack
    : 0;

  const scoreFeedback = managedMentorDetails
    ? managedMentorDetails?.teachInformation?.scoreFeedback
    : 0;

  const ratingDisplay =
    scoreFeedback && scoreFeedback > 0
      ? `${scoreFeedback}/5 (${numberOfFeedBack})`
      : Text.labelNoRatingYet;

  return (
    <Box sx={SX_BOX_ITEM_WRAPPER}>
      <Typography sx={SX_FORM_LABEL}>{Text.mainTitle}</Typography>
      <Grid container mt={2} rowSpacing={2}>
        {title0.map((item) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={item.id}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography sx={SX_FORM_ITEM_LABEL2}>{item.label}</Typography>
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
  );
}
