import { Stack, Box, Typography, Rating } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import globalStyles from '~/styles';
import { CourseStatusKeys, LevelKeys } from '~/models/variables';
import CourseStatusBar from './CourseStatusBar';
import LevelBar from './LevelBar';
import HoverableStack from '~/components/atoms/HoverableStack';
import ThumbnailImage from '~/components/atoms/image/ThumbnailImage';
import { formatMoney } from '~/utils/money';

interface UserCourseItemProps {
  imageUrl: string | undefined;
  imageAlt: string | undefined;
  courseCode?: string;
  courseTeacherName?: string[];
  courseName: string | undefined;
  subjectName?: string;
  courseStatus?: CourseStatusKeys;
  totalClass?: number;
  level: LevelKeys;
  courseDescription?: string | undefined;
  rating?: number;
  numberOfRating?: number;
  onClick?: () => void;
}
export default function UserCourseItem({
  courseDescription,
  courseName,
  courseCode,
  subjectName,
  courseTeacherName,
  totalClass,
  courseStatus,
  imageAlt,
  level,
  imageUrl,
  numberOfRating,
  rating,
  onClick,
}: UserCourseItemProps) {
  return (
    <HoverableStack onClick={onClick}>
      <CourseStatusBar courseStatus={courseStatus} />
      <LevelBar level={level} />
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
            height: '150px',
            overflow: 'hidden',
          }}
        >
          <Stack sx={globalStyles.viewFlexRowCenter}>
            <Typography
              sx={{
                fontSize: FontSize.small_14,
                fontFamily: FontFamily.bold,
                color: Color.tertiary,
              }}
            >
              {courseCode || ''}
            </Typography>
            <Typography marginLeft={1} sx={globalStyles.textLowSmallLight}>
              {subjectName || ''}
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontSize: FontSize.small_14,
              fontWeight: 'bold',
              fontFamily: FontFamily.bold,
            }}
          >
            {courseName?.toUpperCase() || ''}
          </Typography>
          <Typography
            noWrap
            sx={{
              fontSize: FontSize.small_14,
              fontFamily: FontFamily.light,
              color: Color.grey,
            }}
          >
            {courseTeacherName &&
              courseTeacherName.map((item, index) => (
                <span key={index}>{`${index !== 0 ? ', ' : ''} ${item} `}</span>
              ))}
          </Typography>
          {rating !== 0 && numberOfRating && (
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: FontSize.small_14,
                  fontFamily: FontFamily.bold,
                }}
              >
                {rating?.toFixed(1)}
              </Typography>
              <Rating value={rating} readOnly size="small" />
              <Typography sx={globalStyles.textLowSmallLight}>
                {`(${formatMoney(numberOfRating, true)})`}
              </Typography>
            </Stack>
          )}
          <Typography
            dangerouslySetInnerHTML={{ __html: courseDescription || '' }}
            sx={{
              ...globalStyles.textLowSmallLight,
              marginY: 1,
            }}
          />
        </Stack>
        {totalClass !== 0 && (
          <Stack
            sx={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItem: 'center',
              justifyContent: 'space-between',
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              background: '#fff',
              padding: 1,
              borderTop: '0.5px solid #ddd',
            }}
          >
            <Box
              sx={{
                fontFamily: FontFamily.medium,
                fontSize: FontSize.small_14,
              }}
            >
              {`Hiện tại có ${totalClass} lớp` || ''}
            </Box>

            {/* {courseType && (
              <Box>
                <Tag
                  title={courseTypeData[courseType as CourseTypeDataKeys]}
                  color="tertiary"
                />
              </Box>
            )} */}
          </Stack>
        )}
      </Stack>
    </HoverableStack>
  );
}
UserCourseItem.defaultProps = {
  // courseType: '',
  courseTeacherName: '',
  courseStatus: '',
  subjectName: '',
  totalClass: 0,
  onClick: null,
};
