import {
  Box,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  ListSubheader,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { CourseStatusType } from '~/constants/course';
import { scrollToTop } from '~/utils/common';
import { useSearchCourseCreateRequest } from '~/hooks/course/useSearchCourseCreateRequest';
import ManageCourseCreateRequestSection from '~/components/molecules/ManageRequestSection/ManageCourseCreateRequestSection';
import ManageCourseUpdateRequestSection from '~/components/molecules/ManageRequestSection/ManageCourseUpdateRequestSection';
import ManageMentorProfileUpdateRequestSection from '~/components/molecules/ManageRequestSection/ManageMentorProfileUpdateRequestSection';
import ManageRegisterRequestSection from '~/components/molecules/ManageRequestSection/ManageRegisterRequestSection';
import ManageWithdrawSection from '~/components/molecules/ManageRequestSection/ManageWithdrawSection';
import TabPanel from '~/components/atoms/TabPanel/index';
import { useSearchRegisterRequest } from '~/hooks/user/useSearchRegisterRequest';
import { MentorProfileStatusType } from '~/constants/profile';

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
    MenuItem00 = 'Phê duyệt hồ sơ giáo viên',
    MenuItem01 = 'Cập nhật hồ sơ giáo viên',
    ListSubheader1 = 'Khóa học / Lớp học',
    MenuItem10 = 'Phê duyệt khóa học',
    MenuItem11 = 'Cập nhật thông tin khóa học / lớp học',
    ListSubheader2 = 'Tài chính',
    MenuItem20 = 'Rút tiền',
  }

  const [tabValue, setTabValue] = useState<number>(0);
  const handleSetTabValue = (e: ChangeEvent<{ value: unknown }>) =>
    setTabValue(e.target.value as number);

  const {
    registerRequest: registerRequestWAITING,
    isLoading: isLoadingRegisterRequestWAITING,
    registerRequest: listWAITING,
    refetch: refetchListRegisterRequestWAITING,
  } = useSearchRegisterRequest({
    status: MentorProfileStatusType.WAITING,
  });

  const {
    courseCreateRequestList: courseCreateRequestWAITING,
    isLoading: isLoadingCourseCreateRequestWAITING,
    refetch: refetchCourseCreateRequestWaiting,
  } = useSearchCourseCreateRequest({
    status: CourseStatusType.WAITING,
  });

  const tabEl = [
    {
      id: 0,
      component: (
        <ManageRegisterRequestSection
          firstList={listWAITING}
          firstListStatus={MentorProfileStatusType.WAITING}
          firstListRefetch={refetchListRegisterRequestWAITING}
        />
      ),
    },
    {
      id: 1,
      component: <ManageMentorProfileUpdateRequestSection />,
    },
    {
      id: 2,
      component: (
        <ManageCourseCreateRequestSection
          firstList={courseCreateRequestWAITING}
          firstListStatus={CourseStatusType.WAITING}
          firstListRefetch={refetchCourseCreateRequestWaiting}
        />
      ),
    },
    {
      id: 3,
      component: <ManageCourseUpdateRequestSection />,
    },
    {
      id: 4,
      component: <ManageWithdrawSection />,
    },
  ];

  const renderMenuItem = [
    { id: 0, label: Text.ListSubheader0, isListSubheader: true },
    {
      id: 1,
      label: Text.MenuItem00,
      isLoading: isLoadingRegisterRequestWAITING,
      indicator: registerRequestWAITING ? registerRequestWAITING.totalItems : 0,
      value: 0,
    },
    {
      id: 2,
      label: Text.MenuItem01,
      isLoading: false,
      indicator: 0,
      value: 1,
    },
    { id: 3, label: Text.ListSubheader1, isListSubheader: true },
    {
      id: 4,
      label: Text.MenuItem10,
      isLoading: isLoadingCourseCreateRequestWAITING,
      indicator: courseCreateRequestWAITING
        ? courseCreateRequestWAITING.totalItems
        : 0,
      value: 2,
    },
    { id: 5, label: Text.MenuItem11, isLoading: false, indicator: 0, value: 3 },
    { id: 6, label: Text.ListSubheader2, isListSubheader: true },
    { id: 7, label: Text.MenuItem20, isLoading: false, indicator: 0, value: 4 },
  ];

  return (
    <Box pt={3} pl={4} pr={4}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
          <FormControl fullWidth size="small">
            <Box mt={1} />
            <TextField
              value={tabValue}
              onChange={handleSetTabValue}
              select
              size="small"
            >
              {renderMenuItem.map((item) =>
                item.isListSubheader ? (
                  <ListSubheader key={item.id}>{item.label}</ListSubheader>
                ) : (
                  <MenuItem
                    key={item.id}
                    value={item.value}
                    sx={{ width: '100%' }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ width: '100%' }}
                      spacing={2}
                    >
                      <p>{item.label}</p>
                      {item.isLoading ? (
                        <CircularProgress size="1rem" />
                      ) : (
                        <Chip
                          label={item.indicator}
                          size="small"
                          color={
                            item.indicator && item.indicator > 0
                              ? 'error'
                              : 'default'
                          }
                        />
                      )}
                    </Stack>
                  </MenuItem>
                )
              )}
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
