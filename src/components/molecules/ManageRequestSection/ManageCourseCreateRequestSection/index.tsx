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
  refetchFirstList: () => void;
}
export default function ManageCourseCreateRequestSection({
  firstList,
  refetchFirstList,
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
    refetchFirstList();
    refetchListNotStart();
    refetchListEditRequest();
    refetchListRejected();
  };

  const tabEl = [
    {
      id: 0,
      text: 'Chờ duyệt',
      component: (
        <ManageTableCourseCreateRequest
          status={CourseStatusType.WAITING}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
      noOfRequest: restrictNumberDisplay(firstList?.totalItems),
    },
    {
      id: 1,
      text: 'Đã duyệt',
      component: (
        <ManageTableCourseCreateRequest
          status={CourseStatusType.NOTSTART}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
      noOfRequest: restrictNumberDisplay(courseListNotStart?.totalItems),
    },
    {
      id: 2,
      text: 'Yêu cầu chỉnh sửa',
      component: (
        <ManageTableCourseCreateRequest
          status={CourseStatusType.EDITREQUEST}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
      noOfRequest: restrictNumberDisplay(courseListEditRequest?.totalItems),
    },
    {
      id: 3,
      text: 'Đã từ chối',
      component: (
        <ManageTableCourseCreateRequest
          status={CourseStatusType.REJECTED}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
      noOfRequest: restrictNumberDisplay(courseListRejected?.totalItems),
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
