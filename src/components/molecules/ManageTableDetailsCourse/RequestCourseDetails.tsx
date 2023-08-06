import {
  Button,
  Chip,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import Icon from '~/components/atoms/Icon';
import { mockLevelData } from '~/constants';
import { useGetCourseCreateRequestDetails } from '~/hooks/course/useGetCourseCreateRequestDetails';
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
  const { courseCreateRequestDetails, isLoading } =
    useGetCourseCreateRequestDetails(idCourse);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleIsDescriptionExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const title0 = [
    {
      id: 0,
      label: 'Mã khóa học',
      value: courseCreateRequestDetails ? courseCreateRequestDetails.code : '',
      isAlign: true,
    },
    {
      id: 1,
      label: 'Tên khóa học',
      value: courseCreateRequestDetails ? courseCreateRequestDetails.name : '',
      isAlign: false,
    },
    {
      id: 2,
      label: 'Category',
      value: courseCreateRequestDetails
        ? courseCreateRequestDetails.categoryResponse.name
        : '',
      isAlign: true,
    },
    {
      id: 3,
      label: 'Subject',
      value: courseCreateRequestDetails
        ? courseCreateRequestDetails.subjectResponse.name
        : '',
      isAlign: true,
    },
    {
      id: 4,
      label: 'Trình độ',
      value: courseCreateRequestDetails
        ? mockLevelData.find(
            (item) => item.value === courseCreateRequestDetails.level
          )?.label
        : '',
      isAlign: true,
    },
  ];

  const courseDesc = courseCreateRequestDetails
    ? courseCreateRequestDetails.description
    : '';

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
          <Typography sx={SX_FORM_LABEL}>Thông tin cơ bản</Typography>
        </Grid>
        <Grid item container xs={12} lg={6} spacing={2}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={1}
            >
              <Typography sx={SX_FORM_ITEM_LABEL}>Mã khóa học:</Typography>
              {isLoading ? (
                <Skeleton sx={{ width: '50%' }} />
              ) : (
                <Typography sx={SX_FORM_ITEM_VALUE}>
                  {title0[0].value}
                </Typography>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={1}
            >
              <Typography sx={SX_FORM_ITEM_LABEL}>Tên khóa học:</Typography>
              {isLoading ? (
                <Skeleton sx={{ width: '50%' }} />
              ) : (
                <Typography sx={SX_FORM_ITEM_VALUE}>
                  {title0[1].value}
                </Typography>
              )}
            </Stack>
          </Grid>
        </Grid>
        <Grid item container xs={12} lg={6} spacing={2}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}
            >
              <Typography sx={SX_FORM_ITEM_LABEL}>Kĩ năng:</Typography>
              {isLoading ? (
                <Skeleton sx={{ width: '50%' }} />
              ) : (
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing={1}
                >
                  <Chip
                    color="default"
                    size="small"
                    label={`${title0[2].value}`}
                    title={`${title0[2].value}`}
                  />
                  <Chip
                    color="default"
                    size="small"
                    label={`${title0[3].value}`}
                    title={`${title0[3].value}`}
                  />
                </Stack>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={1}
            >
              <Typography sx={SX_FORM_ITEM_LABEL}>Trình độ:</Typography>
              {isLoading ? (
                <Skeleton sx={{ width: '50%' }} />
              ) : (
                <Typography sx={SX_FORM_ITEM_VALUE}>
                  {title0[4].value}
                </Typography>
              )}
            </Stack>
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
            {isLoading && <Skeleton sx={{ width: '100%' }} />}
            {!isLoading && courseDesc.length > 200 ? (
              <>
                <Typography
                  sx={
                    isExpanded
                      ? globalStyles.displayEditorTextShowMore
                      : globalStyles.displayEditorTextShowLess
                  }
                  dangerouslySetInnerHTML={{
                    __html: `${
                      isExpanded ? courseDesc : `${courseDesc.slice(0, 200)}...`
                    }`,
                  }}
                />
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
            ) : (
              <Typography
                sx={globalStyles.displayEditorTextShowMore}
                dangerouslySetInnerHTML={{
                  __html: `${courseDesc}`,
                }}
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
