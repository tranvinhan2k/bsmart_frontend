import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import Icon, { IconName } from '~/components/atoms/Icon';
import CustomSwitch from '~/components/atoms/Switch';
import TabPanel from '~/components/atoms/TabPanel/index';
import AnnouncementManagement from '~/components/molecules/AnnouncementManagement';
import ClassAttendanceList from '~/components/molecules/ClassAttendanceList';
import ResourceMentorMain from '~/components/molecules/ResourceManagement/ResourceMentorMain';
import { useManageClass } from '~/hooks/useManageClass';
import { scrollToTop } from '~/utils/common';
import { formatISODateStringToDisplayDate } from '~/utils/date';
import { SX_FORM_ITEM_LABEL, SX_FORM_ITEM_VALUE, SX_WRAPPER } from './style';

export default function MentorResourceManagePage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (_: any, newValue: number) => setTabValue(newValue);

  const [editMode, setEditMode] = useState(false);
  const handleSetEditMode = (event: ChangeEvent<HTMLInputElement>) => {
    setEditMode(event.target.checked);
  };
  const [expandAll, setExpandAll] = useState(false);
  const handleSetExpandAll = (event: ChangeEvent<HTMLInputElement>) => {
    setExpandAll(event.target.checked);
  };

  const id = 4;
  const { classDetails, attendanceQueryData } = useManageClass({ id });

  const tabEl = [
    {
      id: 0,
      text: 'Tài nguyên',
      component: <ResourceMentorMain editMode={editMode} />,
    },
    {
      id: 1,
      text: 'Điểm danh',
      component: (
        <ClassAttendanceList
          classId={classDetails?.id}
          name={classDetails?.subCourseName}
          attendancesList={attendanceQueryData}
        />
      ),
    },
    {
      id: 2,
      text: 'Nội dung',
      component: <h1>Nội dung</h1>,
    },
    {
      id: 3,
      text: 'Thông báo',
      component: <AnnouncementManagement editMode={editMode} />,
    },
  ];

  interface DisplayTextListProps {
    id: number;
    label: string;
    value: string | number;
    icon: IconName;
  }

  const displayTextList: DisplayTextListProps[] = [
    {
      id: 0,
      label: 'Ngày bắt đầu - kết thúc',
      value: classDetails
        ? `${formatISODateStringToDisplayDate(
            classDetails.startDate
          )} -  ${formatISODateStringToDisplayDate(classDetails.endDate)}`
        : '',
      icon: 'calendarMonth',
    },
    {
      id: 2,
      label: 'Đánh giá (?) ',
      value: '5 / 5',
      icon: 'star',
    },
  ];

  return (
    <Stack>
      <Box sx={SX_WRAPPER}>
        <Box mt={2} mb={1} px={2}>
          <Typography sx={SX_FORM_ITEM_LABEL}>
            {classDetails ? classDetails.subCourseName : ''}
          </Typography>
        </Box>

        <Box mt={4} mb={1} px={2}>
          {displayTextList.map((item) => (
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
              key={item.id}
              py={1}
            >
              <Icon name={item.icon} size="small" />
              <Typography sx={SX_FORM_ITEM_LABEL}>{item.label}:</Typography>
              <Typography sx={SX_FORM_ITEM_VALUE}>{item.value}</Typography>
            </Stack>
          ))}
        </Box>
      </Box>

      <Stack
        direction={{ sm: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        spacing={{ sm: 2, md: 0 }}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
        pb={{ sm: 2, md: 0 }}
        mt={2}
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
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <CustomSwitch
            text="Chế độ chỉnh sửa"
            editMode={editMode}
            handleSetEditMode={handleSetEditMode}
          />
        </Stack>
      </Stack>
      {tabEl.map((tab) => (
        <TabPanel value={tabValue} index={tab.id} key={tab.id}>
          <Box>{tab.component}</Box>
        </TabPanel>
      ))}
    </Stack>
  );
}
