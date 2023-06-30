import { Box, Tab, Tabs, Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { scrollToTop } from '~/utils/common';
import ProcessCourseCreateRequest from '~/components/molecules/ProcessCourseCreateRequest';
import TabPanel from '~/components/atoms/TabPanel/index';

export default function ManagerProcessCourseCreateRequestPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (_: any, newValue: number) => setTabValue(newValue);

  const tabEl = [
    {
      id: 0,
      text: 'Chờ duyệt',
      component: <ProcessCourseCreateRequest status="WAITING" />,
    },
    {
      id: 1,
      text: 'Đã duyệt',
      component: <ProcessCourseCreateRequest status="NOTSTART" />,
    },
    {
      id: 2,
      text: 'Yêu cầu chỉnh sửa',
      component: <ProcessCourseCreateRequest status="EDITREQUEST" />,
    },
    {
      id: 3,
      text: 'Đã từ chối',
      component: <ProcessCourseCreateRequest status="REJECTED" />,
    },
  ];

  return (
    <Box p={4}>
      <Box pb={2}>
        <Typography
          sx={{
            fontSize: '1.625rem',
            fontWeight: 500,
            lineHeight: 1,
            margin: 0,
            padding: 0,
          }}
        >
          Yêu cầu tạo khóa học của giáo viên
        </Typography>
      </Box>
      <Stack
        direction={{ sm: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        spacing={{ sm: 2, md: 0 }}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
        pb={{ sm: 2, md: 0 }}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Tabs
            variant="scrollable"
            value={tabValue}
            onChange={handleSetTabValue}
          >
            {tabEl.map((tab) => (
              <Tab label={tab.text} key={tab.id} />
            ))}
          </Tabs>
        </Stack>
      </Stack>
      {tabEl.map((tab) => (
        <TabPanel value={tabValue} index={tab.id} key={tab.id}>
          <Box py={2}>{tab.component}</Box>
        </TabPanel>
      ))}
    </Box>
  );
}
