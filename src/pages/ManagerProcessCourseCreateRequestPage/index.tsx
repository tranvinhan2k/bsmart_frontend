import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { restrictNumberDisplay, scrollToTop } from '~/utils/common';
import { useManageCourseCreateRequest } from '~/hooks/useManageCourseCreateRequest';
import ProcessCourseCreateRequest from '~/components/molecules/ProcessCourseCreateRequest';
import TabPanel from '~/components/atoms/TabPanel/index';

export default function ManagerProcessCourseCreateRequestPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (_: any, newValue: number) => setTabValue(newValue);

  const q = '';
  const size = 0;
  const sort = '';
  const statusWaiting = 'WAITING';
  const statusStarting = 'STARTING';
  const statusEditRequest = 'EDITREQUEST';
  const statusRejected = 'REJECTED';

  const { courseCreateRequest: courseCreateRequestWaiting } =
    useManageCourseCreateRequest({
      status: statusWaiting,
      q,
      size,
      sort,
    });
  const { courseCreateRequest: courseCreateRequestStarting } =
    useManageCourseCreateRequest({
      status: statusStarting,
      q,
      size,
      sort,
    });
  const { courseCreateRequest: courseCreateRequestEditRequest } =
    useManageCourseCreateRequest({
      status: statusEditRequest,
      q,
      size,
      sort,
    });
  const { courseCreateRequest: courseCreateRequestRejected } =
    useManageCourseCreateRequest({
      status: statusRejected,
      q,
      size,
      sort,
    });

  const tabEl = [
    {
      id: 0,
      text: 'Chờ duyệt',
      component: <ProcessCourseCreateRequest status="WAITING" />,
      noOfRequest: restrictNumberDisplay(courseCreateRequestWaiting?.length),
    },
    {
      id: 1,
      text: 'Đã duyệt',
      component: <ProcessCourseCreateRequest status="NOTSTART" />,
      noOfRequest: restrictNumberDisplay(courseCreateRequestStarting?.length),
    },
    {
      id: 2,
      text: 'Yêu cầu chỉnh sửa',
      component: <ProcessCourseCreateRequest status="EDITREQUEST" />,
      noOfRequest: restrictNumberDisplay(
        courseCreateRequestEditRequest?.length
      ),
    },
    {
      id: 3,
      text: 'Đã từ chối',
      component: <ProcessCourseCreateRequest status="REJECTED" />,
      noOfRequest: restrictNumberDisplay(courseCreateRequestRejected?.length),
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
