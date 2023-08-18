import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import TabPanel from '~/components/atoms/TabPanel/index';
import ManageTableCourseCreateRequest from '~/components/molecules/ManageTableCourseCreateRequest';
import { CourseStatusType } from '~/constants/course';
import { useSearchCourseCreateRequest } from '~/hooks/course/useSearchCourseCreateRequest';
import { PagingFilterPayload } from '~/models';
import { CourseCreateRequestDetails } from '~/models/courses';
import { restrictNumberDisplay } from '~/utils/common';

interface ManageCourseCreateRequestSectionProps {
  firstList: PagingFilterPayload<CourseCreateRequestDetails> | undefined;
  firstListStatus: CourseStatusType;
  firstListRefetch: () => void;
}
export default function ManageCourseCreateRequestSection({
  firstList,
  firstListStatus,
  firstListRefetch,
}: ManageCourseCreateRequestSectionProps) {
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue(newValue);

  // const {
  //   courseCreateRequestList: courseListWaiting,
  //   refetch: refetchListWaiting,
  // } = useSearchCourseCreateRequest({
  //   status: CourseStatusType.WAITING,
  // });
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

  const handleRefetchAll = () => {
    firstListRefetch();
    refetchListNotStart();
    refetchListEditRequest();
    refetchListRejected();
  };

  const tabEl = [
    {
      id: 0,
      text: 'Chờ duyệt',
      noOfRequest: restrictNumberDisplay(firstList?.totalItems),
      component: (
        <ManageTableCourseCreateRequest
          status={firstListStatus}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
    },
    {
      id: 1,
      text: 'Đã duyệt',
      noOfRequest: restrictNumberDisplay(courseListNotStart?.totalItems),
      component: (
        <ManageTableCourseCreateRequest
          status={CourseStatusType.NOTSTART}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
    },
    {
      id: 2,
      text: 'Yêu cầu chỉnh sửa',
      noOfRequest: restrictNumberDisplay(courseListEditRequest?.totalItems),
      component: (
        <ManageTableCourseCreateRequest
          status={CourseStatusType.EDITREQUEST}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
    },
    {
      id: 3,
      text: 'Đã từ chối',
      noOfRequest: restrictNumberDisplay(courseListRejected?.totalItems),
      component: (
        <ManageTableCourseCreateRequest
          status={CourseStatusType.REJECTED}
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
