import { Box, Button, Grid, Tab, Tabs, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProcessRegisterRequestFormDefault } from '~/models/form';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaVerifyRegisterRequest } from '~/form/validation';
import FormInput from '~/components/atoms/FormInput';
import RequestBasicInfo from './RequestBasicInfo';
import RequestDate from './RequestDate';
import RequestMentorDegree from './RequestMentorDegree';
import RequestMentorInfo from './RequestMentorInfo';
import RequestCI from './RequestCI';
import TabPanel from '~/components/atoms/TabPanel/index';
import {
  SX_BOX_ITEM_WRAPPER_NO_PADDING,
  SX_REQUEST_TITLE,
  SX_BOX_STICKY,
} from './style';

interface ReadOneRegisterRequestProps {
  onSubmit: (data: ProcessRegisterRequestFormDefault) => Promise<void>;
  row: any;
}

export default function ReadOneRegisterRequest({
  onSubmit,
  row,
}: ReadOneRegisterRequestProps) {
  const resolverVerifyRegisterRequest = useYupValidationResolver(
    validationSchemaVerifyRegisterRequest
  );
  const { control: controlApprove, handleSubmit: handleSubmitApprove } =
    useForm({
      defaultValues: {
        id: row.id,
        status: 'STARTING',
        message: '',
      },
      resolver: resolverVerifyRegisterRequest,
    });
  const { control: controlReject, handleSubmit: handleSubmitReject } = useForm({
    defaultValues: {
      id: row.id,
      status: 'REJECTED',
      message: '',
    },
    resolver: resolverVerifyRegisterRequest,
  });
  const { control: controlEditRequest, handleSubmit: handleSubmitEditRequest } =
    useForm({
      defaultValues: {
        id: row.id,
        status: 'EDITREQUEST',
        message: '',
      },
      resolver: resolverVerifyRegisterRequest,
    });

  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (_: any, newValue: number) => setTabValue(newValue);

  const tabEl = [
    {
      id: 0,
      text: 'Phê duyệt',
      component: (
        <form onSubmit={handleSubmitApprove(onSubmit)}>
          <FormInput
            control={controlApprove}
            name="message"
            variant="multiline"
            multilineRows={6}
            placeholder="Nhập tin nhắn"
          />
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-end"
            spacing={2}
            mt={2}
          >
            <Button
              variant="outlined"
              type="submit"
              size="medium"
              color="success"
            >
              Phê duyệt
            </Button>
          </Stack>
        </form>
      ),
    },
    {
      id: 1,
      text: 'Từ chối',
      component: (
        <form onSubmit={handleSubmitReject(onSubmit)}>
          <FormInput
            control={controlReject}
            name="message"
            variant="multiline"
            multilineRows={6}
            placeholder="Nhập tin nhắn"
          />
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-end"
            spacing={2}
            mt={2}
          >
            <Button
              variant="outlined"
              type="submit"
              size="medium"
              color="error"
            >
              Từ chối
            </Button>
          </Stack>
        </form>
      ),
    },
    {
      id: 2,
      text: 'Yêu cầu chỉnh sửa',
      component: (
        <form onSubmit={handleSubmitEditRequest(onSubmit)}>
          <FormInput
            control={controlEditRequest}
            name="message"
            variant="multiline"
            multilineRows={6}
            placeholder="Nhập tin nhắn"
          />
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-end"
            spacing={2}
            mt={2}
          >
            <Button
              variant="outlined"
              type="submit"
              size="medium"
              color="warning"
            >
              Yêu cầu chỉnh sửa
            </Button>
          </Stack>
        </form>
      ),
    },
  ];

  return (
    <>
      <Box mx={2}>
        <Typography sx={SX_REQUEST_TITLE}>Chi tiết giáo viên</Typography>
      </Box>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="stretch"
        columnSpacing={5}
        rowSpacing={2}
        p={2}
      >
        <Grid item sm={12} md={5} lg={4}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
            sx={SX_BOX_STICKY}
          >
            <RequestBasicInfo row={row} />
            <Box pt={2} sx={SX_BOX_ITEM_WRAPPER_NO_PADDING}>
              <Tabs
                variant="scrollable"
                scrollButtons="auto"
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                {tabEl.map((tab) => (
                  <Tab label={tab.text} key={tab.id} />
                ))}
              </Tabs>
              {tabEl.map((tab) => (
                <TabPanel value={tabValue} index={tab.id} key={tab.id}>
                  <Box p={2}>{tab.component}</Box>
                </TabPanel>
              ))}
            </Box>
          </Stack>
        </Grid>
        <Grid item sm={12} md={7} lg={8}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <RequestDate row={row} />
            <RequestCI row={row} />
            <RequestMentorDegree row={row} />
            <RequestMentorInfo row={row} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
