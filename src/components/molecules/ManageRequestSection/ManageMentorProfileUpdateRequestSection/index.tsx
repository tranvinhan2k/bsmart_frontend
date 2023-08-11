import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import TabPanel from '~/components/atoms/TabPanel/index';
import ManageTableMentorProfileUpdateRequest from '~/components/molecules/ManageTableMentorProfileUpdateRequest';
import { MentorProfileStatusType } from '~/constants/profile';
import { useSearchMentorProfileUpdateRequest } from '~/hooks/user/useSearchMentorProfileUpdateRequest';
import { restrictNumberDisplay } from '~/utils/common';

export default function ManageTableMentorProfileUpdateRequestSection() {
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
        <ManageTableMentorProfileUpdateRequest
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
        <ManageTableMentorProfileUpdateRequest
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
        <ManageTableMentorProfileUpdateRequest
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
        <ManageTableMentorProfileUpdateRequest
          status={MentorProfileStatusType.REJECTED}
          refetchGetNoOfRequest={refetchListRejected}
        />
      ),
      noOfRequest: restrictNumberDisplay(66),
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
