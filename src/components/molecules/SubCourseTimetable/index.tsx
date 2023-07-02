import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { SubCourseTimeInWeekPayload } from '~/models/subCourse';
import { DayInWeekPayload } from '~/models/dayInWeek';
import { SlotPayload } from '~/models/slot';
import Icon from '~/components/atoms/Icon';
import { FontFamily, FontSize, MetricSize } from '~/assets/variables';

const dayInWeek: DayInWeekPayload[] = [
  {
    id: 0,
    code: 'MONDAY',
    name: 'Chủ Nhật',
  },
  {
    id: 1,
    code: 'TUESDAY',
    name: 'Thứ hai',
  },
  {
    id: 0,
    code: 'WEDNESDAY',
    name: 'Thứ ba',
  },
  {
    id: 0,
    code: 'THURSDAY',
    name: 'Thứ tư',
  },
  {
    id: 0,
    code: 'FRIDAY',
    name: 'Thứ năm',
  },
  {
    id: 0,
    code: 'SATURDAY',
    name: 'Thứ sáu',
  },
  {
    id: 0,
    code: 'SUNDAY',
    name: 'Thứ bảy',
  },
];

const slot: SlotPayload[] = [
  {
    id: 0,
    name: 'Slot 1',
    code: 'SLOT1',
    startTime: '07:30',
    endTime: '08:20',
  },
  {
    id: 1,
    name: 'Slot 2',
    code: 'SLOT2',
    startTime: '08:30',
    endTime: '10:00',
  },
  {
    id: 2,
    name: 'Slot 3',
    code: 'SLOT3',
    startTime: '10:15',
    endTime: '11:45',
  },
  {
    id: 3,
    name: 'Slot 4',
    code: 'SLOT4',
    startTime: '12:30',
    endTime: '14:00',
  },
  {
    id: 4,
    name: 'Slot 5',
    code: 'SLOT5',
    startTime: '14:15',
    endTime: '15:45',
  },
];

const columns: GridColDef[] = [
  {
    field: 'slot',
    headerName: 'Khung giờ học',
    flex: 1,
  },
];
dayInWeek.map((item) => {
  columns.push({
    headerName: item.name,
    flex: 1,
    field: item.code,
    renderCell: (rows) => {
      return (
        rows.row[item.code] && (
          <Icon name="check" color="orange" size="medium" />
        )
      );
    },
  });
  return null;
});
const dayInWeekData = dayInWeek.reduce((obj: any, item) => {
  // eslint-disable-next-line no-param-reassign
  obj[item.code] = false;
  return obj;
}, []);

const rows = slot.map((item) => {
  return {
    ...dayInWeekData,
    id: item.id,
    code: item.code,
    slot: `${item.startTime} - ${item.endTime}`,
  };
});

interface SubCourseTimetableProps {
  data: { dayOfWeek: DayInWeekPayload; slot: SlotPayload }[];
}

export default function SubCourseTimetable({ data }: SubCourseTimetableProps) {
  React.useEffect(() => {
    if (data.length > 0) {
      data.map((slotTime) => {
        const dayCode = slotTime.dayOfWeek.code;
        const slotCode = slotTime.slot.code;
        const index = rows.findIndex((item) => item.code === slotCode);
        if (dayCode !== null && index !== null) {
          rows[index][dayCode] = true;
        }
        return null;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.length === 0)
    return <Typography>Lớp học chưa có thời khóa biẻu</Typography>;

  return (
    <Box height={400} width="100%">
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
}
