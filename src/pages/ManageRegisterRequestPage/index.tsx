import { Box, Chip, Tab, Tabs, Typography, Stack } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { MentorProfileStatusType } from '~/constants/profile';
import { restrictNumberDisplay, scrollToTop } from '~/utils/common';
import { useSearchRegisterRequest } from '~/hooks/user/useSearchRegisterRequest';
import ManageTableRegisterRequest from '~/components/molecules/ManageTableRegisterRequest';
import TabPanel from '~/components/atoms/TabPanel/index';

export default function ManageRegisterRequestPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

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
    <Box p={4}>
      <Box pb={2}>
        <Typography
          sx={{
            fontSize: 26,
            fontWeight: 500,
            lineHeight: 1,
          }}
        >
          Yêu cầu phê duyệt tài khoản giáo viên
        </Typography>
      </Box>
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
    </Box>
  );
}
