import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import TabPanel from '~/components/atoms/TabPanel/index';
import { MentorProfileStatusType } from '~/constants/profile';
import { restrictNumberDisplay } from '~/utils/common';
import { useSearchRegisterRequest } from '~/hooks/user/useSearchRegisterRequest';
import ManageTableRegisterRequest from '~/components/molecules/ManageTableRegisterRequest';

export default function ManageRegisterRequestSection() {
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue(newValue);

  const {
    registerRequest: listWaitingApprove,
    refetch: refetchListWaitingApprove,
  } = useSearchRegisterRequest({
    status: MentorProfileStatusType.WAITING,
    interviewed: false,
  });
  const {
    registerRequest: listWaitingInterview,
    refetch: refetchListInterview,
  } = useSearchRegisterRequest({
    status: MentorProfileStatusType.STARTING,
    interviewed: false,
  });
  const { registerRequest: listStarting, refetch: refetchListStarting } =
    useSearchRegisterRequest({
      status: MentorProfileStatusType.STARTING,
      interviewed: true,
    });
  const { registerRequest: listEditRequest, refetch: refetchListEditRequest } =
    useSearchRegisterRequest({
      status: MentorProfileStatusType.EDITREQUEST,
      interviewed: true,
    });
  const { registerRequest: listRejected, refetch: refetchListRejected } =
    useSearchRegisterRequest({
      status: MentorProfileStatusType.REJECTED,
      interviewed: true,
    });
  const handleRefetchAll = () => {
    refetchListWaitingApprove();
    refetchListInterview();
    refetchListStarting();
    refetchListEditRequest();
    refetchListRejected();
  };

  const tabEl = [
    {
      id: 0,
      text: 'Chờ duyệt hồ sơ',
      noOfRequest: restrictNumberDisplay(listWaitingApprove?.totalItems),
      component: (
        <ManageTableRegisterRequest
          status={MentorProfileStatusType.WAITING}
          interviewed={false}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
    },
    {
      id: 1,
      text: 'Chờ phỏng vấn',
      noOfRequest: restrictNumberDisplay(listWaitingInterview?.totalItems),
      component: (
        <ManageTableRegisterRequest
          status={MentorProfileStatusType.STARTING}
          interviewed={false}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
    },
    {
      id: 2,
      text: 'Đã duyệt',
      noOfRequest: restrictNumberDisplay(listStarting?.totalItems),
      component: (
        <ManageTableRegisterRequest
          status={MentorProfileStatusType.STARTING}
          interviewed
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
    },
    {
      id: 3,
      text: 'Yêu cầu chỉnh sửa',
      noOfRequest: restrictNumberDisplay(listEditRequest?.totalItems),
      component: (
        <ManageTableRegisterRequest
          status={MentorProfileStatusType.EDITREQUEST}
          interviewed
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
    },
    {
      id: 4,
      text: 'Từ chối',
      noOfRequest: restrictNumberDisplay(listRejected?.totalItems),
      component: (
        <ManageTableRegisterRequest
          status={MentorProfileStatusType.REJECTED}
          interviewed
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
    },
  ];

  return (
    <>
      <Tabs
        variant="scrollable"
        value={tabValue}
        onChange={handleSetTabValue}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        {tabEl.map((tab) => (
          <Tab
            label={
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Typography sx={{ fontSize: 14 }}>{tab.text}</Typography>
                <Chip
                  label={tab.noOfRequest}
                  size="small"
                  color={
                    tab.id === 0 && tab.noOfRequest > 0 ? 'error' : 'default'
                  }
                />
              </Stack>
            }
            value={tab.id}
            key={tab.id}
          />
        ))}
      </Tabs>
      {tabEl.map((tab) => (
        <TabPanel value={tabValue} index={tab.id} key={tab.id}>
          <Box py={2}>{tab.component}</Box>
        </TabPanel>
      ))}
    </>
  );
}
