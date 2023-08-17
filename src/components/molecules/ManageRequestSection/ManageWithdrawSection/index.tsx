import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import TabPanel from '~/components/atoms/TabPanel/index';
import ManageTableWithdrawRequest from '~/components/molecules/ManageTableWithdrawRequest';
import ManageTableWithdrawWaitingRequest from '~/components/molecules/ManageTableWithdrawWaitingRequest';
import { useSearchManagedWithdrawRequest } from '~/hooks/transaction/useSearchTransaction';
import { WithdrawRequestStatusType } from '~/constants/transaction';
import { restrictNumberDisplay } from '~/utils/common';

export default function ManageWithdrawSection() {
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue(newValue);

  const {
    managedWithdrawRequestList: listSUCCESS,
    refetch: refetchListSUCCESS,
  } = useSearchManagedWithdrawRequest({
    status: WithdrawRequestStatusType.SUCCESS,
  });
  const { managedWithdrawRequestList: listFAIL, refetch: refetchListFAIL } =
    useSearchManagedWithdrawRequest({
      status: WithdrawRequestStatusType.FAIL,
    });
  const {
    managedWithdrawRequestList: listWAITING,
    refetch: refetchListWAITING,
  } = useSearchManagedWithdrawRequest({
    status: WithdrawRequestStatusType.WAITING,
  });

  const handleRefetchAll = () => {
    refetchListSUCCESS();
    refetchListFAIL();
    refetchListWAITING();
  };

  const tabEl = [
    {
      id: 0,
      text: 'Chờ duyệt',
      component: (
        <ManageTableWithdrawRequest
          status={WithdrawRequestStatusType.WAITING}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
      noOfRequest: restrictNumberDisplay(listWAITING?.totalItems),
    },
    {
      id: 1,
      text: 'Xử lý thành công',
      component: (
        <ManageTableWithdrawRequest
          status={WithdrawRequestStatusType.SUCCESS}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
      noOfRequest: restrictNumberDisplay(listSUCCESS?.totalItems),
    },
    {
      id: 2,
      text: 'Xử lý thất bại',
      component: (
        <ManageTableWithdrawRequest
          status={WithdrawRequestStatusType.FAIL}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
      noOfRequest: restrictNumberDisplay(listFAIL?.totalItems),
    },
    {
      id: 3,
      text: 'Tạm',
      component: <ManageTableWithdrawWaitingRequest />,
      noOfRequest: 0,
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
                {tab.noOfRequest !== undefined ? (
                  <Chip label={tab.noOfRequest} size="small" />
                ) : undefined}
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
