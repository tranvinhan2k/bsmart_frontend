import React from 'react';
import {
  IconButton,
  Stack,
  Typography,
  Button as MUIButton,
} from '@mui/material';
import Carousel, {
  RenderArrowProps,
  RenderPaginationProps,
} from 'react-elastic-carousel';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { Colors, FontFamilies, FontSize, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { CoursePayload } from '~/models/courses';
import Button from '~/components/atoms/Button';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
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
        <MUIButton onClick={onClick}>
          <Icon name="next2" size="medium" />
        </MUIButton>
      );
    }
    return (
      <MUIButton onClick={onClick}>
        <Icon name="previous" size="medium" />
      </MUIButton>
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
      <Stack
        sx={{
          borderRadius: '5px',
          borderColor: Colors.grey,
          borderWidth: 1,
          borderStyle: 'solid',
          marginX: MetricSize.small,
        }}
      >
        <Box
          sx={{ width: '100%', objectFit: 'cover' }}
          component="img"
          src={item.image}
          alt="image background"
        />
        <Stack sx={{ paddingX: MetricSize.medium }}>
          <Box
            sx={{
              position: 'relative',
              top: '-40px',
              background: Colors.white,
              width: '65px',
              objectFit: '65px',
              padding: '3px',
              borderRadius: '5px',
              borderColor: Colors.grey,
              borderStyle: 'solid',
            }}
            component="img"
            src={item.mentorImage}
            alt="image mentor"
          />
          <Typography
            sx={{ fontSize: FontSize.medium, fontFamily: FontFamilies.bold }}
          >
            {item.title}
          </Typography>
          <Typography
            sx={{
              fontSize: FontSize.small,
              fontFamily: FontFamilies.regular,
              color: Colors.grey,
            }}
          >
            {item.mentor}
          </Typography>
          <Typography
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              fontSize: FontSize.small,
              fontFamily: FontFamilies.regular,
            }}
          >
            {item.content}
          </Typography>
          <Rating value={item.feedback} readOnly />
          <Box sx={{ padding: MetricSize.medium }}>
            <Button
              customVariant="normal"
              onClick={() => handleNavigateCourse(item.id)}
            >
              Tham Gia
            </Button>
          </Box>
        </Stack>
      </Stack>
    );
  };
  return (
    <Stack>
      <Typography
        sx={{ fontFamily: FontFamilies.bold, fontSize: FontSize.medium }}
      >
        {label}
      </Typography>
      <Stack sx={{ marginTop: MetricSize.medium }}>
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
