import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import TabPanel from '~/components/atoms/TabPanel/index';
import { MentorProfileStatusType } from '~/constants/profile';
import { restrictNumberDisplay } from '~/utils/common';
import { useSearchRegisterRequest } from '~/hooks/user/useSearchRegisterRequest';
import ManageTableRegisterRequest from '~/components/molecules/ManageTableRegisterRequest';
import { PagingFilterPayload } from '~/models';
import { User } from '~/models/user';

interface ManageRegisterRequestSectionProps {
  firstList: PagingFilterPayload<User> | undefined;
  firstListStatus: MentorProfileStatusType;
  firstListRefetch: () => void;
}

export default function ManageRegisterRequestSection({
  firstList,
  firstListStatus,
  firstListRefetch,
}: ManageRegisterRequestSectionProps) {
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue(newValue);

  const { registerRequestList: listSTARTING, refetch: refetchListSTARTING } =
    useSearchRegisterRequest({
      status: MentorProfileStatusType.STARTING,
    });
  const {
    registerRequestList: listEDITREQUEST,
    refetch: refetchListEDITREQUEST,
  } = useSearchRegisterRequest({
    status: MentorProfileStatusType.EDITREQUEST,
  });
  const { registerRequestList: listREJECTED, refetch: refetchListREJECTED } =
    useSearchRegisterRequest({
      status: MentorProfileStatusType.REJECTED,
    });
  const handleRefetchAll = () => {
    firstListRefetch();
    refetchListSTARTING();
    refetchListEDITREQUEST();
    refetchListREJECTED();
  };

  const tabEl = [
    {
      id: 0,
      text: 'Chờ duyệt',
      noOfRequest: restrictNumberDisplay(firstList?.totalItems),
      component: (
        <ManageTableRegisterRequest
          status={firstListStatus}
          refetchGetNoOfRequest={firstListRefetch}
        />
      ),
    },
    {
      id: 1,
      text: 'Đã duyệt',
      noOfRequest: restrictNumberDisplay(listSTARTING?.totalItems),
      component: (
        <ManageTableRegisterRequest
          status={MentorProfileStatusType.STARTING}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
    },
    {
      id: 2,
      text: 'Yêu cầu chỉnh sửa',
      noOfRequest: restrictNumberDisplay(listEDITREQUEST?.totalItems),
      component: (
        <ManageTableRegisterRequest
          status={MentorProfileStatusType.EDITREQUEST}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
    },
    {
      id: 3,
      text: 'Từ chối',
      noOfRequest: restrictNumberDisplay(listREJECTED?.totalItems),
      component: (
        <ManageTableRegisterRequest
          status={MentorProfileStatusType.REJECTED}
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
