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

interface CartSubCoursePayload {
  id: number;
  level: string;
  status: string;
  startDateExpected: string;
  endDateExpected: string;
  price: number;
  typeLearn: string;
  isChosen: boolean;
}

interface CarouselCourseProps {
  label: string;
  items: CartSubCoursePayload[];
  cartItemId: number;
  onUpdate: any;
}
export default function CarouselSubCourse({
  label,
  items,
  cartItemId,
  onUpdate,
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
          margin: MetricSize.small_5,
          background: Color.whiteSmoke,
          padding: MetricSize.small_10,
          boxShadow: 3,
          borderColor: item.isChosen ? Color.tertiary : Color.transparent,
          borderWidth: '2px',
          borderRadius: '5px',
          borderStyle: 'solid',
        }}
        key={item.id}
      >
        <Box>
          <Checkbox
            onClick={() =>
              onUpdate({
                cartItemId,
                subCourseId: item.id,
              })
            }
            color="secondary"
            checked={item.isChosen}
          />
          <Stack sx={{ paddingX: MetricSize.medium_15 }}>
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
      </Stack>
    );
  };
  return (
    <Stack sx={{ width: '100%' }}>
      <Stack sx={{ marginTop: MetricSize.medium_15, width: 700 }}>
        <Carousel
          breakPoints={breakPoints}
          renderArrow={renderArrow}
          renderPagination={renderNavigationDot}
        >
          {items.map((item) => {
            return <div key={item.id}>{renderItem(item)}</div>;
          })}
        </Carousel>
      </Stack>
    </Stack>
  );
}
