import { useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '~/utils/common';
import CRUDTable, { MenuItemPayload } from '~/components/molecules/CRUDTable';
import columns from '~/constants/columns';
import globalStyles from '~/styles';
import DashboardBreadcrumbNavigation from '~/components/molecules/navigations/DashboardBreadcrumbNavigation';
import CustomTab from '~/components/atoms/CustomTab';
import Schedule from '~/components/molecules/Schedule';
import {
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';

export default function MentorAttendanceListPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const navigate = useNavigate();

  const rows = [
    {
      id: 0,
      slotName: 'Slot 1',
      date: 'Ngày 7/6/2023',
      numOfStudent: '27/30',
    },
    {
      id: 1,
      slotName: 'Slot 2',
      date: 'Ngày 7/6/2023',
      numOfStudent: '30/30',
    },
    {
      id: 2,
      slotName: 'Slot 3',
      date: 'Ngày 7/6/2023',
      numOfStudent: '30/30',
    },
  ];

  const handleNavigateAttendance = () => {
    navigate(
      `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.take_attendance}`
    );
  };

  const menuList: MenuItemPayload[] = [
    {
      icon: 'attendance',
      title: 'Điểm danh',
      onCLick: handleNavigateAttendance,
    },
  ];

  return (
    <Stack>
      <Typography sx={globalStyles.textTitle}>Điểm danh lớp LTV-12</Typography>
      <Stack>
        <CustomTab
          tabContentList={[
            {
              label: 'Lịch học',
              data: (
                <Schedule
                  data={[
                    {
                      className: 'Joker',
                      date: new Date().toISOString(),
                      dayOfWeekId: 1,
                      id: 0,
                      slotId: 1,
                      isPresent: true,
                      link: 'google.com',
                    },
                  ]}
                />
              ),
            },
            {
              data: (
                <CRUDTable
                  title="Điếm danh lớp LTV12"
                  columns={columns.attendanceClassColumns}
                  rows={rows}
                  menuItemList={menuList}
                />
              ),
              label: 'Danh sách buổi học',
            },
          ]}
        />
      </Stack>
    </Stack>
  );
}
