import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { CourseStatusType } from '~/constants/course';
import { restrictNumberDisplay } from '~/utils/common';
import { useSearchCourseUpdateRequest } from '~/hooks/course/useSearchCourseUpdateRequest';
import ManageTableCourseUpdateRequest from '~/components/molecules/ManageTableCourseUpdateRequest';
import TabPanel from '~/components/atoms/TabPanel/index';
import { PagingFilterPayload } from '~/models';
import { CourseCreateRequestDetails } from '~/models/courses';

interface ManagerCourseUpdateRequestSectionProps {
  firstList: PagingFilterPayload<CourseCreateRequestDetails> | undefined;
  firstListStatus: CourseStatusType;
  firstListRefetch: () => void;
}

export default function ManagerCourseUpdateRequestSection({
  firstList,
  firstListStatus,
  firstListRefetch,
}: ManagerCourseUpdateRequestSectionProps) {
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue(newValue);

  const {
    courseUpdateRequestList: courseListNOTSTART,
    refetch: refetchListNOTSTART,
  } = useSearchCourseUpdateRequest({
    status: CourseStatusType.NOTSTART,
  });
  const {
    courseUpdateRequestList: courseListEDITREQUEST,
    refetch: refetchListEDITREQUEST,
  } = useSearchCourseUpdateRequest({
    status: CourseStatusType.EDITREQUEST,
  });

  const handleRefetchAll = () => {
    firstListRefetch();
    refetchListNOTSTART();
    refetchListEDITREQUEST();
  };

  const tabEl = [
    {
      id: 0,
      text: 'Chờ duyệt',
      component: (
        <ManageTableCourseUpdateRequest
          status={firstListStatus}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
      noOfRequest: restrictNumberDisplay(firstList?.totalItems),
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
      noOfRequest: restrictNumberDisplay(courseListNOTSTART?.totalItems),
    },
    {
      id: 2,
      text: 'Từ chối',
      component: (
        <ManageTableCourseUpdateRequest
          status={CourseStatusType.EDITREQUEST}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
      noOfRequest: restrictNumberDisplay(courseListEDITREQUEST?.totalItems),
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
