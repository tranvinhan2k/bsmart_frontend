import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { restrictNumberDisplay, scrollToTop } from '~/utils/common';
import { useSearchCourseCreateRequest } from '~/hooks/course/useSearchCourseCreateRequest';
import ManageTableCourse from '~/components/molecules/ManageTableCourse';
import TabPanel from '~/components/atoms/TabPanel/index';

export default function ManagerManageCoursePage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue(newValue);

  const {
    courseCreateRequestList: courseListWaiting,
    refetch: refetchListWaiting,
  } = useSearchCourseCreateRequest({
    status: 'WAITING',
  });
  const {
    courseCreateRequestList: courseListNotStart,
    refetch: refetchListNotStart,
  } = useSearchCourseCreateRequest({
    status: 'NOTSTART',
  });
  const {
    courseCreateRequestList: courseListEditRequest,
    refetch: refetchListEditRequest,
  } = useSearchCourseCreateRequest({
    status: 'EDITREQUEST',
  });
  const {
    courseCreateRequestList: courseListRejected,
    refetch: refetchListRejected,
  } = useSearchCourseCreateRequest({
    status: 'REJECTED',
  });

  const tabEl = [
    {
      id: 0,
      text: 'Đang chờ mở',
      component: (
        <ManageTableCourse
          status="WAITING"
          refetchGetNoOfRequest={refetchListWaiting}
        />
      ),
      noOfRequest: restrictNumberDisplay(courseListWaiting?.items.length),
    },
    {
      id: 1,
      text: 'Đang dạy',
      component: (
        <ManageTableCourse
          status="NOTSTART"
          refetchGetNoOfRequest={refetchListNotStart}
        />
      ),
      noOfRequest: restrictNumberDisplay(courseListNotStart?.items.length),
    },
    {
      id: 2,
      text: 'Đã kết thúc',
      component: (
        <ManageTableCourse
          status="EDITREQUEST"
          refetchGetNoOfRequest={refetchListEditRequest}
        />
      ),
      noOfRequest: restrictNumberDisplay(courseListEditRequest?.items.length),
    },
    {
      id: 3,
      text: 'Đã bị hủy',
      component: (
        <ManageTableCourse
          status="REJECTED"
          refetchGetNoOfRequest={refetchListRejected}
        />
      ),
      noOfRequest: restrictNumberDisplay(courseListRejected?.items.length),
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
          Danh sách khóa học
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
