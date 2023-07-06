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
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { CoursePayload } from '~/models/courses';
import Button from '~/components/atoms/Button';
import { image } from '~/constants/image';
import UserCourseItem from '../UserCourseItem';
import globalStyles from '~/styles';

const breakPoints = [
  { width: 1, itemsToShow: 2 },
  { width: 550, itemsToShow: 3 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
interface CarouselCourseProps {
  label: string;
  items: CoursePayload[];
}
export default function CarouselCourse({ label, items }: CarouselCourseProps) {
  const handleNavigateCourse = (courseId: number) => {
    // TODO: navigate to coures detail
  };

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
        {pages.map((page) => (
          <Box key={page}>
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

  const renderItem = (item: CoursePayload) => {
    return (
      <UserCourseItem
        courseName={item.title}
        courseDescription={item.content}
        imageUrl={image.mockClass}
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
          {items.map((item) => (
            <div key={item.id}>{renderItem(item)}</div>
          ))}
        </Carousel>
      </Stack>
    </Stack>
  );
}
