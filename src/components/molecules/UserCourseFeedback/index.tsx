import { Avatar, Rating, Stack, Typography } from '@mui/material';
import { Color, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import globalStyles from '~/styles';
import { formatDate, formatISODateDateToDisplayDateTime } from '~/utils/date';
import ReviewFeedback from './ReviewFeedback';
import { LoadingWrapper } from '~/HOCs';
import { TDateISO } from '~/models/date';
import CustomPagination from '~/components/atoms/CustomPagination';

export interface FeedbackReviewPayload {
  id: number;
  email: string;
  rating: number;
  date: string;
  review: string;
}

export interface ClassFeedbackPayload {
  rating: number;
  feedbackReviewList: FeedbackReviewPayload[];
}

export default function UserCourseFeedback() {
  const feedbackReviewList: FeedbackReviewPayload[] = [
    {
      id: 0,
      date: new Date().toDateString(),
      email: 'tranvinhan2k@gmail.com',
      rating: 3.5,
      review:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, error? Officia sapiente rerum reprehenderit, aliquid mollitia asperiores minus consequuntur distinctio autem, omnis ad fugit aperiam, repellat fugiat accusantium fuga iure. ',
    },
    {
      id: 1,
      date: new Date().toDateString(),
      email: 'tranvinhan2k@gmail.com',
      rating: 3.5,
      review:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, error? Officia sapiente rerum reprehenderit, aliquid mollitia asperiores minus consequuntur distinctio autem, omnis ad fugit aperiam, repellat fugiat accusantium fuga iure. ',
    },
    {
      id: 2,
      date: new Date().toDateString(),
      email: 'tranvinhan2k@gmail.com',
      rating: 3.5,
      review:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, error? Officia sapiente rerum reprehenderit, aliquid mollitia asperiores minus consequuntur distinctio autem, omnis ad fugit aperiam, repellat fugiat accusantium fuga iure. ',
    },
    {
      id: 3,
      date: new Date().toDateString(),
      email: 'tranvinhan2k@gmail.com',
      rating: 3.5,
      review:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, error? Officia sapiente rerum reprehenderit, aliquid mollitia asperiores minus consequuntur distinctio autem, omnis ad fugit aperiam, repellat fugiat accusantium fuga iure. ',
    },
  ];

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
            4.5/5
          </Typography>
          <Rating value={4.5} readOnly size="large" precision={0.5} />
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
            (item) => {
              return (
                <Button
                  sx={{
                    margin: 1,
                  }}
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
        <LoadingWrapper>
          {feedbackReviewList.map((item) => (
            <ReviewFeedback
              key={item.id}
              date={item.date}
              email={item.email}
              rating={item.rating}
              review={item.review}
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
              currentPage={2}
              onChange={() => {}}
              totalPages={3}
            />
          </Stack>
        </LoadingWrapper>
      </Stack>
    </Stack>
  );
}
