import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { CourseStatusType } from '~/constants/course';
import { restrictNumberDisplay } from '~/utils/common';
import { useSearchCourseUpdateRequest } from '~/hooks/course/useSearchCourseUpdateRequest';
import ManageTableCourseUpdateRequest from '~/components/molecules/ManageTableCourseUpdateRequest';
import TabPanel from '~/components/atoms/TabPanel/index';

export default function ManagerCourseUpdateRequestSection() {
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue(newValue);

  const {
    courseUpdateRequestList: courseListWaiting,
    refetch: refetchListWaiting,
  } = useSearchCourseUpdateRequest({
    status: CourseStatusType.WAITING,
  });
  const {
    courseUpdateRequestList: courseListNotStart,
    refetch: refetchListNotStart,
  } = useSearchCourseUpdateRequest({
    status: CourseStatusType.NOTSTART,
  });
  const {
    courseUpdateRequestList: courseListEditRequest,
    refetch: refetchListEditRequest,
  } = useSearchCourseUpdateRequest({
    status: CourseStatusType.EDITREQUEST,
  });

  const handleRefetchAll = () => {
    refetchListWaiting();
    refetchListNotStart();
    refetchListEditRequest();
  };

  const tabEl = [
    {
      id: 0,
      text: 'Chờ duyệt',
      component: (
        <ManageTableCourseUpdateRequest
          status={CourseStatusType.WAITING}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
      noOfRequest: restrictNumberDisplay(courseListWaiting?.totalItems),
    },
    {
      id: 1,
      text: 'Đã duyệt',
      component: (
        <ManageTableCourseUpdateRequest
          status={CourseStatusType.NOTSTART}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
      noOfRequest: restrictNumberDisplay(courseListNotStart?.totalItems),
    },
    {
      id: 2,
      text: 'yêu cầu chỉnh sửa',
      component: (
        <ManageTableCourseUpdateRequest
          status={CourseStatusType.EDITREQUEST}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
      noOfRequest: restrictNumberDisplay(courseListEditRequest?.totalItems),
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
