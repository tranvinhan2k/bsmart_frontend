import { Box, Button, Stack, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CourseStatusType } from '~/constants/course';
import { ProcessCreateCourseRequestFormDefault } from '~/models/form';
import { ProcessCreateCourseRequestPayload } from '~/api/courses';
import { useGetCourseCreateRequestDetails } from '~/hooks/course/useGetCourseCreateRequestDetails';
import { useMutationProcessCourseCreateRequest } from '~/hooks/course/useMutationProcessCourseCreateRequest';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaApproveCreateCourseRequest } from '~/form/validation';
import FormInput from '~/components/atoms/FormInput';
import TabPanel from '~/components/atoms/TabPanel/index';
import toast from '~/utils/toast';
import { toastMsgError } from '~/utils/common';
import { SX_BOX_ITEM_WRAPPER_NO_PADDING } from './style';

interface RequestCourseProcessProps {
  idCourse: number;
  onClose: () => void;
  refetchSearch: () => void;
  refetchGetNoOfRequest: () => void;
  status: CourseStatusType;
}

export default function RequestCourseProcess({
  idCourse,
  onClose,
  refetchSearch,
  refetchGetNoOfRequest,
  status,
}: RequestCourseProcessProps) {
  const { courseCreateRequestDetails } = useGetCourseCreateRequestDetails({
    idCourse,
    status,
  });

  const resolverApproveCreateCourseRequest = useYupValidationResolver(
    validationSchemaApproveCreateCourseRequest
  );
  const { processCourseCreateRequestMutation } =
    useMutationProcessCourseCreateRequest();

  const { control: controlApprove, handleSubmit: handleSubmitApprove } =
    useForm({
      defaultValues: {
        status: 'NOTSTART',
        message: 'Chúc mừng bạn đã tạo khóa học thành công',
      },
      resolver: resolverApproveCreateCourseRequest,
    });
  const { control: controlReject, handleSubmit: handleSubmitReject } = useForm({
    defaultValues: {
      status: 'REJECTED',
      message: 'Thông tin vi phạm bao gồm:',
    },
    resolver: resolverApproveCreateCourseRequest,
  });
  const { control: controlEditRequest, handleSubmit: handleSubmitEditRequest } =
    useForm({
      defaultValues: {
        status: 'EDITREQUEST',
        message: 'Thông tin cần chỉnh sửa bao gồm:',
      },
      resolver: resolverApproveCreateCourseRequest,
    });

  const toastMsgLoading = 'Đang xử lý...';
  const toastMsgSuccess = 'Xử lý thành công';
  const handleProcessCourseCreateRequest = async (
    data: ProcessCreateCourseRequestFormDefault
  ) => {
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
      refetchSearch();
      refetchGetNoOfRequest();
      onClose();
    } catch (error: unknown) {
      toast.updateFailedToast(id, toastMsgError(error));
    }
  };

  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue(newValue);

  const tabEl = [
    {
      id: 0,
      text: 'Phê duyệt',
      component: (
        <form onSubmit={handleSubmitApprove(handleProcessCourseCreateRequest)}>
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
        <form onSubmit={handleSubmitReject(handleProcessCourseCreateRequest)}>
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
          onSubmit={handleSubmitEditRequest(handleProcessCourseCreateRequest)}
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
