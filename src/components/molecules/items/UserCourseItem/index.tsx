import { Stack, Box, Typography } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import globalStyles from '~/styles';
import { CourseStatusKeys, LevelKeys } from '~/models/variables';
import CourseStatusBar from './CourseStatusBar';
import LevelBar from './LevelBar';
import HoverableStack from '~/components/atoms/HoverableStack';
import ThumbnailImage from '~/components/atoms/image/ThumbnailImage';

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
  courseDescription: string | undefined;
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
          <Typography
            dangerouslySetInnerHTML={{ __html: courseDescription || '' }}
            sx={{
              ...globalStyles.textLowSmallLight,
              marginY: 1,
            }}
          />
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItem: 'center',
            justifyContent: 'space-between',
            paddingBottom: 1,
            marginTop: 1,
          }}
        >
          {Boolean(totalClass) && (
            <Box
              sx={{
                fontFamily: FontFamily.medium,
                fontSize: FontSize.small_14,
              }}
            >
              {`${totalClass} lớp đang mở` || ''}
            </Box>
          )}
          {/* {courseType && (
              <Box>
                <Tag
                  title={courseTypeData[courseType as CourseTypeDataKeys]}
                  color="tertiary"
                />
              </Box>
            )} */}
        </Stack>
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
