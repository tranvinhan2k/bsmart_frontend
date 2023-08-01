import { Stack, Typography, Box, TextField } from '@mui/material';
import { DatePicker, PickersDay } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import { useDispatchGetAllDayOfWeeks, useDispatchGetAllSlots } from '~/hooks';
import { WeekTimeSlotPayload } from '~/models/type';
import SLotName from './SlotName';
import DayName from './DayName';
import { LoadingWrapper } from '~/HOCs';
import { compareDate } from '~/utils/date';
import {
  MentorClassActionLink,
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import { openUrl } from '~/utils/window';
import { selectProfile } from '~/redux/user/selector';

dayjs.extend(weekOfYear);

interface Props {
  data: WeekTimeSlotPayload[];
}

interface DayOfWeekDataPayload {
  id: number;
  slotName: string;
  slotTime: string;
  timeSlots: {
    id: number;
    timetableId: number;
    date: Date;
    slotName: string;
    className: string;
    classId: number;
    googleLink: string;
    isPresent: boolean;
    isTookAttendance: boolean;
  }[];
}

const handleGetWeekDays = (chooseDay: Dayjs) => {
  // Get the current date
  const currentDate = new Date(chooseDay.toISOString());

  // Get the current day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
  const currentDayOfWeek = currentDate.getDay();

  // Create an array to store the weekdays
  const weekdays: Date[] = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 7; i++) {
    const tmpDay = new Date(currentDate);
    tmpDay.setDate(currentDate.getDate() - currentDayOfWeek + i);
    weekdays.push(tmpDay);
  }

  return weekdays;
};

export default function WeekSchedule({ data }: Props) {
  const profile = useSelector(selectProfile);
  const role = profile.roles?.[0]?.code;
  const navigate = useNavigate();

  const { dayOfWeeks, error: dayOfWeekError } = useDispatchGetAllDayOfWeeks();
  const { slots, error: slotError } = useDispatchGetAllSlots();

  const error = dayOfWeekError || slotError;

  const [chooseDay, setChooseDay] = useState<Dayjs>(dayjs());

  const weekDay = handleGetWeekDays(chooseDay);

  const [slotList, setSlotList] = useState<DayOfWeekDataPayload[]>([]);

  const handleChangeChooseDate = (value: any) => {
    setChooseDay(value);
  };

  useEffect(() => {
    if (data) {
      setSlotList(
        slots?.map((item: any) => ({
          id: item.id,
          slotName: item.name,
          slotTime: `${item.startTime} - ${item.endTime}`,
          timeSlots: dayOfWeeks?.map((subItem, index) => {
            const slotDate = weekDay[index];
            const subItemTimeSlot = data.find(
              (day) =>
                compareDate(new Date(day.date), slotDate) &&
                day.slotId === item.id
            );
            return {
              id: subItem.id,
              timetableId: subItemTimeSlot?.id || 0,
              date: slotDate,
              slotName: subItemTimeSlot
                ? `${item.startTime} - ${item.endTime}`
                : '',
              className: `${subItemTimeSlot?.className}`,
              classId: subItemTimeSlot?.classId || 0,
              googleLink: `${subItemTimeSlot?.link}`,
              isPresent: subItemTimeSlot?.isPresent || false,
              isTookAttendance: subItemTimeSlot?.isTookAttendance || false,
            };
          }),
        }))
      );
    }
  }, [slots, dayOfWeeks, data, chooseDay, weekDay]);

  return (
    <Stack>
      <Stack sx={{ alignItems: 'flex-start' }}>
        <Box
          sx={{
            width: '300px',
          }}
        >
          <DatePicker
            label="Chọn tuần học"
            renderInput={(props) => {
              return <TextField {...props} />;
            }}
            renderDay={(day, selected, props) => {
              const isSelected = chooseDay.week() === day.week();
              return (
                <PickersDay
                  sx={{
                    color: !isSelected ? 'black' : 'white',
                    background: !isSelected ? 'white' : Color.navy,
                    borderRadius: MetricSize.small_5,
                  }}
                  {...props}
                />
              );
            }}
            onChange={handleChangeChooseDate}
            value={chooseDay}
          />
        </Box>
      </Stack>
      <LoadingWrapper error={error} isLoading={slotList?.length === 0}>
        <Stack
          sx={{
            padding: 3,
            background: Color.white,
            borderRadius: MetricSize.small_5,
            overflowX: 'auto',
          }}
          marginTop={1}
        >
          <Stack
            sx={{
              minWidth: '1200px',
            }}
          >
            <Stack
              sx={{
                flexDirection: 'row',
                marginLeft: { xs: '80px', md: '150px' },
              }}
            >
              {dayOfWeeks?.map((item) => (
                <DayName
                  key={item.id}
                  day={weekDay[item.id - 1].getDate()}
                  dayOfWeek={item.name}
                />
              ))}
            </Stack>
            <Stack>
              {slotList?.map((item, index) => {
                return (
                  <Stack
                    sx={{
                      flexDirection: 'row',
                    }}
                    key={index}
                  >
                    <SLotName name={item.slotName} time={item.slotTime} />

                    {item.timeSlots?.map((subItem, idx) => {
                      return (
                        <Stack
                          sx={{
                            borderRight: '0.5px solid grey',
                            borderLeft: idx === 0 ? '0.5px solid grey' : 'none',
                            borderBottom:
                              index === slotList?.length || 0 - 1
                                ? '0.5px solid grey'
                                : 'none',
                            borderTop: '0.5px solid grey',
                            minHeight: '30px',
                            flex: 1,
                            flexGrow: 1,
                          }}
                          key={idx}
                        >
                          {subItem.slotName !== '' ? (
                            <Stack
                              sx={{
                                margin: MetricSize.small_5,
                                padding: 2,
                                background: `${Color.tertiary}33`,
                                justifyContent: 'space-between',
                              }}
                            >
                              <Stack>
                                <Typography
                                  sx={{
                                    color: Color.black,
                                    fontSize: FontSize.small_14,
                                    fontFamily: FontFamily.bold,
                                  }}
                                >
                                  {subItem.className?.toUpperCase()}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: Color.black,
                                    fontSize: FontSize.small_14,
                                    fontFamily: FontFamily.light,
                                  }}
                                >
                                  {subItem.slotName}
                                </Typography>
                                <Typography
                                  sx={{
                                    // eslint-disable-next-line no-nested-ternary
                                    color: subItem.isTookAttendance
                                      ? subItem.isPresent
                                        ? Color.green
                                        : Color.grey
                                      : Color.grey,
                                    fontSize: '14px',
                                    fontFamily: FontFamily.bold,
                                  }}
                                >
                                  {
                                    // eslint-disable-next-line no-nested-ternary
                                    subItem.isTookAttendance
                                      ? // eslint-disable-next-line no-nested-ternary
                                        role === 'TEACHER'
                                        ? 'Đã điểm danh'
                                        : subItem.isPresent
                                        ? 'Có mặt'
                                        : 'Vắng'
                                      : 'Chưa điểm danh'
                                  }
                                </Typography>
                              </Stack>
                              <Stack>
                                <Button
                                  disabled={
                                    !compareDate(
                                      new Date(),
                                      new Date(subItem.date)
                                    )
                                  }
                                  sx={{
                                    fontSize: '10px',
                                  }}
                                  onClick={() =>
                                    openUrl(subItem.googleLink || '')
                                  }
                                  variant="contained"
                                  color="primary"
                                >
                                  Link Meet
                                </Button>
                                <Button
                                  sx={{
                                    marginTop: 1,
                                    fontSize: '10px',
                                    color: Color.white,
                                  }}
                                  disabled={
                                    new Date().getTime() <
                                    new Date(subItem.date).getTime()
                                  }
                                  size="small"
                                  variant="contained"
                                  color={
                                    subItem.isTookAttendance
                                      ? 'secondary'
                                      : 'warning'
                                  }
                                  onClick={() =>
                                    navigate(
                                      `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_class_detail}/${subItem.classId}/${MentorClassActionLink.take_attendance}/${subItem.timetableId}`
                                    )
                                  }
                                >
                                  {subItem.isTookAttendance
                                    ? 'Đã điểm danh'
                                    : 'Điểm danh'}
                                </Button>
                              </Stack>
                            </Stack>
                          ) : (
                            ''
                          )}
                        </Stack>
                      );
                    })}
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </LoadingWrapper>
    </Stack>
  );
}
