import { Box, Button, Grid, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaApproveCreateCourseRequest } from '~/form/validation';
import RequestBasicInfo from './RequestBasicInfo';
import RequestCourseDetails from './RequestCourseDetails';

import RequestDate from './RequestDate';
import RequestCourseTimetable from './RequestCourseTimetable';

interface ReadOneCreateCourseRequestProps {
  onSubmit: () => void;
  row: any;
}

export default function ReadOneCreateCourseRequest({
  onSubmit,
  row,
}: ReadOneCreateCourseRequestProps) {
  const resolverApproveCreateCourseRequest = useYupValidationResolver(
    validationSchemaApproveCreateCourseRequest
  );
  const verifyApproveCreateCourseRequestForm = useForm({
    defaultValues: {
      id: row.id,
    },
    resolver: resolverApproveCreateCourseRequest,
  });

  return (
    <Box p={2}>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={5}
      >
        <Grid item sm={12} md={5} lg={4}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <RequestBasicInfo row={row} />
            <RequestDate row={row} />
          </Stack>
        </Grid>
        <Grid item sm={12} md={7} lg={8}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <RequestCourseDetails row={row} />
            <RequestCourseTimetable row={row} />
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-start"
              spacing={2}
              mt={4}
            >
              <form
                onSubmit={verifyApproveCreateCourseRequestForm.handleSubmit(
                  onSubmit
                )}
              >
                <Button
                  variant="outlined"
                  type="submit"
                  size="medium"
                  color="success"
                >
                  Phê duyệt
                </Button>
              </form>
              <Button variant="outlined" size="medium" color="error">
                Từ chối
              </Button>
              <Button variant="outlined" size="medium" color="warning">
                Yêu cầu chỉnh sửa
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
