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
import TabPanel from '~/components/atoms/TabPanel/index';
import ManageCourseCreateRequestSection from '~/components/molecules/ManageRequestSection/ManageCourseCreateRequestSection';
import ManageCourseUpdateRequestSection from '~/components/molecules/ManageRequestSection/ManageCourseUpdateRequestSection';
import ManageMentorProfileUpdateRequestSection from '~/components/molecules/ManageRequestSection/ManageMentorProfileUpdateRequestSection';
import ManageRegisterRequestSection from '~/components/molecules/ManageRequestSection/ManageRegisterRequestSection';
import { CourseStatusType } from '~/constants/course';
import {
  MentorProfileStatusType,
  MentorProfileUpdateStatusType,
} from '~/constants/profile';
import { useSearchCourseCreateRequest } from '~/hooks/course/useSearchCourseCreateRequest';
import { useSearchCourseUpdateRequest } from '~/hooks/course/useSearchCourseUpdateRequest';
import { useSearchMentorProfileUpdateRequest } from '~/hooks/user/useSearchMentorProfileUpdateRequest';
import { useSearchRegisterRequest } from '~/hooks/user/useSearchRegisterRequest';
import { scrollToTop } from '~/utils/common';

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
    //
    ListSubheader1 = 'Khóa học / Lớp học',
    MenuItem10 = 'Phê duyệt khóa học',
    MenuItem11 = 'Cập nhật thông tin khóa học / lớp học',
  }

  const [tabValue, setTabValue] = useState<number>(0);
  const handleSetTabValue = (e: ChangeEvent<{ value: unknown }>) => {
    setTabValue(e.target.value as number);
  };

  const {
    registerRequestList: registerRequestListWAITING,
    isLoading: isLoadingRegisterRequestListWAITING,
    refetch: refetchListRegisterRequestListWAITING,
  } = useSearchRegisterRequest({
    status: MentorProfileStatusType.WAITING,
  });
  const {
    mentorProfileUpdateRequestList: mentorProfileUpdateRequestPENDING,
    isLoading: isLoadingMentorProfileUpdateRequest,
    refetch: refetchMentorProfileUpdateRequestPENDING,
  } = useSearchMentorProfileUpdateRequest({
    status: MentorProfileUpdateStatusType.PENDING,
  });
  const {
    courseCreateRequestList: courseCreateRequestWAITING,
    isLoading: isLoadingCourseCreateRequestWAITING,
    refetch: refetchCourseCreateRequestWaiting,
  } = useSearchCourseCreateRequest({
    status: CourseStatusType.WAITING,
  });
  const {
    courseUpdateRequestList: courseUpdateRequestListWAITING,
    isLoading: isLoadingCourseUpdateRequestWAITING,
    refetch: refetchCourseUpdateRequestListWAITING,
  } = useSearchCourseUpdateRequest({
    status: CourseStatusType.WAITING,
  });

  const tabEl = [
    {
      id: 0,
      component: (
        <ManageRegisterRequestSection
          firstList={registerRequestListWAITING}
          firstListStatus={MentorProfileStatusType.WAITING}
          firstListRefetch={refetchListRegisterRequestListWAITING}
        />
      ),
    },
    {
      id: 1,
      component: (
        <ManageMentorProfileUpdateRequestSection
          firstList={mentorProfileUpdateRequestPENDING}
          firstListStatus={MentorProfileUpdateStatusType.PENDING}
          firstListRefetch={refetchMentorProfileUpdateRequestPENDING}
        />
      ),
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
      component: (
        <ManageCourseUpdateRequestSection
          firstList={courseUpdateRequestListWAITING}
          firstListStatus={CourseStatusType.WAITING}
          firstListRefetch={refetchCourseUpdateRequestListWAITING}
        />
      ),
    },
  ];

  const renderMenuItem = [
    { id: 0, label: Text.ListSubheader0, isListSubheader: true },
    {
      id: 1,
      label: Text.MenuItem00,
      isLoading: isLoadingRegisterRequestListWAITING,
      indicator: registerRequestListWAITING
        ? registerRequestListWAITING.totalItems
        : 0,
      value: 0,
    },
    {
      id: 2,
      label: Text.MenuItem01,
      isLoading: isLoadingMentorProfileUpdateRequest,
      indicator: mentorProfileUpdateRequestPENDING
        ? mentorProfileUpdateRequestPENDING.totalItems
        : 0,
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
    {
      id: 5,
      label: Text.MenuItem11,
      isLoading: isLoadingCourseUpdateRequestWAITING,
      indicator: courseUpdateRequestListWAITING
        ? courseUpdateRequestListWAITING.totalItems
        : 0,
      value: 3,
    },
  ];

  return (
    <Box pt={3} pl={4} pr={4}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
          <Box mt={1} />
          <FormControl fullWidth size="small">
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
                      {/* {showChip && (
                        <Chip
                          label={item.indicator}
                          size="small"
                          color={
                            item.indicator && item.indicator > 0
                              ? 'error'
                              : 'default'
                          }
                        />
                      )} */}
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
