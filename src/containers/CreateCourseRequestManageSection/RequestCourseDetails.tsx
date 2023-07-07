import { Avatar, Divider, Grid, Stack, Typography } from '@mui/material';
import { handleDefinedTextReturnComp } from '~/utils/checkDeined';
import { formatISODateStringToDisplayDate } from '~/utils/date';
import { formatMoney } from '~/utils/money';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_ITEM_LABEL,
  SX_FORM_ITEM_VALUE,
  SX_FORM_LABEL,
} from './style';

interface RequestCourseDetailsProps {
  row: any;
}

export default function RequestCourseDetails({
  row,
}: RequestCourseDetailsProps) {
  const userAvatar = row.imageUrl;

  const title0 = [
    {
      id: 0,
      label: 'Mã khóa học',
      value: handleDefinedTextReturnComp(row.courseCode),
      isAligned: true,
    },
    {
      id: 1,
      label: 'Tên khóa học',
      value: handleDefinedTextReturnComp(row.courseName),
      isAligned: false,
    },
    {
      id: 2,
      label: 'Kĩ năng',
      value: handleDefinedTextReturnComp(undefined),
      isAligned: false,
    },
  ];
  const title1 = [
    {
      id: 0,
      label: 'Dự kiến bắt đầu',
      value: handleDefinedTextReturnComp(
        formatISODateStringToDisplayDate(row.startDateExpected)
      ),
    },
    {
      id: 1,
      label: 'Dự kiến kết thúc',
      value: handleDefinedTextReturnComp(
        formatISODateStringToDisplayDate(row.endDateExpected)
      ),
    },
    {
      id: 2,
      label: 'Học sinh tối thiểu',
      value: handleDefinedTextReturnComp(row.minStudent),
    },
    {
      id: 3,
      label: 'Học sinh tối đa',
      value: handleDefinedTextReturnComp(row.maxStudent),
    },
  ];

  const title2 = [
    {
      id: 0,
      label: 'Học phí',
      value: handleDefinedTextReturnComp(formatMoney(row.price)),
    },
    // {
    //   id: 1,
    //   label: 'Phân loại',
    //   value: ``,
    // },
  ];

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>Khóa học</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Avatar
            src={userAvatar}
            variant="rounded"
            sx={{
              width: 300,
              height: 150,
            }}
          />
        </Grid>
        <Grid item container xs={12} lg={6} spacing={2}>
          {title0.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Stack
                direction={item.isAligned ? 'row' : 'column'}
                justifyContent={item.isAligned ? 'space-between' : 'flex-start'}
                alignItems={item.isAligned ? 'flex-start' : 'flex-start'}
              >
                <Typography sx={SX_FORM_ITEM_LABEL}>{item.label}:</Typography>
                <Typography sx={SX_FORM_ITEM_VALUE}>{item.value}</Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>

        {/*  */}
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item container xs={12} lg={6} spacing={1}>
          {title1.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
              >
                <Typography sx={SX_FORM_ITEM_LABEL}>{item.label}:</Typography>
                <Typography sx={SX_FORM_ITEM_VALUE}>{item.value}</Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Grid item container xs={12} lg={6} spacing={1}>
          {title2.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
              >
                <Typography sx={SX_FORM_ITEM_LABEL}>{item.label}:</Typography>
                <Typography sx={SX_FORM_ITEM_VALUE}>{item.value}</Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
        {/* {title2.map((itemTitle: any) => (
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
        ))} */}
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography sx={SX_FORM_ITEM_LABEL}>Mô tả</Typography>
            <Typography sx={SX_FORM_ITEM_VALUE}>
              {handleDefinedTextReturnComp(row.courseDescription)}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
