import { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '~/utils/common';
import CRUDTable, { MenuItemPayload } from '~/components/molecules/CRUDTable';
import columns from '~/constants/columns';
import globalStyles from '~/styles';
import { formatDate } from '~/utils/date';
import { MetricSize, FontSize, FontFamily, Color } from '~/assets/variables';
import { MentorNavigationActionData } from '~/routes/navigators';

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
    })) || [];

  const handleNavigateAttendance = () => {
    if (row) {
      navigate(
        `/mentor-profile/${MentorNavigationActionData[6].items?.[2].link}/${classId}/${row.id}`
      );
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
    <Stack>
      <Stack sx={{ paddingY: MetricSize.medium_15 }}>
        <Typography
          sx={{
            fontSize: FontSize.medium_28,
            fontFamily: FontFamily.bold,
            color: Color.tertiary,
          }}
        >
          Điểm danh
        </Typography>
        <Typography
          sx={{
            fontSize: FontSize.small_18,
            fontFamily: FontFamily.light,
            color: Color.black,
          }}
        >
          {name}
        </Typography>
      </Stack>
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
