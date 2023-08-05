import { Box, Chip, Tab, Tabs, Typography, Stack } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { MentorProfileStatusType } from '~/constants/profile';
import { restrictNumberDisplay } from '~/utils/common';
import { useSearchRegisterRequest } from '~/hooks/user/useSearchRegisterRequest';
import ManageTableRegisterRequestFilter from './ManageTableRegisterRequestFilter';
import TabPanel from '~/components/atoms/TabPanel/index';

export default function ManageRegisterRequestSection() {
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue(newValue);

  const { refetch: refetchListWaiting } = useSearchRegisterRequest({
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
        <ManageTableRegisterRequestFilter
          status={MentorProfileStatusType.WAITING}
          refetchGetNoOfRequest={refetchListWaiting}
        />
      ),
    },
    {
      id: 1,
      text: 'Đã duyệt',
      component: (
        <ManageTableRegisterRequestFilter
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
        <ManageTableRegisterRequestFilter
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
        <ManageTableRegisterRequestFilter
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
