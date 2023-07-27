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
import { handleDefinedTextReturnComp } from '~/utils/commonComp';
import { mockLevelData } from '~/constants';
import { useGetCourseCreateRequestDetails } from '~/hooks/course/useGetCourseCreateRequestDetails';
import Icon from '~/components/atoms/Icon';
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
          isAlign: true,
        },
        {
          id: 1,
          label: 'Tên khóa học',
          value: handleDefinedTextReturnComp(courseCreateRequestDetails.name),
          isAlign: false,
        },
        {
          id: 2,
          label: 'Category',
          value: handleDefinedTextReturnComp(
            courseCreateRequestDetails.categoryResponse.name
          ),
          isAlign: true,
        },
        {
          id: 3,
          label: 'Subject',
          value: handleDefinedTextReturnComp(
            courseCreateRequestDetails.subjectResponse.name
          ),
          isAlign: true,
        },
        {
          id: 4,
          label: 'Trình độ',
          value: handleDefinedTextReturnComp(courseCreateRequestDetails.level),
          isAlign: true,
        },
      ]
    : [
        {
          id: 0,
          label: 'Mã khóa học',
          value: '',
          isAlign: true,
        },
        {
          id: 1,
          label: 'Tên khóa học',
          value: '',
          isAlign: false,
        },
        {
          id: 2,
          label: 'Category',
          value: '',
          isAlign: true,
        },
        {
          id: 3,
          label: 'Kĩ năng',
          value: '',
          isAlign: true,
        },
        {
          id: 4,
          label: 'Subject',
          value: '',
          isAlign: true,
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
          value: mockLevelData.find(
            (item) => item.value === courseCreateRequestDetails.level
          )?.label,
        },
      ]
    : [
        {
          id: 0,
          label: 'Trình độ',
          value: '',
        },
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
              spacing={1}
            >
              <Typography sx={SX_FORM_ITEM_LABEL}>Tên khóa học:</Typography>
              <Typography sx={SX_FORM_ITEM_VALUE}>
                {isLoading ? <Skeleton /> : title0[1].value}
              </Typography>
            </Stack>
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
