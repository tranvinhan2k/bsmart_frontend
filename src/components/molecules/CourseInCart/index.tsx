import { Stack } from '@mui/material';
import Box from '@mui/material/Box/Box';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio/Radio';
import Typography from '@mui/material/Typography';
import React from 'react';
import { CartItem, RequestCartItem } from '~/api/cart';
import { Color, MetricSize } from '~/assets/variables';

interface CourseInCartProps {
  row: CartItem;
  onUpdate: (data: RequestCartItem) => void;
}

function CourseInCart({ row, onUpdate }: CourseInCartProps) {
  const chosenSubCourse = row.subCourses.find((item) => item.isChosen);
  const [subCourseId, setSubCourseId] = React.useState<number>(
    chosenSubCourse?.id || 0
  );

  function handleUpdateSubCourse(data: RequestCartItem) {
    onUpdate(data);
  }
  return (
    <Stack>
      <Stack>
        <Typography>{row.id}</Typography>
        <Typography>{row.image?.url}</Typography>
        <Typography>{row.level}</Typography>
        <Typography>{row.mentor?.fullName}</Typography>
        <Typography>{row.referenceDiscount}</Typography>
        <Typography>{row.status}</Typography>
        <Typography>{row.subject?.name}</Typography>
      </Stack>
      <Stack flexDirection="row">
        {row.subCourses.map((subCourse) => (
          <Stack
            sx={{
              margin: MetricSize.small_5,
              background: Color.whiteSmoke,
              padding: MetricSize.small_10,
              boxShadow: 3,
              borderColor: subCourse.isChosen
                ? Color.orange
                : Color.transparent,
              borderWidth: '2px',
              borderRadius: '5px',
              borderStyle: 'solid',
            }}
            key={subCourse.id}
          >
            <Box>
              <Checkbox
                onClick={() =>
                  handleUpdateSubCourse({
                    cartItemId: row.cartItemId,
                    subCourseId: subCourse.id,
                  })
                }
                color="secondary"
                checked={subCourse.isChosen}
              />
              <Stack sx={{ paddingX: MetricSize.medium_15 }}>
                <Typography>{subCourse.id}</Typography>
                <Typography>{subCourse.isChosen}</Typography>
                <Typography>{subCourse.level}</Typography>
                <Typography>{subCourse.price}</Typography>
                <Typography>{subCourse.startDateExpected}</Typography>
                <Typography>{subCourse.endDateExpected}</Typography>
                <Typography>{subCourse.status}</Typography>
                <Typography>{subCourse.typeLearn}</Typography>
              </Stack>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default CourseInCart;
