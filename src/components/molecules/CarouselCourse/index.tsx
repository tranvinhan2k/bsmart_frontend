// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  Box,
  Button as MUIButton,
  IconButton,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import Carousel, {
  RenderArrowProps,
  RenderPaginationProps,
} from 'react-elastic-carousel';
import { Color, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { CourseMenuItemPayload, CoursePayload } from '~/models/type';
import UserCourseItem from '../items/UserCourseItem';
import globalStyles from '~/styles';
import { useQueryGetAllCourse } from '~/hooks';

const breakPoints = [
  { width: 1, itemsToShow: 2 },
  { width: 550, itemsToShow: 3 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
interface CarouselCourseProps {
  label: string;
}
export default function CarouselCourse({ label }: CarouselCourseProps) {
  const handleNavigateCourse = (courseId: number) => {
    // TODO: navigate to coures detail
  };

  const { courses, error, isLoading } = useQueryGetAllCourse();

  const renderArrow = ({ type, onClick }: RenderArrowProps) => {
    if (type === 'NEXT') {
      return (
        <Stack
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: MetricSize.large_20,
            top: 0,
            bottom: 0,
            zIndex: 10,
          }}
        >
          <IconButton
            sx={{
              transition: 'all 500ms ease',
              padding: 2,
              background: Color.transparent,
              backdropFilter: 'blur(0px)',
              ':hover': {
                background: `${Color.navy}AA`,
                backdropFilter: 'blur(5px)',
              },
            }}
            onClick={onClick}
          >
            <Icon name="right" size="small" color="white" />
          </IconButton>
        </Stack>
      );
    }
    return (
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          left: MetricSize.large_20,
          top: 0,
          bottom: 0,
          zIndex: 10,
        }}
      >
        <IconButton
          sx={{
            transition: 'all 500ms ease',
            padding: 2,
            background: Color.transparent,
            backdropFilter: 'blur(0px)',
            ':hover': {
              background: `${Color.navy}AA`,
              backdropFilter: 'blur(5px)',
            },
          }}
          onClick={onClick}
        >
          <Icon name="left" size="small" color="white" />
        </IconButton>
      </Stack>
    );
  };

  const renderNavigationDot = ({
    onClick,
    activePage,
    pages,
  }: RenderPaginationProps) => {
    return (
      <Stack flexDirection="row">
        {pages.map((page, index) => (
          <Box key={index}>
            <IconButton onClick={() => onClick(`${page}`)}>
              <Icon
                name="dot"
                size="small"
                color={activePage === page ? 'navy' : 'grey'}
              />
            </IconButton>
          </Box>
        ))}
      </Stack>
    );
  };

  const renderItem = (item: CourseMenuItemPayload) => {
    return (
      <UserCourseItem
        courseName={item.courseName}
        courseDescription={item.courseDescription}
        imageUrl={item.imageUrl}
        imageAlt={item.imageAlt}
        level={item.level}
      />
    );
  };
  return (
    <Stack>
      <Stack>
        <Typography sx={globalStyles.textSmallLabel}>{label}</Typography>
      </Stack>
      <Stack
        sx={{
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: -1,
          marginRight: -2,
        }}
      >
        <Carousel
          breakPoints={breakPoints}
          renderArrow={renderArrow}
          renderPagination={renderNavigationDot}
        >
          {courses.items.map((item, index) => (
            <div key={index}>{renderItem(item)}</div>
          ))}
        </Carousel>
      </Stack>
    </Stack>
  );
}
