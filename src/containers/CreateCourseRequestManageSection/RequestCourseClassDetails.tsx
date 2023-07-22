import { Button, Grid, Stack, Typography } from '@mui/material';
import { FontFamily } from '~/assets/variables';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_ITEM_LABEL,
  SX_FORM_ITEM_VALUE,
  SX_REQUEST_TITLE,
} from './style';

interface RequestCourseClassDetailsProps {
  onClose: () => void;
}
export default function RequestCourseClassDetails({
  onClose,
}: RequestCourseClassDetailsProps) {
  const tmpDisplayText = [
    {
      id: 0,
      label: 'Mã lớp',
      value: 'At46vf2',
    },
    {
      id: 1,
      label: 'HS tối thiểu',
      value: '10',
    },
    {
      id: 2,
      label: 'HS tối đa',
      value: '30',
    },
    {
      id: 3,
      label: 'Ngày bắt đầu',
      value: '2 thg 9, 2023',
    },
    {
      id: 4,
      label: 'Ngày kết thúc',
      value: '2 thg 11, 2023',
    },
    {
      id: 5,
      label: 'Số buổi học',
      value: '44',
    },
    {
      id: 6,
      label: 'Giá tiền',
      value: '',
    },
  ];

  return (
    <>
      <Typography sx={SX_REQUEST_TITLE}>Chi tiết lớp</Typography>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="stretch"
        columnSpacing={4}
        rowSpacing={2}
        py={2}
      >
        <Grid item sm={12} md={5} lg={4}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
            sx={SX_BOX_ITEM_WRAPPER}
          >
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}
            >
              {tmpDisplayText.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Typography sx={SX_FORM_ITEM_LABEL}>
                      {item.label}:
                    </Typography>
                    <Typography sx={SX_FORM_ITEM_VALUE}>
                      {item.value}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Grid>
        <Grid item sm={12} md={7} lg={8}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
            sx={SX_BOX_ITEM_WRAPPER}
          >
            <Typography>Thời khóa biểu</Typography>
          </Stack>
        </Grid>
      </Grid>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        mt={4}
      >
        <Button
          color="error"
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{ fontFamily: FontFamily.bold }}
        >
          Hủy
        </Button>
        <Button
          color="miSmartOrange"
          fullWidth
          type="submit"
          variant="contained"
          sx={{ fontFamily: FontFamily.bold }}
        >
          Phê duyệt lớp
        </Button>
      </Stack>
    </>
  );
}
