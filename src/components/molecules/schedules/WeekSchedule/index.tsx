import { Stack, Typography, Box, TextField, Tooltip } from '@mui/material';
import { DatePicker, PickersDay } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useNavigate } from 'react-router-dom';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import {
  useDispatchGetAllDayOfWeeks,
  useDispatchGetAllSlots,
  useGetIdFromUrl,
} from '~/hooks';
import globalStyles from '~/styles';
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
    isTakeAttendance: boolean;
  }[];
}

const handleGetWeekDays = () => {
  // Get the current date
  const currentDate = new Date();

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
  const navigate = useNavigate();

  const { dayOfWeeks, error: dayOfWeekError } = useDispatchGetAllDayOfWeeks();
  const { slots, error: slotError } = useDispatchGetAllSlots();

  const error = dayOfWeekError || slotError;

  const weekDay = handleGetWeekDays();

  const [chooseDay, setChooseDay] = useState<Dayjs>(dayjs());
  const [slotList, setSlotList] = useState<DayOfWeekDataPayload[]>([]);

  const handleChangeChooseDate = (value: any) => {
    setChooseDay(value);
  };

  useEffect(() => {
    if (data) {
      setSlotList(
        slots.map((item) => ({
          id: item.id,
          slotName: item.name,
          slotTime: `${item.startTime} - ${item.endTime}`,
          timeSlots: dayOfWeeks.map((subItem, index) => {
            const slotDate = weekDay[index];
            const subItemTimeSlot = data.find(
              (day) =>
                compareDate(new Date(day.date), slotDate) &&
                day.slotId === item.id
            );
            return {
              id: subItem.id,
              timetableId: 0,
              date: slotDate,
              slotName: subItemTimeSlot
                ? `${item.startTime} - ${item.endTime}`
                : '',
              className: `${subItemTimeSlot?.className}`,
              classId: subItemTimeSlot?.classId || 0,
              googleLink: `${subItemTimeSlot?.link}`,
              isPresent: subItemTimeSlot?.isPresent || false,
              isTakeAttendance: subItemTimeSlot?.isPresent || false,
            };
          }),
        }))
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots, dayOfWeeks, data]);

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
      <Stack
        sx={{
          padding: 3,
          background: Color.white,
          borderRadius: MetricSize.small_5,
          overflowX: 'auto',
        }}
        marginTop={1}
      >
        <Stack sx={{ flexDirection: 'row', marginLeft: '150px' }}>
          {dayOfWeeks.map((item) => (
            <DayName
              key={item.id}
              day={weekDay[item.id - 1].getDate()}
              dayOfWeek={item.name}
            />
          ))}
        </Stack>
        <LoadingWrapper error={error} isLoading={slotList.length === 0}>
          <Stack>
            {slotList.map((item, index) => {
              return (
                <Stack
                  sx={{
                    flexDirection: 'row',
                  }}
                  key={index}
                >
                  <SLotName name={item.slotName} time={item.slotTime} />

                  {item.timeSlots.map((subItem, idx) => {
                    return (
                      <Stack
                        sx={{
                          borderRight: '0.5px solid grey',
                          borderLeft: idx === 0 ? '0.5px solid grey' : 'none',
                          borderBottom:
                            index === slotList.length - 1
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
                                  color: subItem.isPresent
                                    ? Color.red
                                    : Color.green,
                                  fontSize: '14px',
                                  fontFamily: FontFamily.bold,
                                }}
                              >
                                {subItem.isPresent
                                  ? 'Đã điểm danh'
                                  : 'Chưa điểm danh'}
                              </Typography>
                            </Stack>
                            <Stack>
                              <Button
                                sx={{
                                  fontSize: '10px',
                                }}
                                onClick={() =>
                                  navigate(subItem.googleLink || '')
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
                                size="small"
                                variant="contained"
                                color="secondary"
                                onClick={() =>
                                  navigate(
                                    `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_class_detail}/${subItem.classId}/${MentorClassActionLink.take_attendance}/${subItem.id}`
                                  )
                                }
                              >
                                Điểm danh
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
        </LoadingWrapper>
      </Stack>
    </Stack>
  );
}
