import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import TabPanel from '~/components/atoms/TabPanel/index';
import ManageTableWithdrawProcessedRequest from '~/components/molecules/ManageTableWithdrawProcessedRequest';
import ManageTableWithdrawWaitingRequest from '~/components/molecules/ManageTableWithdrawWaitingRequest';

export default function ManageWithdrawSection() {
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue(newValue);

  const tabEl = [
    {
      id: 0,
      text: 'Đã xử lý',
      component: <ManageTableWithdrawProcessedRequest />,
      noOfRequest: undefined,
    },
    {
      id: 1,
      text: 'Chờ xử lý',
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
