import {
  Avatar,
  Button,
  Chip,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { Fragment, useState } from 'react';
import Icon from '~/components/atoms/Icon';
import { useGetCourseCreateRequestDetails } from '~/hooks/course/useGetCourseCreateRequestDetails';
import { handleDefinedTextReturnComp } from '~/utils/commonComp';
import globalStyles from '~/styles';
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
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleIsDescriptionExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const { courseCreateRequestDetails, isLoading } =
    useGetCourseCreateRequestDetails(idCourse);

  const title0 = courseCreateRequestDetails
    ? [
        {
          id: 0,
          label: 'Mã khóa học',
          value: handleDefinedTextReturnComp(courseCreateRequestDetails.code),
        },
        {
          id: 1,
          label: 'Tên khóa học',
          value: handleDefinedTextReturnComp(courseCreateRequestDetails.name),
        },
        {
          id: 2,
          label: 'Category',
          value: handleDefinedTextReturnComp(
            courseCreateRequestDetails.categoryResponse.name
          ),
        },
        {
          id: 3,
          label: 'Subject',
          value: handleDefinedTextReturnComp(
            courseCreateRequestDetails.subjectResponse.name
          ),
        },
        {
          id: 4,
          label: 'Trình độ',
          value: handleDefinedTextReturnComp(courseCreateRequestDetails.level),
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
      ];

  const courseDesc = courseCreateRequestDetails
    ? courseCreateRequestDetails.description
    : '';

  const title1 = courseCreateRequestDetails
    ? [
        {
          id: 0,
          label: 'Trình độ',
          value: handleDefinedTextReturnComp(courseCreateRequestDetails.level),
        },
      ]
    : [
        {
          id: 0,
          label: 'Trình độ',
          value: '',
        },
      ];

  // const title2 = courseCreateRequestDetails
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
        </Grid>
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
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="start"
          >
            <Typography sx={SX_FORM_ITEM_LABEL}>Mô tả:</Typography>
            {isLoading ? (
              <Skeleton />
            ) : (
              <>
                {courseDesc.length > 200 ? (
                  <Typography
                    sx={
                      isExpanded
                        ? globalStyles.displayEditorTextShowMore
                        : globalStyles.displayEditorTextShowLess
                    }
                    dangerouslySetInnerHTML={{
                      __html: `${
                        isExpanded
                          ? courseDesc
                          : `${courseDesc.slice(0, 200)}...`
                      }`,
                    }}
                  />
                ) : (
                  <Typography
                    sx={globalStyles.displayEditorTextShowLess}
                    dangerouslySetInnerHTML={{
                      __html: `${courseDesc}`,
                    }}
                  />
                )}

                <Button
                  color="miSmartOrange"
                  size="small"
                  disableRipple
                  endIcon={
                    isExpanded ? (
                      <Icon
                        name="expandLessIcon"
                        size="small"
                        color="tertiary"
                      />
                    ) : (
                      <Icon
                        name="expandMoreIcon"
                        size="small"
                        color="tertiary"
                      />
                    )
                  }
                  sx={globalStyles.displayEditorExpandButton}
                  onClick={handleIsDescriptionExpanded}
                >
                  {isExpanded ? 'Thu gọn' : 'Mở rộng'}
                </Button>
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
