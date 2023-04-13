import { Box, Chip, Divider, Typography, Rating, Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import Button from '~/components/atoms/Button';
import { MentorQuickPayload } from '~/models/mentor';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';

interface MentorItemProps {
  item?: MentorQuickPayload;
  isSkeleton?: boolean;
  onClick?: () => void;
}

export default function MentorItem({
  item = {
    id: 0,
    fullName: '',
    introduce: '',
    workingExperience: '',
  },
  isSkeleton = false,
  onClick = () => {},
}: MentorItemProps) {
  const { id, fullName, introduce, workingExperience } = item;
  const image = undefined;
  const title = '';
  const content = '';
  const feedback = 5;

  const handleNavigateMentorDetail = () => {
    onClick();
  };

  if (isSkeleton) {
    return (
      <Stack
        sx={{
          marginTop: MetricSize.medium_15,
          marginLeft: '10px',
          borderColor: Color.grey,
          width: { xs: '100%', md: '32%' },
          borderRadius: MetricSize.small_5,
          justifyContent: 'space-between',
        }}
      >
        <Skeleton height={400} />
      </Stack>
    );
  }

  return (
    <Stack
      sx={{
        marginTop: MetricSize.medium_15,
        marginLeft: '10px',
        border: '1px solid',
        borderColor: Color.grey,
        width: { xs: '100%', md: '32%' },
        borderRadius: MetricSize.small_5,
        justifyContent: 'space-between',
        height: '600px',
      }}
    >
      <Stack>
        <Box
          loading="lazy"
          component="img"
          sx={{
            objectFit: 'fill',
            width: '100%',
            height: '200px',
            borderRadius: MetricSize.small_5,
          }}
          src={image}
          alt={title}
        />
        <Stack sx={{ padding: MetricSize.medium_15, height: '200px' }}>
          <Typography
            sx={{
              fontSize: FontSize.medium_28,
              fontWeight: 'bold',
              fontFamily: FontFamily.bold,
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: FontSize.small_18,
              fontFamily: FontFamily.light,
              color: Color.grey,
            }}
          >
            Tên: {fullName}
          </Typography>
          <Typography
            sx={{
              fontSize: FontSize.small_18,
              fontFamily: FontFamily.light,
              color: Color.grey,
            }}
          >
            Giới thiệu: {introduce}
          </Typography>
          <Typography
            sx={{
              fontSize: FontSize.small_18,
              fontFamily: FontFamily.light,
              color: Color.grey,
            }}
          >
            Kinh nghiệm: {workingExperience}
          </Typography>
          <Stack
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              height: '150px',
            }}
          >
            <Typography
              sx={{
                fontSize: FontSize.small_18,
                fontFamily: FontFamily.regular,
              }}
            >
              {content}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack padding={2}>
        <Stack marginY={1}>
          <Rating
            name="size-small"
            defaultValue={feedback}
            disabled
            size="small"
          />
        </Stack>
        <Divider />
        <Stack marginTop={2}>
          <Button onClick={handleNavigateMentorDetail} customVariant="normal">
            Xem chi tiết
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

MentorItem.defaultProps = {
  isSkeleton: false,
  item: undefined,
  onClick: () => {},
};
