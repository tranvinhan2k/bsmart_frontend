import { Box, Chip, Divider, Typography, Rating, Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import Button from '~/components/atoms/Button';
import { MentorQuickPayload } from '~/models/mentor';
import { image } from '~/constants/image';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import globalStyles from '~/styles';
import Icon from '~/components/atoms/Icon';

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
          width: { xs: '100%', md: '48%', lg: '32%' },
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
        marginLeft: '10px',
        marginBottom: '10px',
        borderColor: Color.grey,
        width: { xs: '100%', md: '48%', lg: '32%' },
        borderRadius: MetricSize.small_5,
        justifyContent: 'space-between',
        cursor: 'pointer',
        background: Color.white,
        ':hover': {
          boxShadow: 3,
          cursor: 'pointer',
        },
      }}
      onClick={handleNavigateMentorDetail}
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
            {/* <Typography
              sx={{
                ...globalStyles.textSmallLabel,
                fontSize: FontSize.small_14,
              }}
            >
              Giới thiệu
            </Typography> */}
            <Typography
              sx={globalStyles.textLowSmallLight}
              dangerouslySetInnerHTML={{
                __html: introduce,
              }}
            />
          </Stack>
          {/* <Stack
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
          </Stack> */}
        </Stack>
      </Stack>

      <Stack padding={2}>
        <Stack
          direction="row-reverse"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Chip label={`${item.submissionCount} lượt đánh giá`} size="small" />
          {feedback > 0 && (
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              {feedback.toFixed(1) || 0}
              <Icon name="starIcon" size="small_20" color="gold" />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
