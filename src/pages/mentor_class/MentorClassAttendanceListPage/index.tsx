import { useEffect, useState } from 'react';
import { Stack, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '~/utils/common';
import CRUDTable, { MenuItemPayload } from '~/components/molecules/CRUDTable';
import columns from '~/constants/columns';
import globalStyles from '~/styles';
import {
  MentorClassActionLink,
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import { useGetIdFromUrl, useQueryGetDetailSchedule } from '~/hooks';
import TextTitle from '~/components/atoms/texts/TextTitle';

export interface AttendanceTimeSlotPayload {
  id: number;
  slotName: string;
  time: string;
  date: string;
  isPresent: boolean;
}

export default function MentorClassAttendanceListPage() {
  const [selectedRow, setSelectedRow] = useState<AttendanceTimeSlotPayload>();
  const classId = useGetIdFromUrl('id');

  useEffect(() => {
    scrollToTop();
  }, []);

  const navigate = useNavigate();

  const {
    classTimeSlots: rows,
    error,
    isLoading,
  } = useQueryGetDetailSchedule(classId);
  // const rows: AttendanceTimeSlotPayload[] = [
  //   {
  //     id: 0,
  //     slotName: 'Slot 1',
  //     time: '07:00 - 08:30',
  //     date: '7/6/2023',
  //   },
  //   {
  //     id: 1,
  //     slotName: 'Slot 2',
  //     time: '08:45 - 10:00',
  //     date: '7/6/2023',
  //   },
  //   {
  //     id: 2,
  //     slotName: 'Slot 1',
  //     time: '07:00 - 08:30',
  //     date: '7/6/2023',
  //   },
  // ];

  const handleNavigateAttendance = () => {
    if (selectedRow) {
      navigate(
        `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_class_detail}/${classId}/${MentorClassActionLink.take_attendance}/${selectedRow.id}`
      );
    }
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
      <TextTitle title="Điểm danh lớp học" />
      <Stack>
        <CRUDTable
          columns={columns.attendanceClassColumns}
          rows={rows}
          error={error}
          isLoading={isLoading}
          menuItemList={menuList}
          setSelectedRow={setSelectedRow}
        />
      </Stack>
    </Stack>
  );
}
