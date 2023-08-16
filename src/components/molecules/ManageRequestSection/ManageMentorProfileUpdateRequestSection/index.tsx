import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import TabPanel from '~/components/atoms/TabPanel/index';
import ManageTableMentorProfileUpdateRequest from '~/components/molecules/ManageTableMentorProfileUpdateRequest';
import { MentorProfileUpdateStatusType } from '~/constants/profile';
import { useSearchMentorProfileUpdateRequest } from '~/hooks/user/useSearchMentorProfileUpdateRequest';
import { restrictNumberDisplay } from '~/utils/common';

export default function ManageTableMentorProfileUpdateRequestSection() {
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue(newValue);

  const {
    mentorProfileUpdateRequestList: listPENDING,
    refetch: refetchListPENDING,
  } = useSearchMentorProfileUpdateRequest({
    status: MentorProfileUpdateStatusType.PENDING,
  });
  const {
    mentorProfileUpdateRequestList: listEditAPPROVED,
    refetch: refetchListEditAPPROVED,
  } = useSearchMentorProfileUpdateRequest({
    status: MentorProfileUpdateStatusType.APPROVED,
  });
  const {
    mentorProfileUpdateRequestList: listREJECTED,
    refetch: refetchListREJECTED,
  } = useSearchMentorProfileUpdateRequest({
    status: MentorProfileUpdateStatusType.REJECTED,
  });

  const tabEl = [
    {
      id: 0,
      text: 'Chờ duyệt',
      component: (
        <ManageTableMentorProfileUpdateRequest
          status={MentorProfileUpdateStatusType.PENDING}
          refetchGetNoOfRequest={refetchListPENDING}
        />
      ),
      noOfRequest: restrictNumberDisplay(listPENDING?.totalItems),
    },
    {
      id: 1,
      text: 'Đã duyệt',
      component: (
        <ManageTableMentorProfileUpdateRequest
          status={MentorProfileUpdateStatusType.PENDING}
          refetchGetNoOfRequest={refetchListEditAPPROVED}
        />
      ),
      noOfRequest: restrictNumberDisplay(listEditAPPROVED?.totalItems),
    },
    {
      id: 2,
      text: 'Yêu cầu chỉnh sửa',
      component: (
        <ManageTableMentorProfileUpdateRequest
          status={MentorProfileUpdateStatusType.APPROVED}
          refetchGetNoOfRequest={refetchListREJECTED}
        />
      ),
      noOfRequest: restrictNumberDisplay(listREJECTED?.totalItems),
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
