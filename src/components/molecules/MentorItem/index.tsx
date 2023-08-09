import { Box, Chip, Divider, Typography, Rating, Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import Button from '~/components/atoms/Button';
import { MentorQuickPayload } from '~/models/mentor';
import { image } from '~/constants/image';
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
    userImagesAvatar: '',
  },
  isSkeleton = false,
  onClick = () => {},
}: MentorItemProps) {
  const { id, fullName, introduce, workingExperience, userImagesAvatar } = item;
  // const image = undefined;
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
        background: Color.white,
      }}
    >
      <Stack>
        <Box
          loading="lazy"
          component="img"
          sx={{
            objectFit: 'fill',
            width: '100%',
            height: '300px',
            borderRadius: MetricSize.small_5,
          }}
          // src={image}
          src={
            userImagesAvatar.length === 0 ? image.noAvatar : userImagesAvatar
          }
          alt={title}
        />
        <Stack sx={{ padding: MetricSize.medium_15, background: Color.white }}>
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
              color: Color.black,
            }}
          >
            {fullName}
          </Typography>
          <Stack
            sx={{
              height: '100px',
              overflow: 'hidden',
            }}
          >
            <Typography
              sx={{
                fontSize: FontSize.small_14,
                fontFamily: FontFamily.light,
                color: Color.black,
              }}
            >
              Giới thiệu
            </Typography>
            <Typography
              sx={{
                fontSize: FontSize.small_14,
                fontFamily: FontFamily.light,
                color: Color.grey,
              }}
              dangerouslySetInnerHTML={{
                __html: introduce,
              }}
            />
          </Stack>
          <Stack
            sx={{
              height: '100px',
              overflow: 'hidden',
              marginTop: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: FontSize.small_14,
                fontFamily: FontFamily.light,
                color: Color.black,
              }}
            >
              Kinh nghiệm
            </Typography>
            <Typography
              sx={{
                fontSize: FontSize.small_14,
                fontFamily: FontFamily.light,
                color: Color.grey,
              }}
              dangerouslySetInnerHTML={{
                __html: workingExperience,
              }}
            />
          </Stack>
        </Stack>
      </Stack>

      <Stack padding={2}>
        <Stack>
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
