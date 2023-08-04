import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import TabPanel from '~/components/atoms/TabPanel/index';
import ManageTableRegisterRequest from '~/components/molecules/ManageTableRegisterRequest';
import { MentorProfileStatusType } from '~/constants/profile';
import { useSearchRegisterRequest } from '~/hooks/user/useSearchRegisterRequest';
import { restrictNumberDisplay } from '~/utils/common';

export default function ManageRegisterRequestSection() {
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue(newValue);

  const { registerRequest: listWaiting, refetch: refetchListWaiting } =
    useSearchRegisterRequest({
      status: MentorProfileStatusType.WAITING,
    });
  const { registerRequest: listStarting, refetch: refetchListStarting } =
    useSearchRegisterRequest({
      status: MentorProfileStatusType.STARTING,
    });
  const { registerRequest: listEditRequest, refetch: refetchListEditRequest } =
    useSearchRegisterRequest({
      status: MentorProfileStatusType.EDITREQUEST,
    });
  const { registerRequest: listRejected, refetch: refetchListRejected } =
    useSearchRegisterRequest({
      status: MentorProfileStatusType.REJECTED,
    });

  const tabEl = [
    {
      id: 0,
      text: 'Chờ duyệt',
      component: (
        <ManageTableRegisterRequest
          status={MentorProfileStatusType.WAITING}
          refetchGetNoOfRequest={refetchListWaiting}
        />
      ),
      noOfRequest: restrictNumberDisplay(listWaiting?.totalItems),
    },
    {
      id: 1,
      text: 'Đã duyệt',
      component: (
        <ManageTableRegisterRequest
          status={MentorProfileStatusType.STARTING}
          refetchGetNoOfRequest={refetchListStarting}
        />
      ),
      noOfRequest: restrictNumberDisplay(listStarting?.totalItems),
    },
    {
      id: 2,
      text: 'Yêu cầu chỉnh sửa',
      component: (
        <ManageTableRegisterRequest
          status={MentorProfileStatusType.EDITREQUEST}
          refetchGetNoOfRequest={refetchListEditRequest}
        />
      ),
      noOfRequest: restrictNumberDisplay(listEditRequest?.totalItems),
    },
    {
      id: 3,
      text: 'Từ chối',
      component: (
        <ManageTableRegisterRequest
          status={MentorProfileStatusType.REJECTED}
          refetchGetNoOfRequest={refetchListRejected}
        />
      ),
      noOfRequest: restrictNumberDisplay(listRejected?.totalItems),
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
                <Chip label={tab.noOfRequest} size="small" />
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
