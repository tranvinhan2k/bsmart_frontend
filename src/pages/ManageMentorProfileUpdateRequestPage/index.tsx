import { Box, Chip, Tab, Tabs, Typography, Stack } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { MentorProfileStatusType } from '~/constants/profile';
import { restrictNumberDisplay, scrollToTop } from '~/utils/common';
import { useSearchRegisterRequest } from '~/hooks/user/useSearchRegisterRequest';
import ManageTableRegisterRequest from '~/components/molecules/ManageTableRegisterRequest';
import TabPanel from '~/components/atoms/TabPanel/index';
import { useSearchMentorProfileUpdateRequest } from '~/hooks/user/useSearchMentorProfileUpdateRequest';
import ManageMentorProfileUpdateRequest from '~/components/molecules/ManageMentorProfileUpdateRequest';

export default function ManageMentorProfileUpdateRequestPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue(newValue);

  const {
    mentorProfileUpdateRequestList: listWaiting,
    refetch: refetchListWaiting,
  } = useSearchMentorProfileUpdateRequest({
    status: MentorProfileStatusType.WAITING,
  });
  const {
    mentorProfileUpdateRequestList: listStarting,
    refetch: refetchListStarting,
  } = useSearchMentorProfileUpdateRequest({
    status: MentorProfileStatusType.STARTING,
  });
  const {
    mentorProfileUpdateRequestList: listEditRequest,
    refetch: refetchListEditRequest,
  } = useSearchMentorProfileUpdateRequest({
    status: MentorProfileStatusType.EDITREQUEST,
  });
  const {
    mentorProfileUpdateRequestList: listRejected,
    refetch: refetchListRejected,
  } = useSearchMentorProfileUpdateRequest({
    status: MentorProfileStatusType.REJECTED,
  });

  const tabEl = [
    {
      id: 0,
      text: 'Chờ duyệt',
      component: (
        <ManageMentorProfileUpdateRequest
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
        <ManageMentorProfileUpdateRequest
          status={MentorProfileStatusType.STARTING}
          refetchGetNoOfRequest={refetchListStarting}
        />
      ),
      noOfRequest: restrictNumberDisplay(13),
    },
    {
      id: 2,
      text: 'Yêu cầu chỉnh sửa',
      component: (
        <ManageMentorProfileUpdateRequest
          status={MentorProfileStatusType.EDITREQUEST}
          refetchGetNoOfRequest={refetchListEditRequest}
        />
      ),
      noOfRequest: restrictNumberDisplay(55),
    },
    {
      id: 3,
      text: 'Từ chối',
      component: (
        <ManageMentorProfileUpdateRequest
          status={MentorProfileStatusType.REJECTED}
          refetchGetNoOfRequest={refetchListRejected}
        />
      ),
      noOfRequest: restrictNumberDisplay(66),
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
          Yêu cầu mở thêm môn dạy của giảng viên
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
