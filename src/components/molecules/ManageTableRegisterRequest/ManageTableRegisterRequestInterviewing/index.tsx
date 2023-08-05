import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { MentorProfileStatusType } from '~/constants/profile';
import { restrictNumberDisplay } from '~/utils/common';
import { useSearchRegisterRequest } from '~/hooks/user/useSearchRegisterRequest';
import ManageTableRegisterRequest from '~/components/molecules/ManageTableRegisterRequest';
import TabPanel from '~/components/atoms/TabPanel/index';

export default function ManageTableRegisterRequestInterviewing() {
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue(newValue);

  const {
    registerRequest: listNotPassInterview,
    refetch: refetchListNotPassInterview,
  } = useSearchRegisterRequest({
    status: MentorProfileStatusType.STARTING,
    interviewed: false,
  });
  const {
    registerRequest: listPassInterview,
    refetch: refetchListPassInterview,
  } = useSearchRegisterRequest({
    status: MentorProfileStatusType.WAITING,
    interviewed: true,
  });

  const tabEl = [
    {
      id: 0,
      text: 'Chưa qua phòng vấn',
      component: (
        <ManageTableRegisterRequest
          status={MentorProfileStatusType.STARTING}
          interviewed={false}
          refetchGetNoOfRequest={refetchListNotPassInterview}
        />
      ),
      noOfRequest: restrictNumberDisplay(listNotPassInterview?.totalItems),
    },
    {
      id: 1,
      text: 'Đã qua phỏng vấn',
      component: (
        <ManageTableRegisterRequest
          status={MentorProfileStatusType.STARTING}
          interviewed
          refetchGetNoOfRequest={refetchListPassInterview}
        />
      ),
      noOfRequest: restrictNumberDisplay(listPassInterview?.totalItems),
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
