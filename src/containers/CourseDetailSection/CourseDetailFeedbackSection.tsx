import {
  Grid,
  Stack,
  Typography,
  Rating,
  LinearProgress,
  Box,
  IconButton,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Color,
  Common,
  FontFamily,
  FontSize,
  IconSize,
  MetricSize,
} from '~/assets/variables';
import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';
import { FeedbackPayload } from '~/models/feedback';
import { formatNumberFixedTwoDigit } from '~/utils/number';

interface CourseDetailFeedbackSectionPayload {
  feedbackData: FeedbackPayload;
}

const StarData = [
  {
    id: 1,
    numOfRating: 2,
  },
  {
    id: 2,
    numOfRating: 2,
  },
  {
    id: 3,
    numOfRating: 2,
  },
  {
    id: 4,
    numOfRating: 2,
  },
  {
    id: 5,
    numOfRating: 2,
  },
];

export default function CourseDetailFeedbackSection({
  feedbackData,
}: CourseDetailFeedbackSectionPayload) {
  const { commentData, numOfRating, percentOfFeedback, starData } =
    feedbackData;
  const [ratingValue, setRatingValue] = useState<number>(0);
  const handleClickCommentUserAvatar = (id: string) => {
    // TODO: navigation to the user link
  };
  const handleChangeRatingValue = (event: any) => {
    setRatingValue(event.target.value);
  };
  const handleRatingForCourse = () => {
    // TODO: handle Rating Course Here
  };
  return (
    <Stack>
      <Typography
        sx={{
          fontSize: FontSize.small_16,
          fontFamily: FontFamily.bold,
          marginTop: MetricSize.medium_15,
        }}
      >
        Đánh giá khóa học
      </Typography>
      <Grid
        container
        sx={{
          padding: '40px',
          borderStyle: 'solid',
          borderColor: Color.grey,
          borderWidth: 1,
          borderRadius: '10px',
          marginTop: MetricSize.medium_15,
        }}
      >
        <Grid item md={3}>
          <Typography
            sx={{
              fontFamily: FontFamily.bold,
              fontSize: FontSize.extraLarge_70,
            }}
          >
            {formatNumberFixedTwoDigit(percentOfFeedback)}
          </Typography>
          <Rating value={percentOfFeedback} />
          <Typography
            sx={{ marginTop: MetricSize.medium_15, color: Color.grey }}
          >{`${numOfRating} Ratings`}</Typography>
        </Grid>
        <Grid item md={9} sx={{ marginTop: MetricSize.medium_15 }}>
          {StarData.map((star) => (
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingY: MetricSize.small_5,
              }}
              key={star.id}
            >
              <Icon size="small" color="orange" name="star" />
              <Typography
                sx={{
                  fontSize: FontSize.small_16,
                  fontFamily: FontFamily.regular,
                  paddingLeft: MetricSize.small_5,
                }}
              >
                {star.id}
              </Typography>
              <Stack sx={{ flexGrow: 1, paddingX: MetricSize.medium_15 }}>
                <LinearProgress
                  variant="determinate"
                  sx={{
                    color: Color.orange,
                    borderRadius: '5px',
                    height: MetricSize.small_10,
                    background: Color.border,
                    '&>.MuiLinearProgress-bar': {
                      background: Color.orange,
                    },
                  }}
                  value={(star.numOfRating / numOfRating) * 100}
                />
              </Stack>
              <Typography
                sx={{
                  fontSize: FontSize.small_16,
                  fontFamily: FontFamily.regular,
                }}
              >
                {`${star.numOfRating} ratings`}
              </Typography>
            </Stack>
          ))}
        </Grid>
      </Grid>

      <Stack sx={{ marginTop: MetricSize.medium_15 }}>
        <Typography
          sx={{ fontFamily: FontFamily.bold, fontSize: FontSize.small_16 }}
        >
          Nhận xét
        </Typography>
        {commentData.map((comment) => (
          <Stack sx={{ marginTop: MetricSize.medium_15 }} key={comment.id}>
            <Stack flexDirection="row" alignItems="center">
              <IconButton
                onClick={() =>
                  handleClickCommentUserAvatar(comment.userData.name)
                }
              >
                <Box
                  component="img"
                  sx={{
                    width: IconSize.large,
                    height: IconSize.large,
                    borderRadius: Common.borderCircle,
                  }}
                  src={comment.userData.avatar}
                  alt="comment avatar"
                />
              </IconButton>
              <Stack sx={{ paddingX: MetricSize.medium_15 }}>
                <Typography
                  sx={{
                    fontFamily: FontFamily.bold,
                    fontSize: FontSize.small_16,
                  }}
                >
                  {comment.userData.name}
                </Typography>
                <Stack sx={{ flexDirection: 'row' }}>
                  <Rating value={comment.ratingStar} />
                  <Typography
                    sx={{
                      fontFamily: FontFamily.bold,
                      fontSize: FontSize.small_16,
                    }}
                  >
                    1 tháng trước
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack sx={{ marginTop: MetricSize.medium_15 }}>
              <Typography
                sx={{
                  fontFamily: FontFamily.thin,
                  fontSize: FontSize.small_16,
                  color: Color.grey,
                }}
              >
                {comment.commentContent}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Box sx={{ marginTop: MetricSize.medium_15 }}>
        <Box>
          <Button customVariant="outlined">Xem Thêm</Button>
        </Box>
      </Box>
      <Stack sx={{ marginTop: MetricSize.medium_15 }}>
        <TextField
          multiline
          rows={4}
          placeholder="Hãy cho tôi nhận xét về khóa học"
        />
        <Stack
          sx={{
            marginTop: MetricSize.medium_15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Rating value={ratingValue} onChange={handleChangeRatingValue} />
          <Button onClick={handleRatingForCourse} customVariant="normal">
            Đánh giá
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
