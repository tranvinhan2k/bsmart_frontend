import { Box, Button, Grid, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaVerifyRegisterRequest } from '~/form/validation';
import RequestBasicInfo from './RequestBasicInfo';
import RequestMentorDegree from './RequestMentorDegree';
import RequestMentorInfo from './RequestMentorInfo';
import RequestDate from './RequestDate';

interface ReadOneRegisterRequestProps {
  onSubmit: () => void;
  row: any;
}

export default function ReadOneRegisterRequest({
  onSubmit,
  row,
}: ReadOneRegisterRequestProps) {
  const resolverVerifyRegisterRequest = useYupValidationResolver(
    validationSchemaVerifyRegisterRequest
  );
  const verifyRegisterRequestForm = useForm({
    defaultValues: {
      id: row.id,
    },
    resolver: resolverVerifyRegisterRequest,
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
            <RequestMentorInfo row={row} />
            <RequestMentorDegree row={row} />
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-start"
              spacing={2}
              mt={4}
            >
              <form onSubmit={verifyRegisterRequestForm.handleSubmit(onSubmit)}>
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
