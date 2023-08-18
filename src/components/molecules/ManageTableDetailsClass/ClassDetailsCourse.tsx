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
import { MSG_BE_MISSING_FIELD } from '~/form/message';
import { useGetManagedClassDetails } from '~/hooks/class/useGetManagedClassDetails';
import Icon from '~/components/atoms/Icon';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_ITEM_LABEL,
  SX_FORM_ITEM_VALUE,
  SX_FORM_LABEL,
} from './style';
import globalStyles from '~/styles';

interface ClassDetailsCourseProps {
  idClass: number;
}
export default function ClassDetailsCourse({
  idClass,
}: ClassDetailsCourseProps) {
  const { classDetails, isLoading } = useGetManagedClassDetails(idClass);

  const courseCode = classDetails ? classDetails.course.code : '';
  const courseName = classDetails ? classDetails.course.name : '';
  const courseLevel = MSG_BE_MISSING_FIELD;
  const courseCategory = MSG_BE_MISSING_FIELD;
  const courseSubject = classDetails ? classDetails.course.subject.name : '';
  const courseDesc = MSG_BE_MISSING_FIELD;

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleIsDescriptionExpanded = () => {
    setIsExpanded(!isExpanded);
  };

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
          <Typography sx={SX_FORM_LABEL}>Thông tin khóa học</Typography>
        </Grid>
        <Grid item xs={12} container lg={6} spacing={2}>
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
                <Typography sx={SX_FORM_ITEM_VALUE}>{courseCode}</Typography>
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
                <Typography sx={SX_FORM_ITEM_VALUE}>{courseName}</Typography>
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
                    label={courseCategory}
                    title={courseCategory}
                  />
                  <Chip
                    color="default"
                    size="small"
                    label={courseSubject}
                    title={courseSubject}
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
                <Typography sx={SX_FORM_ITEM_VALUE}>{courseLevel}</Typography>
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
