import {
  Box,
  FormControl,
  Grid,
  ListSubheader,
  MenuItem,
  TextField,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { scrollToTop } from '~/utils/common';
import ManageCourseCreateRequestSection from '~/components/molecules/ManageRequestSection/ManageCourseCreateRequestSection';
import ManageMentorProfileUpdateRequestSection from '~/components/molecules/ManageRequestSection/ManageMentorProfileUpdateRequestSection';
import ManageRegisterRequestSection from '~/components/molecules/ManageRequestSection/ManageRegisterRequestSection';
import TabPanel from '~/components/atoms/TabPanel/index';

export default function ManageRequestManagerPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const enum Text {
    sectionLabel = 'Gửi yêu cầu',
    selectCategoryLabel = 'Phân loại',
    selectRequestLabel = 'Chọn loại yêu cầu',
    //
    ListSubheader0 = 'Người dùng',
    MenuItem0 = 'Yêu cầu phê duyệt hồ sơ giáo viên',
    MenuItem1 = 'Yêu cầu thêm thông tin khoản giáo viên',
    ListSubheader1 = 'Khóa học / Lớp học',
    MenuItem2 = 'Yêu cầu phê duyệt khóa học',
    MenuItem3 = 'Yêu cầu cập nhật thông tin khóa học',
    MenuItem4 = 'Yêu cầu cập nhật thông tin lớp học',
    ListSubheader3 = 'Tài chính',
    MenuItem5 = 'Yêu cầu rút tiền',
    ListSubheader4 = 'Khác',
    MenuItem6 = 'Yêu cầu khác',
  }

  const [tabValue, setTabValue] = useState<number>(0);
  const handleSetTabValue = (e: ChangeEvent<{ value: unknown }>) =>
    setTabValue(e.target.value as number);

  const tabEl = [
    {
      id: 0,
      component: <ManageRegisterRequestSection />,
    },
    {
      id: 1,
      component: <ManageMentorProfileUpdateRequestSection />,
    },
    {
      id: 2,
      component: <ManageCourseCreateRequestSection />,
    },
    {
      id: 3,
      component: <h1>{Text.MenuItem3}</h1>,
    },
    {
      id: 4,
      component: <h1>{Text.MenuItem4}</h1>,
    },
    {
      id: 5,
      component: <h1>{Text.MenuItem5}</h1>,
    },
    {
      id: 6,
      component: <h1>{Text.MenuItem6}</h1>,
    },
  ];

  return (
    <Box pt={3} pl={4} pr={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
          <FormControl fullWidth size="small">
            <Box mt={1} />
            <TextField
              value={tabValue}
              onChange={handleSetTabValue}
              select
              size="small"
            >
              <ListSubheader>{Text.ListSubheader0}</ListSubheader>
              <MenuItem value={0}>{Text.MenuItem0}</MenuItem>
              <MenuItem value={1}>{Text.MenuItem1}</MenuItem>
              <ListSubheader>{Text.ListSubheader1}</ListSubheader>
              <MenuItem value={2}>{Text.MenuItem2}</MenuItem>
              <MenuItem value={3}>{Text.MenuItem3}</MenuItem>
              <MenuItem value={4}>{Text.MenuItem4}</MenuItem>
              <ListSubheader>{Text.ListSubheader3}</ListSubheader>
              <MenuItem value={5}>{Text.MenuItem5}</MenuItem>
              <ListSubheader>{Text.ListSubheader4}</ListSubheader>
              <MenuItem value={6}>{Text.MenuItem6}</MenuItem>
            </TextField>
          </FormControl>
        </Grid>
      </Grid>
      {tabEl.map((tab) => (
        <TabPanel value={tabValue} index={tab.id} key={tab.id}>
          <Box mt={2}>{tab.component}</Box>
        </TabPanel>
      ))}
    </Box>
  );
}
