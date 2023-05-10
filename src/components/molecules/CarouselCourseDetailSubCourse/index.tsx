// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
  Box,
  Button as MUIButton,
  IconButton,
  Rating,
  Stack,
  Typography,
  Checkbox,
  Grid,
} from '@mui/material';
import Carousel, {
  RenderArrowProps,
  RenderPaginationProps,
} from 'react-elastic-carousel';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Icon from '~/components/atoms/Icon';
import { CoursePayload } from '~/models/courses';
import Button from '~/components/atoms/Button';
import { SubCoursePayload } from '~/models/subCourse';
import { formatDate } from '~/utils/date';
import { formatMoney } from '~/utils/money';
import cousreImage from '~/assets/images/front-end-course.png';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

interface CarouselCourseProps {
  items: CartSubCoursePayload[];
  onPayQuick: any;
  onAddToCart: (item: SubCoursePayload) => void;
}
export default function CarouselCourseDetailSubCourse({
  items,
  onPayQuick,
  onAddToCart,
}: CarouselCourseProps) {
  const handleNavigateCourse = (courseId: number) => {
    // TODO: navigate to coures detail
  };

  const renderArrow = ({ type, onClick }: RenderArrowProps) => {
    if (type === 'NEXT') {
      return (
        <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <MUIButton onClick={onClick}>
            <Icon name="next2" size="medium" />
          </MUIButton>
        </Stack>
      );
    }
    return (
      <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <MUIButton onClick={onClick}>
          <Icon name="previous" size="medium" />
        </MUIButton>
      </Stack>
    );
  };

  const renderNavigationDot = ({
    onClick,
    activePage,
    pages,
  }: RenderPaginationProps) => {
    return (
      <Stack flexDirection="row" marginY={1}>
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

  const renderItem = (item: CartSubCoursePayload) => {
    return (
      <Stack
        sx={{
          background: '#eee',
          borderColor: item.isChosen ? Color.orange : Color.transparent,
          borderWidth: '2px',
          borderRadius: '5px',
          borderStyle: 'solid',
        }}
        key={item.id}
      >
        <Box>
          <Stack sx={{ padding: MetricSize.large_20 }}>
            <Box
              component="img"
              src={cousreImage}
              sx={{
                width: '100%',
                borderRadius: '5px',
                paddingBottom: '5px',
              }}
            />
            {[
              {
                id: -1,
                label: 'Tên lớp học',
                variable: 'Lập trình căn bản',
              },
              {
                id: 0,
                label: 'Mức độ',
                variable: 'Cơ bản',
              },
              {
                id: 1,
                label: 'Giá tiền',
                variable: formatMoney(item.price),
              },
              {
                id: 2,
                label: ' Ngày khai giảng ',
                variable: formatDate(item.startDateExpected),
              },
              {
                id: 3,
                label: 'Ngày bế giảng',
                variable: formatDate(item.endDateExpected),
              },
              {
                id: 4,
                label: 'Hình thức',
                variable: item.typeLearn,
              },
            ].map((subCourseItem) => (
              <Stack
                key={subCourseItem.id}
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography
                  sx={{
                    fontSize: MetricSize.medium_15,
                    fontFamily: FontFamily.bold,
                  }}
                >
                  {subCourseItem.label}
                </Typography>
                <Typography
                  sx={{
                    paddingLeft: MetricSize.small_10,
                    fontSize: MetricSize.medium_15,
                    fontFamily: FontFamily.regular,
                  }}
                >
                  {subCourseItem.variable}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
        <Stack padding={2}>
          <Button onClick={() => onAddToCart(item)} customVariant="normal">
            Xem chi tiết
          </Button>
        </Stack>
      </Stack>
    );
  };
  return (
    <Stack sx={{ width: '100%' }}>
      <Grid
        container
        sx={{
          marginTop: MetricSize.medium_15,
          flexDirection: 'row',
          gap: '30px',
        }}
      >
        {items.map((item) => {
          return (
            <Grid item key={item.id} xs={12} md={3}>
              {renderItem(item)}
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
