import { Stack, Rating, Typography, LinearProgress } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import globalStyles from '~/styles';
import HoverableStack from '~/components/atoms/HoverableStack';
import ThumbnailImage from '~/components/atoms/image/ThumbnailImage';
import { ClassStatusKeys } from '~/models/variables';

interface UserClassItemProps {
  imageUrl: string | undefined;
  imageAlt: string | undefined;
  teacherName?: string[];
  name: string | undefined;
  progressValue: number | undefined;
  onAddFeedback?: () => void;
  onEditFeedback?: () => void;
  onClick: () => void;
  status: ClassStatusKeys;
}
export default function UserClassItem({
  name,
  imageAlt,
  imageUrl,
  progressValue,
  status,
  teacherName,
  onClick,
  onAddFeedback,
  onEditFeedback,
}: UserClassItemProps) {
  return (
    <HoverableStack onClick={onClick}>
      <ThumbnailImage alt={imageAlt} url={imageUrl} />
      <Stack
        sx={{
          paddingX: MetricSize.small_10,
          borderTop: `0.5px solid ${Color.border}`,
        }}
      >
        <Stack
          sx={{
            marginY: 1,
            overflow: 'hidden',
          }}
        >
          <Typography
            sx={{
              fontSize: FontSize.small_14,
              fontWeight: 'bold',
              fontFamily: FontFamily.bold,
            }}
          >
            {name?.toUpperCase() || ''}
          </Typography>
          <Typography
            noWrap
            sx={{
              fontSize: FontSize.small_14,
              fontFamily: FontFamily.light,
              color: Color.grey,
            }}
          >
            {teacherName &&
              teacherName.map((item, index) => (
                <span key={index}>{`${index !== 0 ? ', ' : ''} ${item} `}</span>
              ))}
          </Typography>
        </Stack>
        <Stack
          sx={{
            alignItem: 'center',
            justifyContent: 'space-between',
            paddingBottom: 1,
            marginTop: 1,
            flexGrow: 1,
          }}
        >
          <LinearProgress
            variant="determinate"
            color="secondary"
            value={progressValue || 0 * 100}
          />
          <Stack
            sx={{
              marginTop: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: '35px',
            }}
          >
            <Typography
              sx={{
                fontSize: '12px',
                color: Color.black,
              }}
            >
              {progressValue !== 0 ? (
                <>
                  <span style={{ fontFamily: FontFamily.medium }}>
                    {`${progressValue || 0 * 100}%`}
                  </span>{' '}
                  hoàn thành
                </>
              ) : (
                `Chưa bắt đầu`
              )}
            </Typography>

            {onAddFeedback && (
              <Stack
                sx={{
                  alignItems: 'flex-end',
                }}
              >
                <Rating
                  size="small"
                  name="half-rating-read"
                  defaultValue={2.5}
                  precision={0.5}
                  readOnly
                />
                <Typography
                  onClick={onAddFeedback}
                  sx={{
                    fontSize: '12px',
                    color: Color.black,
                    ':hover': {
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      color: Color.tertiary,
                    },
                  }}
                >
                  Đánh giá khóa học
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </HoverableStack>
  );
}
