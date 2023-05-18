import { Box, Grid, Typography, Stack } from '@mui/material';
import Button from '~/components/atoms/Button';
import { SX_FORM_ITEM_TITLE_BOLD } from './style';
import {
  SX_FORM_ITEM_LABEL_BOLD,
  SX_FORM_ITEM_LABEL_LIGHT,
} from '~/containers/MentorCreateCourseRequestDetails/style';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_LABEL,
} from '~/containers/MentorCreateCourseRequestDetails/Right/style';

interface BasicInfoProps {
  mentorRequest: any;
}
export default function BasicInfo({ mentorRequest }: BasicInfoProps) {
  const tmpTitle = [
    { id: 0, label: 'Tên', value: mentorRequest.courses[0].name },
    { id: 0, label: 'Ngày bắt đầu', value: mentorRequest.courses[0].startDate },
    { id: 0, label: 'Ngày kết thúc', value: mentorRequest.courses[0].endDate },
    { id: 0, label: 'Trình độ', value: mentorRequest.courses[0].classLevel },
    { id: 0, label: 'Học phí', value: mentorRequest.courses[0].unitPrice },
    {
      id: 0,
      label: 'HS hiện có',
      value: mentorRequest.courses[0].numberStudent,
    },
    {
      id: 0,
      label: 'HS tối đa',
      value: mentorRequest.courses[0].maxNumberStudent,
    },
  ];

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Grid mb={4} container>
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>Danh sách khóa học</Typography>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            // columnSpacing={8}
            rowSpacing={2}
            mt={1}
          >
            <Grid
              container
              item
              xs={12}
              pb={4}
              sx={{ borderTop: 1, borderBottom: 1, borderColor: 'divider' }}
            >
              <Grid item xs={12}>
                <Box>
                  <Grid item xs={12}>
                    <Typography sx={SX_FORM_ITEM_TITLE_BOLD}>Lịch 1</Typography>
                  </Grid>
                  {tmpTitle.map((item) => (
                    <Grid item xs={12} key={item.id}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Typography sx={SX_FORM_ITEM_LABEL_BOLD}>
                          {item.label}:
                        </Typography>
                        <Typography sx={SX_FORM_ITEM_LABEL_LIGHT}>
                          {item.value}
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-start"
              spacing={2}
              mt={4}
            >
              <Button variant="outlined" size="medium" color="success">
                Phê duyệt
              </Button>
              <Button variant="outlined" size="medium" color="error">
                Từ chối
              </Button>
              <Button variant="outlined" size="medium" color="warning">
                Yêu cầu chỉnh sửa
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
}
