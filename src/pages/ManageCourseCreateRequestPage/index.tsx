import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { CourseStatusType } from '~/constants/course';
import { restrictNumberDisplay, scrollToTop } from '~/utils/common';
import { useSearchCourseCreateRequest } from '~/hooks/course/useSearchCourseCreateRequest';
import ManageTableCourseCreateRequest from '~/components/molecules/ManageTableCourseCreateRequest';
import TabPanel from '~/components/atoms/TabPanel/index';

export default function ManageCourseCreateRequestPage() {
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
    status: CourseStatusType.WAITING,
  });
  const {
    courseCreateRequestList: courseListNotStart,
    refetch: refetchListNotStart,
  } = useSearchCourseCreateRequest({
    status: CourseStatusType.NOTSTART,
  });
  const {
    courseCreateRequestList: courseListEditRequest,
    refetch: refetchListEditRequest,
  } = useSearchCourseCreateRequest({
    status: CourseStatusType.EDITREQUEST,
  });
  const {
    courseCreateRequestList: courseListRejected,
    refetch: refetchListRejected,
  } = useSearchCourseCreateRequest({
    status: CourseStatusType.REJECTED,
  });

  const tabEl = [
    {
      id: 0,
      text: 'Chờ duyệt',
      component: (
        <ManageTableCourseCreateRequest
          status={CourseStatusType.WAITING}
          refetchGetNoOfRequest={refetchListWaiting}
        />
      ),
      noOfRequest: restrictNumberDisplay(courseListWaiting?.items.length),
    },
    {
      id: 1,
      text: 'Đã duyệt',
      component: (
        <ManageTableCourseCreateRequest
          status={CourseStatusType.NOTSTART}
          refetchGetNoOfRequest={refetchListNotStart}
        />
      ),
      noOfRequest: restrictNumberDisplay(courseListNotStart?.items.length),
    },
    {
      id: 2,
      text: 'Yêu cầu chỉnh sửa',
      component: (
        <ManageTableCourseCreateRequest
          status={CourseStatusType.EDITREQUEST}
          refetchGetNoOfRequest={refetchListEditRequest}
        />
      ),
      noOfRequest: restrictNumberDisplay(courseListEditRequest?.items.length),
    },
    {
      id: 3,
      text: 'Đã từ chối',
      component: (
        <ManageTableCourseCreateRequest
          status={CourseStatusType.REJECTED}
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
          Yêu cầu tạo khóa học của giáo viên
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
