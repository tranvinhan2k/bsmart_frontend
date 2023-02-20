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
  Colors,
  Common,
  FontFamilies,
  FontSize,
  IconSize,
  MetricSize,
} from '~/assets/variables';
import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';
import { FeedbackPayload } from '~/models/feedback';
import { formatNumberFixedTwoDigit } from '~/utils/number';

interface CourseDetailFeedbackSectionProps {
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
}: CourseDetailFeedbackSectionProps) {
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
          fontSize: FontSize.small,
          fontFamily: FontFamilies.bold,
          marginTop: MetricSize.medium,
        }}
      >
        Đánh giá khóa học
      </Typography>
      <Grid
        container
        sx={{
          padding: '40px',
          borderStyle: 'solid',
          borderColor: Colors.grey,
          borderWidth: 1,
          borderRadius: '10px',
          marginTop: MetricSize.medium,
        }}
      >
        <Grid item md={3}>
          <Typography
            sx={{
              fontFamily: FontFamilies.bold,
              fontSize: FontSize.extraLarge,
            }}
          >
            {formatNumberFixedTwoDigit(percentOfFeedback)}
          </Typography>
          <Rating value={percentOfFeedback} />
          <Typography
            sx={{ marginTop: MetricSize.medium, color: Colors.grey }}
          >{`${numOfRating} Ratings`}</Typography>
        </Grid>
        <Grid item md={9} sx={{ marginTop: MetricSize.medium }}>
          {StarData.map((star) => (
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingY: MetricSize.small,
              }}
              key={star.id}
            >
              <Icon size="small" color="orange" name="star" />
              <Typography
                sx={{
                  fontSize: FontSize.small,
                  fontFamily: FontFamilies.regular,
                  paddingLeft: MetricSize.small,
                }}
              >
                {star.id}
              </Typography>
              <Stack sx={{ flexGrow: 1, paddingX: MetricSize.medium }}>
                <LinearProgress
                  variant="determinate"
                  sx={{
                    color: Colors.orange,
                    borderRadius: '5px',
                    height: MetricSize.sm_medium,
                    background: '#ddd',
                    '&>.MuiLinearProgress-bar': {
                      background: Colors.orange,
                    },
                  }}
                  value={(star.numOfRating / numOfRating) * 100}
                />
              </Stack>
              <Typography
                sx={{
                  fontSize: FontSize.small,
                  fontFamily: FontFamilies.regular,
                }}
              >
                {`${star.numOfRating} ratings`}
              </Typography>
            </Stack>
          ))}
        </Grid>
      </Grid>

      <Stack sx={{ marginTop: MetricSize.medium }}>
        <Typography
          sx={{ fontFamily: FontFamilies.bold, fontSize: FontSize.small }}
        >
          Nhận xét
        </Typography>
        {commentData.map((comment) => (
          <Stack
            sx={{ marginTop: MetricSize.medium }}
            key={comment.commentContent}
          >
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
              <Stack sx={{ paddingX: MetricSize.medium }}>
                <Typography
                  sx={{
                    fontFamily: FontFamilies.bold,
                    fontSize: FontSize.small,
                  }}
                >
                  {comment.userData.name}
                </Typography>
                <Stack sx={{ flexDirection: 'row' }}>
                  <Rating value={comment.ratingStar} />
                  <Typography
                    sx={{
                      fontFamily: FontFamilies.bold,
                      fontSize: FontSize.small,
                    }}
                  >
                    1 tháng trước
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack sx={{ marginTop: MetricSize.medium }}>
              <Typography
                sx={{
                  fontFamily: FontFamilies.thin,
                  fontSize: FontSize.small,
                  color: Colors.grey,
                }}
              >
                {comment.commentContent}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Box sx={{ marginTop: MetricSize.medium }}>
        <Box>
          <Button customVariant="outlined">Xem Thêm</Button>
        </Box>
      </Box>
      <Stack sx={{ marginTop: MetricSize.medium }}>
        <TextField
          multiline
          rows={4}
          placeholder="Hãy cho tôi nhận xét về khóa học"
        />
        <Stack
          sx={{
            marginTop: MetricSize.medium,
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
