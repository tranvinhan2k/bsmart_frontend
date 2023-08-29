import {
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Dayjs } from 'dayjs';
import React, { useState, PureComponent } from 'react';
import { DateRange, Range } from 'react-date-range';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Color } from '~/assets/variables';
import globalStyles from '~/styles';
import {
  formatDate,
  formatISODateDateToDisplayDate,
  formatISODateDateToDisplayMonthYear,
} from '~/utils/date';
// eslint-disable-next-line import/no-cycle
import RevenueHistory from './RevenueHistoryMentor';

export interface RevenuePayload {
  id: number;
  date: string;
  revenue: number;
  total: number;
  buyer: string;
}

export interface RevenueChartPayload {
  name: string;
  total: number;
  revenue: number;
  date: string;
}

function getFirstAndLastDateOfMonth(
  year: number,
  month: number
): { firstDate: Date; lastDate: Date } {
  // Ensure the month value is within the valid range (0 to 11)
  const tmpMonth = Math.max(0, Math.min(11, month - 1));

  // Create a new date with the given year and month (day is set to 1 to get the first day of the month)
  const firstDate = new Date(year, tmpMonth, 1);

  // Get the next month and subtract 1 day to get the last day of the current month
  const lastDate = new Date(year, tmpMonth + 1, 0);

  return { firstDate, lastDate };
}

function getFirstAndLastDateOfYear(year: number): {
  firstDate: Date;
  lastDate: Date;
} {
  // Create a new date with the given year and January (month is set to 0 to represent January)
  const firstDate = new Date(year, 0, 1);

  // Get the next year and subtract 1 day to get the last day of the current year
  const lastDate = new Date(year + 1, 0, 0);

  return { firstDate, lastDate };
}

function getVietnameseMonthName(date: Date): string {
  return `Tháng ${formatISODateDateToDisplayMonthYear(date)}`;
}
function getVietnameseYearName(year: number): string {
  return `Năm ${year}`;
}

function convertToMonthArray(data: RevenuePayload[]): RevenueChartPayload[] {
  const monthData: { [month: string]: RevenueChartPayload } = {};

  for (let i = 0; i < data.length; i += 1) {
    const item = data[i];
    const date = new Date(item.date);
    const month = getVietnameseMonthName(date);

    if (!monthData[month]) {
      monthData[month] = {
        name: month,
        total: 0,
        revenue: 0,
        date: item.date,
      };
    }

    monthData[month].total += item.total;
    monthData[month].revenue += item.revenue;
  }

  return Object.values(monthData);
}

function convertToYearArray(data: RevenuePayload[]): RevenueChartPayload[] {
  const yearData: { [year: string]: RevenueChartPayload } = {};

  for (let i = 0; i < data.length; i += 1) {
    const item = data[i];
    const date = new Date(item.date);
    const year = date.getFullYear();
    const yearName = getVietnameseYearName(year);

    if (!yearData[yearName]) {
      yearData[yearName] = {
        name: yearName,
        total: 0,
        revenue: 0,
        date: item.date,
      };
    }

    yearData[yearName].total += item.total;
    yearData[yearName].revenue += item.revenue;
  }

  return Object.values(yearData);
}

function getVietnameseDayName(date: Date): string {
  const day = date.getDate();
  return `Ngày ${formatDate(date.toISOString())}`;
}

function convertToDayArray(data: RevenuePayload[]): RevenueChartPayload[] {
  const dayData: { [day: string]: RevenueChartPayload } = {};

  for (let i = 0; i < data.length; i += 1) {
    const item = data[i];
    const date = new Date(item.date);
    const dayName = getVietnameseDayName(date);

    if (!dayData[dayName]) {
      dayData[dayName] = {
        name: dayName,
        total: 0,
        revenue: 0,
        date: item.date,
      };
    }

    dayData[dayName].total += item.total;
    dayData[dayName].revenue += item.revenue;
  }

  return Object.values(dayData);
}

const convertRevenue = (
  data: RevenuePayload[],
  type: 'DAY' | 'MONTH' | 'YEAR' | 'ALL'
) => {
  switch (type) {
    case 'DAY':
      return convertToDayArray(data);
    case 'MONTH':
      return convertToMonthArray(data);
    case 'YEAR':
      return convertToYearArray(data);
    default:
      return convertToDayArray(data);
  }
};

export default function RevenueChart({ data }: { data: RevenuePayload[] }) {
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [type, setType] = useState<'DAY' | 'MONTH' | 'YEAR' | 'ALL'>('ALL');
  const [displayType, setDisplayType] = useState<'DAY' | 'MONTH' | 'YEAR'>(
    'DAY'
  );

  const historyData = data.filter((item) => {
    if (type !== 'ALL') {
      return (
        new Date(state?.[0]?.startDate || '').getTime() <=
          new Date(item.date).getTime() &&
        new Date(item.date).getTime() <=
          new Date(state?.[0]?.endDate || '').getTime()
      );
    }
    return true;
  });
  const filterData = convertRevenue(historyData, displayType).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  const handleChangeType = (paramType: 'DAY' | 'MONTH' | 'YEAR' | 'ALL') => {
    setType(paramType);
    switch (paramType) {
      case 'DAY': {
        setState(() => [
          {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
          },
        ]);
        break;
      }
      case 'MONTH': {
        const currentDate = new Date();
        const days = getFirstAndLastDateOfMonth(
          currentDate.getFullYear(),
          currentDate.getMonth()
        );
        setState(() => [
          {
            startDate: days.firstDate,
            endDate: days.lastDate,
            key: 'selection',
          },
        ]);
        break;
      }
      case 'YEAR': {
        const currentDate = new Date();
        const days = getFirstAndLastDateOfYear(currentDate.getFullYear());
        setState(() => [
          {
            startDate: days.firstDate,
            endDate: days.lastDate,
            key: 'selection',
          },
        ]);
        break;
      }
      default:
        setState(() => [
          {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
          },
        ]);
        break;
    }
  };

  return (
    <Stack>
      {/* <Stack>
        <Typography sx={globalStyles.textSubTitle}>
          Thống kê doanh thu
        </Typography>
        <Stack marginTop={1}>
          <Stack sx={{ flexDirection: 'row', width: '100%', height: '100%' }}>
            <Stack
              sx={{
                borderRadius: '12px',
              }}
            >
              <Typography sx={globalStyles.textSmallLabel}>
                Chọn dạng hiển thị
              </Typography>
              <Stack marginTop={1}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Age</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={displayType}
                    label="Age"
                    onChange={(e) => setDisplayType(e.target.value as any)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="DAY">Hiển thị theo ngày</MenuItem>
                    <MenuItem value="MONTH">Hiển thị theo tháng</MenuItem>
                    <MenuItem value="YEAR">Hiển thị theo năm</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Typography sx={globalStyles.textSmallLabel}>
                Chọn khoảng thời gian
              </Typography>
              <Stack marginTop={1}>
                <ButtonGroup
                  sx={{ width: '100%' }}
                  variant="contained"
                  aria-label="outlined secondary button group"
                >
                  <Button
                    onClick={() => handleChangeType('DAY')}
                    sx={{ flexGrow: 1 }}
                  >
                    Hôm nay
                  </Button>
                  <Button
                    onClick={() => handleChangeType('MONTH')}
                    sx={{ flexGrow: 1 }}
                  >
                    Tháng
                  </Button>
                  <Button
                    onClick={() => handleChangeType('YEAR')}
                    sx={{ flexGrow: 1 }}
                  >
                    Năm
                  </Button>
                  <Button
                    onClick={() => handleChangeType('ALL')}
                    sx={{ flexGrow: 1 }}
                  >
                    Tất cả
                  </Button>
                </ButtonGroup>
                <Stack marginTop={1}>
                  <DateRange
                    onChange={(range) => setState([range.selection])}
                    ranges={state}
                    color="3944BC"
                    editableDateInputs
                    moveRangeOnFirstSelection={false}
                  />
                </Stack>
              </Stack>
            </Stack>
            <Stack sx={{ flexGrow: 1, height: '500px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={filterData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#82ca9d"
                    name="Tổng doanh thu"
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="Lợi nhuận"
                    stroke={Color.tertiary}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Stack>
          </Stack>
        </Stack>
      </Stack> */}
      <RevenueHistory data={historyData || []} />
    </Stack>
  );
}
