import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { ClassStatusType } from '~/constants/class';
import { restrictNumberDisplay, scrollToTop } from '~/utils/common';
import { useSearchManagedClass } from '~/hooks/class/UseSearchManagedClass';
import ManageTableClass from '~/components/molecules/ManageTableClass';
import TabPanel from '~/components/atoms/TabPanel/index';
import globalStyles from '~/styles';

export default function ManageClassPage() {
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
  const handleRefetchAll = () => {
    refetchListNotStart();
    refetchListStarting();
    refetchListEditRequest();
    refetchListRejected();
  };

  const tabEl = [
    {
      id: 0,
      text: 'Chưa bắt đầu',
      component: (
        <ManageTableClass
          status={ClassStatusType.NOTSTART}
          refetchGetNoOfRequest={handleRefetchAll}
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
          refetchGetNoOfRequest={handleRefetchAll}
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
          refetchGetNoOfRequest={handleRefetchAll}
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
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
      noOfRequest: restrictNumberDisplay(classListRejected?.items.length),
    },
  ];

  return (
    <Box padding={3}>
      <Box pb={2}>
        <Typography
          sx={{
            ...globalStyles.textTitle,
            lineHeight: 1,
          }}
        >
          Danh sách lớp học
        </Typography>
      </Box>
      <Stack sx={globalStyles.viewRoundedWhiteBody}>
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
      </Stack>
    </Box>
  );
}
