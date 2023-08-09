import { Avatar, Rating, Stack, Typography } from '@mui/material';
import { Color, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import globalStyles from '~/styles';
import { formatDate, formatISODateDateToDisplayDateTime } from '~/utils/date';
import ReviewFeedback from './ReviewFeedback';
import { LoadingWrapper } from '~/HOCs';
import { TDateISO } from '~/models/date';
import CustomPagination from '~/components/atoms/CustomPagination';
import { FeedbackPayload, FeedbackReviewPayload } from '~/models/type';

export interface ClassFeedbackPayload {
  rating: number;
  feedbackReviewList: FeedbackReviewPayload[];
}

interface Props {
  feedbacks: FeedbackPayload;
  error: any;
  isLoading: boolean;
  onFeedbackChangeStar: (star: number) => void;
  onFeedbackChangePage: (page: number) => void;
}

export default function UserCourseFeedback({
  feedbacks,
  error,
  isLoading,
  onFeedbackChangePage,
  onFeedbackChangeStar,
}: Props) {
  return (
    <Stack>
      <Stack
        sx={{
          background: Color.white,
          borderRadius: MetricSize.small_5,
          paddingX: 2,
          paddingY: 4,

          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Stack>
          <Typography textAlign="center" sx={globalStyles.textTitle}>
            {`${feedbacks.rating}/5`}
          </Typography>
          <Rating
            value={feedbacks.rating}
            readOnly
            size="large"
            precision={0.5}
          />
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingX: 2,
            flexWrap: 'wrap',
          }}
        >
          {['Tất cả', '1 sao', '2 sao', '3 sao', '4 sao', '5 sao'].map(
            (item, index) => {
              return (
                <Button
                  sx={{
                    margin: 1,
                  }}
                  onClick={() => onFeedbackChangeStar(index)}
                  key={item}
                  variant="contained"
                >
                  {item}
                </Button>
              );
            }
          )}
        </Stack>
      </Stack>
      <Stack marginTop={1}>
        <LoadingWrapper
          error={error}
          isLoading={isLoading}
          isEmptyCourse={feedbacks?.items?.items?.length === 0}
        >
          {feedbacks.items.items.map((item) => (
            <ReviewFeedback
              key={item.id}
              date={item.feedbackTime}
              email={item.email}
              rating={item.rating}
              review={item.reviewContent}
            />
          ))}
          <Stack
            sx={{
              padding: 3,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CustomPagination
              currentPage={feedbacks.items.currentPage}
              onChange={onFeedbackChangePage}
              totalPages={feedbacks.items.totalPages}
            />
          </Stack>
        </LoadingWrapper>
      </Stack>
    </Stack>
  );
}
