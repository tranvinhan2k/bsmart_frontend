import { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '~/utils/common';
import CRUDTable, { MenuItemPayload } from '~/components/molecules/CRUDTable';
import columns from '~/constants/columns';
import globalStyles from '~/styles';
import { formatDate } from '~/utils/date';

interface ClassAttendanceListProps {
  name: string | undefined;
  attendancesList: any;
  classId: number | undefined;
}

export default function ClassAttendanceList({
  name,
  attendancesList,
  classId,
}: ClassAttendanceListProps) {
  useEffect(() => {
    scrollToTop();
  }, []);

  const navigate = useNavigate();

  const [row, setRow] = useState<any>();

  const rows =
    attendancesList?.data?.items?.map((item: any) => ({
      id: item.id,
      slotName: item.slot.name,
      date: formatDate(item.date),
      numOfStudent: '27/30',
    })) || [];

  const handleNavigateAttendance = () => {
    if (row) {
      navigate(`/mentor-profile/take-attendance/${classId}/${row.id}`);
    }
  };

  const menuList: MenuItemPayload[] = [
    {
      icon: 'attendance',
      title: 'Điểm danh',
      onCLick: handleNavigateAttendance,
    },
    {
      icon: 'redo',
      title: 'Điểm danh lại',
      onCLick: handleNavigateAttendance,
    },
    {
      icon: 'request',
      title: 'Yêu cầu sửa điểm danh',
      onCLick: () => {},
    },
  ];

  return (
    <Stack marginTop={2}>
      <Typography
        sx={globalStyles.textSubTitle}
      >{`Điểm danh lớp ${name}`}</Typography>
      <Stack
        sx={{
          marginTop: 1,
          height: '500px',
        }}
      >
        <CRUDTable
          setSelectedRow={setRow}
          title="Điếm danh lớp LTV12"
          columns={columns.attendanceClassColumns}
          rows={rows}
          menuItemList={menuList}
        />
      </Stack>
    </Stack>
  );
}
