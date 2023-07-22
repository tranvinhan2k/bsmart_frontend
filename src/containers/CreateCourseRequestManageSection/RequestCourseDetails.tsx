import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { Fragment } from 'react';
import { FontFamily } from '~/assets/variables';
import { useQueryGetClassesOfCourseWithCourseDetails } from '~/hooks/class/useQueryGetClassesWithCourseDetails';
import { handleDefinedTextReturnComp } from '~/utils/commonComp';
import { formatMoney } from '~/utils/money';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_ITEM_LABEL,
  SX_FORM_ITEM_VALUE,
  SX_FORM_LABEL,
} from './style';

interface RequestCourseDetailsProps {
  idCourse: number;
}

export default function RequestCourseDetails({
  idCourse,
}: RequestCourseDetailsProps) {
  // const userAvatar = row.imageUrl;

  // const idCourse = row.id;
  const { classesOfCourseWithCourseDetails, isLoading } =
    useQueryGetClassesOfCourseWithCourseDetails(idCourse);

  const title0 = classesOfCourseWithCourseDetails
    ? [
        {
          id: 0,
          label: 'Mã khóa học',
          value: handleDefinedTextReturnComp(
            classesOfCourseWithCourseDetails.code
          ),
        },
        {
          id: 1,
          label: 'Tên khóa học',
          value: handleDefinedTextReturnComp(
            classesOfCourseWithCourseDetails.name
          ),
        },
        {
          id: 2,
          label: 'Category',
          value: handleDefinedTextReturnComp(
            classesOfCourseWithCourseDetails.categoryResponse.name
          ),
        },
        {
          id: 3,
          label: 'Subject',
          value: handleDefinedTextReturnComp(
            classesOfCourseWithCourseDetails.subjectResponse.name
          ),
        },
        {
          id: 4,
          label: 'Trình độ',
          value: handleDefinedTextReturnComp(
            classesOfCourseWithCourseDetails.level
          ),
        },
        {
          id: 5,
          label: 'Mô tả',
          value: handleDefinedTextReturnComp(
            classesOfCourseWithCourseDetails.description
          ),
        },
      ]
    : [
        {
          id: 0,
          label: 'Mã khóa học',
          value: '',
        },
        {
          id: 1,
          label: 'Tên khóa học',
          value: '',
        },
        {
          id: 2,
          label: 'Category',
          value: '',
        },
        {
          id: 3,
          label: 'Kĩ năng',
          value: '',
        },
        {
          id: 4,
          label: 'Subject',
          value: '',
        },
        {
          id: 5,
          label: 'Mô tả',
          value: '',
        },
      ];

  const title1 = classesOfCourseWithCourseDetails
    ? [
        {
          id: 0,
          label: 'Trình độ',
          value: handleDefinedTextReturnComp(
            classesOfCourseWithCourseDetails.level
          ),
        },
      ]
    : [
        {
          id: 0,
          label: 'Trình độ',
          value: '',
        },
      ];

  // const title2 = classesOfCourseWithCourseDetails
  //   ? [
  //       {
  //         id: 0,
  //         label: 'Học phí',
  //         value: handleDefinedTextReturnComp(formatMoney(row.price)),
  //       },
  //     ]
  //   : [
  //       {
  //         id: 0,
  //         label: 'Học phí',
  //         value: '',
  //       },
  //     ];

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
            src=""
            variant="rounded"
            sx={{
              width: 300,
              height: 150,
            }}
          />
        </Grid>
        <Grid item container xs={12} lg={6} spacing={2}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Typography sx={SX_FORM_ITEM_LABEL}>Mã khóa học:</Typography>
              <Typography sx={SX_FORM_ITEM_VALUE}>
                {isLoading ? <Skeleton width={200} /> : title0[0].value}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
            >
              <Typography sx={SX_FORM_ITEM_LABEL}>Tên khóa học:</Typography>
              <Typography sx={SX_FORM_ITEM_VALUE}>
                {isLoading ? <Skeleton /> : title0[1].value}
              </Typography>
            </Stack>
          </Grid>
          {/* <Grid item xs={12}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
            >
              <Typography sx={SX_FORM_ITEM_LABEL}>Kĩ năng</Typography>
              <Typography sx={SX_FORM_ITEM_VALUE}>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <>
                    {title0[2].value} - {title0[3].value}
                  </>
                )}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
            >
              <Typography sx={SX_FORM_ITEM_LABEL}>Trình độ</Typography>
              <Typography sx={SX_FORM_ITEM_VALUE}>
                {isLoading ? <Skeleton /> : title0[4].value}
              </Typography>
            </Stack>
          </Grid> */}
        </Grid>

        {/*  */}
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item container xs={12} lg={12} spacing={2}>
          <Grid item xs={6}>
            <Typography sx={SX_FORM_ITEM_LABEL}>Kĩ năng:</Typography>
          </Grid>
          <Grid item xs={6}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={1}
              >
                <Chip
                  color="default"
                  label={`${title0[2].value}`}
                  title={`${title0[2].value}`}
                />
                <Chip
                  color="default"
                  label={`${title0[3].value}`}
                  title={`${title0[3].value}`}
                />
              </Stack>
            )}
          </Grid>
          {/* <Grid item xs={12}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
            >
              <Typography sx={SX_FORM_ITEM_LABEL}>Kĩ năng</Typography>
              <Typography sx={SX_FORM_ITEM_VALUE}>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <>
                    {title0[2].value} - {title0[3].value}
                  </>
                )}
              </Typography>
            </Stack>
          </Grid> */}
          {title1.map((item) => (
            <Fragment key={item.id}>
              <Grid item xs={6}>
                <Typography sx={SX_FORM_ITEM_LABEL}>{item.label}:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={SX_FORM_ITEM_VALUE} align="right">
                  {isLoading ? <Skeleton /> : item.value}
                </Typography>
              </Grid>
            </Fragment>
          ))}
        </Grid>
        {/* <Grid item container xs={12} lg={6} spacing={1}>
          {title2.map((item) => (
            <Fragment key={item.id}>
              <Grid item xs={6}>
                <Typography sx={SX_FORM_ITEM_LABEL}>{item.label}:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={SX_FORM_ITEM_VALUE} align="right">
                  {isLoading ? <Skeleton /> : item.value}
                </Typography>
              </Grid>
            </Fragment>
          ))}
        </Grid> */}
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
          >
            <Typography sx={SX_FORM_ITEM_LABEL}>Mô tả:</Typography>
            {isLoading ? (
              <Skeleton />
            ) : (
              <Box
                sx={{ fontFamily: FontFamily.regular }}
                dangerouslySetInnerHTML={{ __html: `${title0[5].value}` }}
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
