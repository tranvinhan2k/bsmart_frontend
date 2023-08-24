import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import TabPanel from '~/components/atoms/TabPanel/index';
import ManageTableMentorProfileUpdateRequest from '~/components/molecules/ManageTableMentorProfileUpdateRequest';
import { MentorProfileUpdateStatusType } from '~/constants/profile';
import {
  useSearchMentorProfileUpdateRequest,
  UseSearchMentorProfileUpdateRequestPayload,
} from '~/hooks/user/useSearchMentorProfileUpdateRequest';
import { PagingFilterPayload } from '~/models';
import { restrictNumberDisplay } from '~/utils/common';

interface ManageTableMentorProfileUpdateRequestSectionProps {
  firstList:
    | PagingFilterPayload<UseSearchMentorProfileUpdateRequestPayload>
    | undefined;
  firstListStatus: MentorProfileUpdateStatusType;
  firstListRefetch: () => void;
}

export default function ManageTableMentorProfileUpdateRequestSection({
  firstList,
  firstListStatus,
  firstListRefetch,
}: ManageTableMentorProfileUpdateRequestSectionProps) {
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue(newValue);

  const {
    mentorProfileUpdateRequestList: listAPPROVED,
    refetch: refetchListAPPROVED,
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
          status={firstListStatus}
          refetchGetNoOfRequest={firstListRefetch}
        />
      ),
      noOfRequest: restrictNumberDisplay(firstList?.totalItems),
    },
    {
      id: 1,
      text: 'Đã duyệt',
      component: (
        <ManageTableMentorProfileUpdateRequest
          status={MentorProfileUpdateStatusType.PENDING}
          refetchGetNoOfRequest={refetchListAPPROVED}
        />
      ),
      noOfRequest: restrictNumberDisplay(listAPPROVED?.totalItems),
    },
    {
      id: 2,
      text: 'Từ chối',
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
