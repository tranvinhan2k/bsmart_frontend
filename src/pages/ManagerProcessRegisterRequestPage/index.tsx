import { Box, Tab, Tabs, Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { scrollToTop } from '~/utils/common';
import ProcessRegisterRequest from '~/components/molecules/ProcessRegisterRequest';
import TabPanel from '~/components/atoms/TabPanel/index';

export default function ManagerProcessRegisterRequestPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (_: any, newValue: number) => setTabValue(newValue);

  const tabEl = [
    {
      id: 0,
      text: 'Đang chờ duyệt',
      component: <ProcessRegisterRequest />,
    },
    {
      id: 1,
      text: 'Đã phê duyệt',
      component: <ProcessRegisterRequest />,
    },
    {
      id: 2,
      text: 'Đã yêu cầu chỉnh sửa',
      component: <ProcessRegisterRequest />,
    },
    {
      id: 3,
      text: 'Đã từ chối',
      component: <ProcessRegisterRequest />,
    },
  ];

  return (
    <Box pt={2} pr={15} pl={15} pb={2}>
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
          Yêu cầu tạo tài khoản giáo viên
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
