import { Box, Button, Stack, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProcessUpdateMentorProfileRequestFormDefault } from '~/models/form';
import { useYupValidationResolver } from '~/hooks';
import {
  useMutationProcessUpdateMentorProfileRequest,
  UseMutationProcessUpdateMentorProfileRequestPayload,
} from '~/hooks/user/useMutationProcessUpdateMentorProfileRequest';
import { validationSchemaProcessUpdateMentorProfileRequest } from '~/form/validation';
import TabPanel from '~/components/atoms/TabPanel/index';
import toast from '~/utils/toast';
import { SX_BOX_ITEM_WRAPPER_NO_PADDING } from './style';

interface RequestRegisterProcessProps {
  idMentorProfile: number;
  onClose: () => void;
  refetchSearch: () => void;
  refetchGetNoOfRequest: () => void;
}

export default function RequestUpdateMentorDetailsProcess({
  idMentorProfile,
  onClose,
  refetchSearch,
  refetchGetNoOfRequest,
}: RequestRegisterProcessProps) {
  const { processUpdateMentorProfileRequest } =
    useMutationProcessUpdateMentorProfileRequest();
  const resolverVerifyRegisterRequest = useYupValidationResolver(
    validationSchemaProcessUpdateMentorProfileRequest
  );
  const { control: controlApprove, handleSubmit: handleSubmitApprove } =
    useForm({
      defaultValues: {
        status: true,
      },
      resolver: resolverVerifyRegisterRequest,
    });
  const { control: controlReject, handleSubmit: handleSubmitReject } = useForm({
    defaultValues: {
      status: false,
    },
    resolver: resolverVerifyRegisterRequest,
  });

  const toastMsgLoading = 'Đang xử lý...';
  const toastMsgSuccess = 'Xử lý thành công';
  const toastMsgError = (errorMsg: any): string =>
    `Đã xảy ra lỗi: ${errorMsg.message}`;
  const handleProcessRegisterRequest = async (
    data: ProcessUpdateMentorProfileRequestFormDefault
  ) => {
    // const skillIds = row.mentorSkillRequest.map((skill: any) => skill.skillId);
    // const degreeIds = row.degreeRequest.map((skill: any) => skill.id);

    const params: UseMutationProcessUpdateMentorProfileRequestPayload = {
      id: idMentorProfile,
      status: data.status,
    };
    const id = toast.loadToast(toastMsgLoading);
    try {
      await processUpdateMentorProfileRequest.mutateAsync(params);
      refetchSearch();
      refetchGetNoOfRequest();
      onClose();
      toast.updateSuccessToast(id, toastMsgSuccess);
    } catch (e: any) {
      toast.updateFailedToast(id, toastMsgError(e.message));
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
        <form onSubmit={handleSubmitApprove(handleProcessRegisterRequest)}>
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
