import { Stack, Grid, Typography, Box } from '@mui/material';
import { PagingFilterPayload } from '~/models';
import { SubCoursePayload } from '~/models/subCourse';
import courseImage from '~/assets/images/front-end-course.png';
import { Color, FontFamily, FontSize } from '~/assets/variables';
import { formatDate } from '~/utils/date';
import { formatMoney } from '~/utils/money';
import TextLine from '~/components/atoms/TextLine';
import Button from '~/components/atoms/Button';

interface SubCourseListProps {
  data: PagingFilterPayload<SubCoursePayload>;
}

export default function SubCourseList({ data }: SubCourseListProps) {
  function handleSubCourse() {}
  return (
    <Stack>
      <Typography
        sx={{ fontSize: FontSize.medium_28, fontFamily: FontFamily.bold }}
      >
        Hãy chọn loại khóa học bạn muốn tham gia
      </Typography>
      <Grid container>
        {data.items &&
          data.items.map((item) => {
            return (
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  boxShadow: 3,
                  margin: 1,
                  borderRadius: '5px',
                  ':hover': {
                    cursor: 'pointer',
                    background: Color.grey,
                  },
                }}
                key={item.id}
              >
                <Box
                  sx={{
                    objectFit: 'contain',
                    width: '100%',
                    borderRadius: '5px',
                  }}
                  component="img"
                  src={courseImage}
                  alt="image"
                />
                <Stack padding={2}>
                  <TextLine
                    label="Giá tiền"
                    variable={formatMoney(item.price)}
                  />
                  <TextLine
                    label="Ngày bắt đầu dự kiến "
                    variable={formatDate(item.startDateExpected)}
                  />
                  <TextLine
                    label="Ngày kết thúc dự kiến"
                    variable={formatDate(item.endDateExpected)}
                  />
                  <TextLine label="Trình độ" variable={item.level} />
                  <TextLine
                    label="Số lượng học sinh tối thiểu"
                    variable={`${item.minStudent}`}
                  />
                  <TextLine
                    label="Số lượng học sinh tối đa"
                    variable={`${item.maxStudent}`}
                  />
                  <TextLine label="Trạng thái" variable={item.status} />
                </Stack>
                <Stack padding={2}>
                  <Button customVariant="normal">Xem chi tiết</Button>
                  <Button marginTop="small_10" customVariant="outlined">
                    Thêm vào giỏ hàng
                  </Button>
                </Stack>
              </Grid>
            );
          })}
      </Grid>
    </Stack>
  );
}
