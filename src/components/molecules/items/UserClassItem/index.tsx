import { Stack, Rating, Typography, LinearProgress } from '@mui/material';
import { useState } from 'react';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import globalStyles from '~/styles';
import HoverableStack from '~/components/atoms/HoverableStack';
import ThumbnailImage from '~/components/atoms/image/ThumbnailImage';
import { ClassStatusKeys } from '~/models/variables';
import { ClassStatusList } from '~/constants';
import { useDispatchGetAllSubjects } from '~/hooks';
import TextPropLine from '~/components/atoms/texts/TextPropLine';
import { formatDate } from '~/utils/date';

interface UserClassItemProps {
  code: string | undefined;
  imageUrl: string | undefined;
  imageAlt: string | undefined;
  teacherName?: string[];
  name: string | undefined;
  progressValue: number | undefined;
  subjectId: number | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  numberOfStudent?: number | undefined;
  min?: number | undefined;
  max?: number | undefined;
  onAddFeedback?: () => void;
  onEditFeedback?: () => void;
  onClick: () => void;
  status: ClassStatusKeys;
}
export default function UserClassItem({
  code,
  name,
  imageAlt,
  imageUrl,
  progressValue,
  status,
  teacherName,
  subjectId,
  startDate,
  endDate,
  onClick,
  onAddFeedback,
  onEditFeedback,
  max,
  min,
  numberOfStudent,
}: UserClassItemProps) {
  const { optionSubjects } = useDispatchGetAllSubjects();
  const statusLabel = ClassStatusList?.find(
    (item) => item.value === status
  )?.label;
  const subjectLabel = optionSubjects?.find(
    (item) => item.id === subjectId
  )?.label;

  return (
    <HoverableStack onClick={onClick}>
      {statusLabel && (
        <Stack
          sx={{
            position: 'absolute',
            top: MetricSize.small_5,
            left: MetricSize.small_5,
            borderRadius: MetricSize.small_5,
            background: `${Color.navy}AA`,
            padding: 1,
            color: Color.white,
            fontFamily: FontFamily.regular,
            fontSize: FontSize.small_14,
          }}
        >
          {statusLabel}
        </Stack>
      )}
      {subjectId !== -1 && (
        <Stack
          sx={{
            position: 'absolute',
            top: MetricSize.small_5,
            right: MetricSize.small_5,
            borderRadius: MetricSize.small_5,
            background: `${Color.grey}`,
            padding: 1,
            color: Color.white,
            fontFamily: FontFamily.regular,
            fontSize: FontSize.small_14,
          }}
        >
          {subjectLabel}
        </Stack>
      )}
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
            height: min ? '250px' : '100px',
          }}
        >
          <Typography
            sx={{
              fontSize: FontSize.small_14,
              fontFamily: FontFamily.bold,
              color: Color.tertiary,
            }}
          >
            {code || ''}
          </Typography>
          <Typography
            sx={{
              fontSize: FontSize.small_14,
              fontWeight: 'bold',
              fontFamily: FontFamily.bold,
              ...globalStyles.textTwoLineEllipsis,
            }}
          >
            {` ${name ? name?.toUpperCase() : ''}` || ''}
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

          {startDate && (
            <TextPropLine
              icon="date"
              label="Ngày bắt đầu"
              value={formatDate(startDate)}
            />
          )}
          {endDate && (
            <TextPropLine
              icon="date"
              label="Ngày kết thúc"
              value={formatDate(endDate)}
            />
          )}
          {numberOfStudent !== undefined && numberOfStudent >= 0 && (
            <TextPropLine
              icon="number"
              label="Số lượng học sinh"
              value={`${numberOfStudent}`}
            />
          )}
          {!!min && (
            <TextPropLine
              icon="number"
              label="Số lượng học sinh tối thiểu"
              value={`${min}`}
            />
          )}
          {!!max && (
            <TextPropLine
              icon="number"
              label="Số lượng học sinh tối đa"
              value={`${max}`}
            />
          )}
          {progressValue !== -1 && (
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
          )}
        </Stack>
      </Stack>
    </HoverableStack>
  );
}
