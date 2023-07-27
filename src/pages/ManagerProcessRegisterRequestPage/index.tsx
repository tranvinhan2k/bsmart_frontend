import { Box, Chip, Tab, Tabs, Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { restrictNumberDisplay, scrollToTop } from '~/utils/common';
import { useSearchRegisterRequest } from '~/hooks/user/useSearchRegisterRequest';
import ManageRegisterRequest from '~/components/molecules/ManageRegisterRequest';
import TabPanel from '~/components/atoms/TabPanel/index';
import { MentorProfileStatusType } from '~/constants/profile';

export default function ManagerProcessRegisterRequestPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (_: any, newValue: number) => setTabValue(newValue);

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
        <ManageRegisterRequest
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
        <ManageRegisterRequest
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
        <ManageRegisterRequest
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
        <ManageRegisterRequest
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
          Yêu cầu tạo tài khoản giáo viên
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
