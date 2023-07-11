import { Stack, Box, Typography } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import { image } from '~/constants/image';
import globalStyles from '~/styles';
import { CourseStatusKeys, LevelKeys } from '~/models/variables';
import { LEVEL_LABELS } from '~/constants/level';
import CourseStatusBar from './CourseStatusBar';
import LevelBar from './LevelBar';

interface UserCourseItemProps {
  imageUrl: string | undefined;
  imageAlt: string | undefined;
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
    <Stack
      onClick={onClick}
      sx={{
        transition: 'all 200ms ease',
        marginBottom: MetricSize.medium_15,
        marginRight: { xs: '0', md: '10px' },
        boxShadow: 2,
        borderColor: Color.grey,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        position: 'relative',
        background: Color.white,
        filter: 'contrast(1)',
        WebkitFontSmoothing: 'subpixel-antialiased',
        backfaceVisibility: 'hidden',
        ':hover': {
          cursor: 'pointer',
          boxShadow: 10,
          // transform: 'scale(1.005)',
          transformOrigin: '100% 0',
          WebkitFontSmoothing: 'subpixel-antialiased',
        },
      }}
    >
      <CourseStatusBar courseStatus={courseStatus} />
      <LevelBar level={level} />
      <Stack>
        <Box
          loading="lazy"
          component="img"
          sx={{
            objectFit: 'cover',
            width: '100%',
            height: undefined,
            aspectRatio: 16 / 9,
            backgroundColor: '#0093E9',
            background: '#F5F5F5',
          }}
          src={imageUrl || image.mockCourse}
          alt={imageAlt}
        />

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
            <Typography sx={globalStyles.textLowSmallLight}>
              {subjectName || ''}
            </Typography>
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
                  <span key={index}>{`${
                    index !== 0 ? ', ' : ''
                  } ${item} `}</span>
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
      </Stack>
    </Stack>
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
