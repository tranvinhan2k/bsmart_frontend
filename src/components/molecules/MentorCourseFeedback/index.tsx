import { Avatar, Rating, Stack, Typography } from '@mui/material';
import { Color, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import globalStyles from '~/styles';
import ReviewFeedback from './ReviewFeedback';
import { LoadingWrapper } from '~/HOCs';
import { TDateISO } from '~/models/date';
import CustomPagination from '~/components/atoms/CustomPagination';
import { FeedbackPayload, FeedbackReviewPayload } from '~/models/type';
import { useGetCourseFeedback, useGetIdFromUrl } from '~/hooks';
import { useGetMentorFeedback } from '~/hooks/course/useGetMentorFeedback';

export interface ClassFeedbackPayload {
  rating: number;
  feedbackReviewList: FeedbackReviewPayload[];
}

export default function MentorCourseFeedback() {
  const id = useGetIdFromUrl('id');

  const {
    data: feedbacks,
    numberOfStar,
    handleChangeNumberOfStar,
    handleChangePage,
    error,
    isLoading,
  } = useGetMentorFeedback(id);

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
            {`${feedbacks?.rating.toFixed(1) || 0}/5`}
          </Typography>
          <Rating
            value={feedbacks?.rating || 0}
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
                  color="miSmartOrange"
                  onClick={() => handleChangeNumberOfStar(index)}
                  key={item}
                  disabled={
                    index !== 0 &&
                    (feedbacks?.rateCount?.[`${index}`] || 0) === 0
                  }
                  variant={
                    // eslint-disable-next-line no-nested-ternary
                    index !== 0
                      ? numberOfStar === index
                        ? 'contained'
                        : 'outlined'
                      : numberOfStar === undefined
                      ? 'contained'
                      : 'outlined'
                  }
                >
                  {`${item} (${
                    index === 0
                      ? feedbacks?.numberOfRating || 0
                      : feedbacks?.rateCount?.[`${index}`] || 0
                  })`}
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
          {feedbacks?.items.items.map((item, index) => (
            <ReviewFeedback
              key={index}
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
              currentPage={feedbacks?.items?.currentPage || 0}
              onChange={handleChangePage}
              totalPages={feedbacks?.items?.totalPages || 0}
            />
          </Stack>
        </LoadingWrapper>
      </Stack>
    </Stack>
  );
}
