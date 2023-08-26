import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { scrollToTop } from '~/utils/common';
import { useSearchManagedUser } from '~/hooks/user/useSearchManagedUser';
import ManageTableUser from '~/components/molecules/ManageTableUser';
import TabPanel from '~/components/atoms/TabPanel/index';
import globalStyles from '~/styles';

export default function ManageUserPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => setTabValue(newValue);

  const { managedUserList: listMentor, refetch: refetchListMentor } =
    useSearchManagedUser({
      role: 'TEACHER',
    });
  const { managedUserList: listMember, refetch: refetchListMember } =
    useSearchManagedUser({
      role: 'STUDENT',
    });

  const handleRefetchAll = () => {
    refetchListMentor();
    refetchListMember();
  };

  const tabEl = [
    {
      id: 0,
      text: 'Giảng viên',
      component: (
        <ManageTableUser
          userRole="TEACHER"
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
      noOfRequest: listMentor?.totalItems,
    },
    {
      id: 1,
      text: 'Học sinh',
      component: (
        <ManageTableUser
          userRole="STUDENT"
          refetchGetNoOfRequest={handleRefetchAll}
        />
      ),
      noOfRequest: listMember?.totalItems,
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
          Danh sách người dùng trong hệ thống
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
