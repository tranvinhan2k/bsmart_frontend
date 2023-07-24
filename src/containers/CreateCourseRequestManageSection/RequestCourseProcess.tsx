import { Box, Button, Stack, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProcessCreateCourseRequestFormDefault } from '~/models/form';
import { ProcessCreateCourseRequestPayload } from '~/api/courses';
import { useGetCourseCreateRequestDetails } from '~/hooks/course/useGetCourseCreateRequestDetails';
import { useMutationProcessCourseCreateRequest } from '~/hooks/course/useMutationProcessCourseCreateRequest';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaApproveCreateCourseRequest } from '~/form/validation';
import FormInput from '~/components/atoms/FormInput';
import TabPanel from '~/components/atoms/TabPanel/index';
import toast from '~/utils/toast';
import { SX_BOX_ITEM_WRAPPER_NO_PADDING } from './style';

interface RequestCourseProcessProps {
  idCourse: number;
  onClose: () => void;
}

export default function RequestCourseProcess({
  idCourse,
  onClose,
}: RequestCourseProcessProps) {
  const { courseCreateRequestDetails } =
    useGetCourseCreateRequestDetails(idCourse);

  const resolverApproveCreateCourseRequest = useYupValidationResolver(
    validationSchemaApproveCreateCourseRequest
  );
  const { processCourseCreateRequestMutation } =
    useMutationProcessCourseCreateRequest();

  const toastMsgLoading = 'Đang xử lý...';
  const toastMsgSuccess = 'Xử lý thành công';
  const toastMsgError = (errorMsg: any): string =>
    `Đã xảy ra lỗi: ${errorMsg.message}`;
  const handleApproveCourseCreateRequest = async (
    data: ProcessCreateCourseRequestFormDefault
  ) => {
    // const classIds = courseCreateRequestDetails?.classes
    //   ? courseCreateRequestDetails?.classes.map((item) => item.id)
    //   : [];

    let classIds: number[] = [];
    if (courseCreateRequestDetails) {
      classIds = courseCreateRequestDetails.classes
        ? courseCreateRequestDetails.classes.map((item) => item.id)
        : [];
    }

    const params: ProcessCreateCourseRequestPayload = {
      id: idCourse,
      classIds,
      status: data.status,
      message: data.message,
    };
    const id = toast.loadToast(toastMsgLoading);
    try {
      await processCourseCreateRequestMutation.mutateAsync(params);
      toast.updateSuccessToast(id, toastMsgSuccess);
      onClose();
    } catch (e: any) {
      toast.updateFailedToast(id, toastMsgError(e.message));
    }
  };

  const { control: controlApprove, handleSubmit: handleSubmitApprove } =
    useForm({
      defaultValues: {
        id: idCourse,
        status: 'NOTSTART',
        message: '',
      },
      resolver: resolverApproveCreateCourseRequest,
    });
  const { control: controlReject, handleSubmit: handleSubmitReject } = useForm({
    defaultValues: {
      id: idCourse,
      status: 'REJECTED',
      message: '',
    },
    resolver: resolverApproveCreateCourseRequest,
  });
  const { control: controlEditRequest, handleSubmit: handleSubmitEditRequest } =
    useForm({
      defaultValues: {
        id: idCourse,
        status: 'EDITREQUEST',
        message: '',
      },
      resolver: resolverApproveCreateCourseRequest,
    });

  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (_: any, newValue: number) => setTabValue(newValue);

  const tabEl = [
    {
      id: 0,
      text: 'Phê duyệt',
      component: (
        <form onSubmit={handleSubmitApprove(handleApproveCourseCreateRequest)}>
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
        <form onSubmit={handleSubmitReject(handleApproveCourseCreateRequest)}>
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
        <form
          onSubmit={handleSubmitEditRequest(handleApproveCourseCreateRequest)}
        >
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
  );
}
