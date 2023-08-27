import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { CourseStatusType } from '~/constants/course';
import { restrictNumberDisplay, scrollToTop } from '~/utils/common';
import { useSearchCourseCreateRequest } from '~/hooks/course/useSearchCourseCreateRequest';
import ManageTableCourse from '~/components/molecules/ManageTableCourse';
import TabPanel from '~/components/atoms/TabPanel/index';
import globalStyles from '~/styles';

export default function ManageCoursePage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue(newValue);

  const {
    courseCreateRequestList: courseListNotStart,
    refetch: refetchListNotStart,
  } = useSearchCourseCreateRequest({
    status: CourseStatusType.NOTSTART,
  });
  const {
    courseCreateRequestList: courseListStarting,
    refetch: refetchListStarting,
  } = useSearchCourseCreateRequest({
    status: CourseStatusType.STARTING,
  });
  const {
    courseCreateRequestList: courseListEnded,
    refetch: refetchListEditEnded,
  } = useSearchCourseCreateRequest({
    status: CourseStatusType.ENDED,
  });
  const {
    courseCreateRequestList: courseListCancel,
    refetch: refetchListCancel,
  } = useSearchCourseCreateRequest({
    status: CourseStatusType.CANCEL,
  });
  const handleRefetchAll = () => {
    refetchListNotStart();
    refetchListStarting();
    refetchListEditEnded();
    refetchListCancel();
  };

  const tabEl = [
    {
      id: 0,
      text: 'Chưa bắt đầu',
      component: (
        <ManageTableCourse
          status={CourseStatusType.NOTSTART}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
      noOfRequest: restrictNumberDisplay(courseListNotStart?.items.length),
    },
    {
      id: 1,
      text: 'Đang dạy',
      component: (
        <ManageTableCourse
          status={CourseStatusType.STARTING}
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
      noOfRequest: restrictNumberDisplay(courseListStarting?.items.length),
    },
    {
      id: 2,
      text: 'Bị chặn',
      component: <h1>Bị chặn</h1>,
      noOfRequest: 0,
    },
    {
      id: 3,
      text: 'Đã kết thúc',
      component: (
        <ManageTableCourse
          status={CourseStatusType.ENDED}
          refetchGetNoOfRequest={refetchListEditEnded}
        />
      ),
      noOfRequest: restrictNumberDisplay(courseListEnded?.items.length),
    },
    {
      id: 4,
      text: 'Đã bị hủy',
      component: (
        <ManageTableCourse
          status={CourseStatusType.CANCEL}
          refetchGetNoOfRequest={refetchListCancel}
        />
      ),
      noOfRequest: restrictNumberDisplay(courseListCancel?.items.length),
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
          Danh sách khóa học
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
