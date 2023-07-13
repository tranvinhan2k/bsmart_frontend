import { Box, Chip, Tab, Tabs, Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { restrictNumberDisplay, scrollToTop } from '~/utils/common';
import { useManageRegisterRequest } from '~/hooks/useManageRegisterRequest';
import ProcessRegisterRequest from '~/components/molecules/ProcessRegisterRequest';
import TabPanel from '~/components/atoms/TabPanel/index';

export default function ManagerProcessRegisterRequestPage() {
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
  const { registerRequest: registerRequestWaiting } = useManageRegisterRequest({
    status: statusWaiting,
    q,
    size,
    sort,
  });
  const { registerRequest: registerRequestStarting } = useManageRegisterRequest(
    {
      status: statusStarting,
      q,
      size,
      sort,
    }
  );
  const { registerRequest: registerRequestEditRequest } =
    useManageRegisterRequest({
      status: statusEditRequest,
      q,
      size,
      sort,
    });
  const { registerRequest: registerRequestRejected } = useManageRegisterRequest(
    {
      status: statusRejected,
      q,
      size,
      sort,
    }
  );

  const tabEl = [
    {
      id: 0,
      text: 'Chờ duyệt',
      component: <ProcessRegisterRequest status={statusWaiting} />,
      noOfRequest: restrictNumberDisplay(registerRequestWaiting?.length),
    },
    {
      id: 1,
      text: 'Đã duyệt',
      component: <ProcessRegisterRequest status={statusStarting} />,
      noOfRequest: restrictNumberDisplay(registerRequestStarting?.length),
    },
    {
      id: 2,
      text: 'Yêu cầu chỉnh sửa',
      component: <ProcessRegisterRequest status={statusEditRequest} />,
      noOfRequest: restrictNumberDisplay(registerRequestEditRequest?.length),
    },
    {
      id: 3,
      text: 'Từ chối',
      component: <ProcessRegisterRequest status={statusRejected} />,
      noOfRequest: restrictNumberDisplay(registerRequestRejected?.length),
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
          Yêu cầu tạo tài khoản giáo viên
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
