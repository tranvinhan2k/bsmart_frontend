import {
  Button,
  ButtonGroup,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, StaticDatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import React, { useState, PureComponent } from 'react';
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
import { formatISODateDateToDisplayDate } from '~/utils/date';

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
}

function getVietnameseMonthName(date: Date): string {
  const vietnameseMonths = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ];
  return vietnameseMonths[date.getMonth()];
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
      };
    }

    yearData[yearName].total += item.total;
    yearData[yearName].revenue += item.revenue;
  }

  return Object.values(yearData);
}

function getVietnameseDayName(date: Date): string {
  const day = date.getDate();
  return `Ngày ${formatISODateDateToDisplayDate(date)}`;
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
      };
    }

    dayData[dayName].total += item.total;
    dayData[dayName].revenue += item.revenue;
  }

  return Object.values(dayData);
}

const convertRevenue = (
  data: RevenuePayload[],
  type: 'DAY' | 'MONTH' | 'YEAR'
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
  const [date, setDate] = useState<Dayjs | null | undefined>();
  const [type, setType] = useState<'DAY' | 'MONTH' | 'YEAR'>('DAY');

  const filterData = convertRevenue(data, type).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <Stack>
      <Typography sx={globalStyles.textSubTitle}>Thống kê doanh thu</Typography>
      <Stack marginTop={1}>
        <Stack sx={{ flexDirection: 'row', width: '100%', height: '100%' }}>
          <Stack
            sx={{
              borderRadius: '12px',
            }}
          >
            <ButtonGroup
              sx={{ width: '100%' }}
              variant="contained"
              aria-label="outlined secondary button group"
            >
              <Button onClick={() => setType('DAY')} sx={{ flexGrow: 1 }}>
                Ngày
              </Button>
              <Button onClick={() => setType('MONTH')} sx={{ flexGrow: 1 }}>
                Tháng
              </Button>
              <Button onClick={() => setType('YEAR')} sx={{ flexGrow: 1 }}>
                Năm
              </Button>
            </ButtonGroup>
            <Stack
              sx={{
                '.MuiPickersToolbar-root': {
                  display: 'none',
                },
                '.MuiDialogActions-root': {
                  display: 'none',
                },
                '.MuiPickerStaticWrapper-content': {
                  background: Color.transparent,
                },
              }}
            >
              <StaticDatePicker
                value={date}
                onChange={(value) => setDate(value)}
                renderInput={(props) => <TextField {...props} />}
              />
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
                <Line type="monotone" dataKey="total" stroke="#82ca9d" />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke={Color.tertiary}
                />
              </LineChart>
            </ResponsiveContainer>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
