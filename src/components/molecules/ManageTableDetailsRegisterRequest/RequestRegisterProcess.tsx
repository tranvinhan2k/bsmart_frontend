import { Box, Button, Stack, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProcessRegisterRequestFormDefault } from '~/models/form';
import {
  useMutationProcessRegisterRequest,
  UseMutationProcessRegisterRequestPayload,
} from '~/hooks/user/useMutationProcessRegisterRequest';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaProcessRegisterRequest } from '~/form/validation';
import FormInput from '~/components/atoms/FormInput';
import TabPanel from '~/components/atoms/TabPanel/index';
import toast from '~/utils/toast';
import { SX_BOX_ITEM_WRAPPER_NO_PADDING } from './style';
import { defaultValueApproveRegisterRequest } from '~/form/defaultValues';

interface RequestRegisterProcessProps {
  idMentorProfile: number;
  onClose: () => void;
  refetchSearch: () => void;
  refetchGetNoOfRequest: () => void;
}

export default function RequestRegisterProcess({
  idMentorProfile,
  onClose,
  refetchSearch,
  refetchGetNoOfRequest,
}: RequestRegisterProcessProps) {
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue(newValue);

  const { processCourseCreateRequestMutation } =
    useMutationProcessRegisterRequest();

  const resolverProcessRegisterRequest = useYupValidationResolver(
    validationSchemaProcessRegisterRequest
  );
  const { control: controlApprove, handleSubmit: handleSubmitApprove } =
    useForm({
      defaultValues: defaultValueApproveRegisterRequest,
      resolver: resolverProcessRegisterRequest,
    });
  const { control: controlReject, handleSubmit: handleSubmitReject } = useForm({
    defaultValues: {
      status: 'REJECTED',
      message: '',
    },
    resolver: resolverProcessRegisterRequest,
  });
  const { control: controlEditRequest, handleSubmit: handleSubmitEditRequest } =
    useForm({
      defaultValues: {
        status: 'EDITREQUEST',
        message: '',
      },
      resolver: resolverProcessRegisterRequest,
    });

  const toastMsgLoading = 'Đang xử lý...';
  const toastMsgSuccess = 'Xử lý thành công';
  const toastMsgError = (errorMsg: any): string =>
    `Đã xảy ra lỗi: ${errorMsg.message}`;
  const handleProcessRegisterRequest = async (
    data: ProcessRegisterRequestFormDefault
  ) => {
    let submitStatus;
    const interviewed = true;
    switch (tabValue) {
      case 0:
        submitStatus = 'STARTING';
        break;
      case 1:
        submitStatus = 'REJECTED';
        break;
      default:
        submitStatus = 'EDITREQUEST';
        break;
    }

    const params: UseMutationProcessRegisterRequestPayload = {
      id: idMentorProfile,
      status: submitStatus,
      message: data.message,
      interviewed,
    };
    const id = toast.loadToast(toastMsgLoading);
    try {
      await processCourseCreateRequestMutation.mutateAsync(params);
      refetchSearch();
      refetchGetNoOfRequest();
      onClose();
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (e: any) {
      toast.updateFailedToast(id, toastMsgError(e.message));
    }
  };

  const tabEl = [
    {
      id: 0,
      text: 'Phê duyệt',
      component: (
        <form onSubmit={handleSubmitApprove(handleProcessRegisterRequest)}>
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
              color="success"
              fullWidth
              size="medium"
              type="submit"
              variant="outlined"
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
        <form onSubmit={handleSubmitReject(handleProcessRegisterRequest)}>
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
              color="error"
              fullWidth
              size="medium"
              type="submit"
              variant="outlined"
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
        <form onSubmit={handleSubmitEditRequest(handleProcessRegisterRequest)}>
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
              color="warning"
              fullWidth
              size="medium"
              type="submit"
              variant="outlined"
            >
              Yêu cầu chỉnh sửa
            </Button>
          </Stack>
        </form>
      ),
    },
  ];

  return (
    <Box sx={SX_BOX_ITEM_WRAPPER_NO_PADDING}>
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
  );
}
