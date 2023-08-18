import { Box, Chip, Divider, Typography, Rating, Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import Button from '~/components/atoms/Button';
import { MentorQuickPayload } from '~/models/mentor';
import { image } from '~/constants/image';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import globalStyles from '~/styles';

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
    averageRate: 0,
    submissionCount: 0,
  },
  isSkeleton = false,
  onClick = () => {},
}: MentorItemProps) {
  const { id, fullName, introduce, workingExperience, userImagesAvatar } = item;
  // const image = undefined;
  const title = '';
  const content = '';
  const feedback = item.averageRate;

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
        borderColor: Color.grey,
        width: { xs: '100%', md: '32%' },
        borderRadius: MetricSize.small_5,
        justifyContent: 'space-between',
        background: Color.white,
        ':hover': {
          boxShadow: 3,
        },
      }}
    >
      <Stack>
        <Box
          loading="lazy"
          component="img"
          sx={{
            objectFit: 'cover',
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
          <Typography sx={globalStyles.textSubTitle}>{fullName}</Typography>
          <Stack
            sx={{
              height: '100px',
              overflow: 'hidden',
            }}
          >
            <Typography
              sx={{
                ...globalStyles.textSmallLabel,
                fontSize: FontSize.small_14,
              }}
            >
              Giới thiệu
            </Typography>
            <Typography
              sx={globalStyles.textLowSmallLight}
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
                ...globalStyles.textSmallLabel,
                fontSize: FontSize.small_14,
              }}
            >
              Kinh nghiệm
            </Typography>
            <Typography
              sx={globalStyles.textLowSmallLight}
              dangerouslySetInnerHTML={{
                __html: workingExperience,
              }}
            />
          </Stack>
        </Stack>
      </Stack>

      <Stack padding={2}>
        <Stack sx={{ flexDirection: 'row', alignItems: 'center', marginY: 1 }}>
          <Typography>{`(${item.submissionCount || 0})`}</Typography>
          <Stack marginLeft={1}>
            <Rating defaultValue={feedback} readOnly />
          </Stack>
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
