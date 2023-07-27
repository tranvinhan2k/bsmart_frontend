import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { ClassStatusType } from '~/constants/class';
import { restrictNumberDisplay, scrollToTop } from '~/utils/common';
import { useSearchManagedClass } from '~/hooks/class/UseSearchManagedClass';
import ManageTableClass from '~/components/molecules/ManageTableClass';
import TabPanel from '~/components/atoms/TabPanel/index';

export default function ManagerManageClassPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue(newValue);

  const { managedClassList: classListNotStart, refetch: refetchListNotStart } =
    useSearchManagedClass({
      status: ClassStatusType.NOTSTART,
    });
  const { managedClassList: classListStarting, refetch: refetchListStarting } =
    useSearchManagedClass({
      status: ClassStatusType.STARTING,
    });
  const {
    managedClassList: classListEditRequest,
    refetch: refetchListEditRequest,
  } = useSearchManagedClass({
    status: ClassStatusType.EDITREQUEST,
  });
  const { managedClassList: classListRejected, refetch: refetchListRejected } =
    useSearchManagedClass({
      status: ClassStatusType.REJECTED,
    });

  const tabEl = [
    {
      id: 0,
      text: 'Chưa bắt đầu',
      component: (
        <ManageTableClass
          status={ClassStatusType.NOTSTART}
          refetchGetNoOfRequest={refetchListNotStart}
        />
      ),
      noOfRequest: restrictNumberDisplay(classListNotStart?.items.length),
    },
    {
      id: 1,
      text: 'Đang dạy',
      component: (
        <ManageTableClass
          status={ClassStatusType.STARTING}
          refetchGetNoOfRequest={refetchListStarting}
        />
      ),
      noOfRequest: restrictNumberDisplay(classListStarting?.items.length),
    },
    {
      id: 2,
      text: 'Đã kết thúc',
      component: (
        <ManageTableClass
          status={ClassStatusType.EDITREQUEST}
          refetchGetNoOfRequest={refetchListEditRequest}
        />
      ),
      noOfRequest: restrictNumberDisplay(classListEditRequest?.items.length),
    },
    {
      id: 3,
      text: 'Bị hủy',
      component: (
        <ManageTableClass
          status={ClassStatusType.REJECTED}
          refetchGetNoOfRequest={refetchListRejected}
        />
      ),
      noOfRequest: restrictNumberDisplay(classListRejected?.items.length),
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
          Danh sách lớp học
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
