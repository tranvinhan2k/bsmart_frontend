import { Stack } from '@mui/material';
import Box from '@mui/material/Box/Box';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import React from 'react';
import Divider from '@mui/material/Divider';
import { CartItem, RequestCartItem } from '~/api/cart';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import cousreImage from '~/assets/images/front-end-course.png';
import mentor from '~/assets/images/avatar-mentor-1.jpg';
import { formatDate } from '~/utils/date';
import { formatMoney } from '~/utils/money';
import CarouselSubCourse from '../CarouselSubCourse';

interface CourseInCartProps {
  row: CartItem;
  onUpdate: (data: RequestCartItem) => void;
}

function CourseInCart({ row, onUpdate }: CourseInCartProps) {
  const chosenSubCourse = row.subCourses.find((item) => item.isChosen);

  return (
    <Stack>
      <Stack
        sx={{
          padding: MetricSize.small_10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Stack>
          <Box
            src={cousreImage}
            alt="course image"
            component="img"
            sx={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              borderRadius: '5px',
            }}
          />
        </Stack>
        <Stack sx={{ padding: MetricSize.small_10 }}>
          <Typography
            sx={{ fontSize: FontSize.medium_28, fontFamily: FontFamily.medium }}
          >
            Khóa học lập trình C#
          </Typography>
          <Typography
            sx={{ fontSize: FontSize.small_18, fontFamily: FontFamily.light }}
          >
            {row.subject?.name}
          </Typography>
          <Typography>{row.level}</Typography>
          <Divider />
          <Stack
            flexDirection="row"
            sx={{ alignItems: 'center', paddingY: MetricSize.small_10 }}
          >
            <Box
              component="img"
              src={mentor}
              alt="mentor"
              sx={{
                width: MetricSize.large_30,
                height: MetricSize.large_30,
                borderRadius: 1000,
                objectFit: 'contain',
                marginRight: '5px',
              }}
            />
            <Typography
              sx={{
                fontSize: FontSize.small_18,
                fontFamily: FontFamily.regular,
              }}
            >
              {row.mentor?.fullName}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default CourseInCart;
