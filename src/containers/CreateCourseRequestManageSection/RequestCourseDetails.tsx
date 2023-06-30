import { Avatar, Divider, Grid, Typography, Stack } from '@mui/material';
import { formatISODateStringToDisplayDate } from '~/utils/date';
import { formatMoney } from '~/utils/money';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_LABEL,
  SX_FORM_ITEM_LABEL,
  SX_FORM_ITEM_VALUE,
} from './style';

interface RequestCourseDetailsProps {
  row: any;
}

export default function RequestCourseDetails({
  row,
}: RequestCourseDetailsProps) {
  const userAvatar = row.imageUrl;

  const title1 = [
    {
      id: 0,
      display: [
        { id: 0, label: 'Mã khóa học', value: row.courseCode },
        {
          id: 1,
          label: 'Tên khóa học',
          value: row.courseName,
        },
        {
          id: 2,
          label: 'Tên khóa học',
          value: row.subCourseTitle,
        },
      ],
    },
    {
      id: 1,
      display: [
        {
          id: 0,
          label: 'Bắt đầu dự kiến',
          value: formatISODateStringToDisplayDate(row.startDateExpected),
        },
        {
          id: 1,
          label: 'Kết thúc dự kiến',
          value: formatISODateStringToDisplayDate(row.endDateExpected),
        },
        {
          id: 2,
          label: 'Học sinh tối thiểu / tối đa',
          value: `${row.minStudent}/${row.maxStudent}`,
        },
      ],
    },
  ];

  const title2 = [
    {
      id: 0,
      display: [
        {
          id: 0,
          label: 'Học phí',
          value: formatMoney(row.price),
        },
        {
          id: 1,
          label: 'Phân loại',
          value: `${row.categoryDtoList.name} - ${row.subject.name}`,
        },
      ],
    },
    {
      id: 1,
      display: [
        {
          id: 2,
          label: 'Trình độ',
          value: row.level,
        },
        {
          id: 3,
          label: 'Hình thức học',
          value: row.typeLearn,
        },
      ],
    },
  ];

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>Khóa học</Typography>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Avatar
            src={userAvatar}
            variant="rounded"
            sx={{
              width: 300,
              height: 150,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {title1.map((itemTitle: any) => (
          <Grid item xs={12} lg={6} container spacing={2} key={itemTitle.id}>
            {itemTitle.display.map((itemDisplay: any) => (
              <Grid item xs={12} key={itemDisplay.id}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Typography sx={SX_FORM_ITEM_LABEL}>
                    {itemDisplay.label}:
                  </Typography>
                  <Typography sx={SX_FORM_ITEM_VALUE}>
                    {itemDisplay.value}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        ))}
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {title2.map((itemTitle: any) => (
          <Grid item xs={12} lg={6} container spacing={2} key={itemTitle.id}>
            {itemTitle.display.map((itemDisplay: any) => (
              <Grid item xs={12} key={itemDisplay.id}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Typography sx={SX_FORM_ITEM_LABEL}>
                    {itemDisplay.label}:
                  </Typography>
                  <Typography sx={SX_FORM_ITEM_VALUE}>
                    {itemDisplay.value}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        ))}
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography sx={SX_FORM_ITEM_LABEL}>Mô tả</Typography>
            <pre
              style={{
                fontFamily: 'inherit',
                whiteSpace: 'break-spaces',
              }}
            >
              <Typography sx={SX_FORM_ITEM_VALUE}>
                {row.courseDescription}
              </Typography>
            </pre>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
