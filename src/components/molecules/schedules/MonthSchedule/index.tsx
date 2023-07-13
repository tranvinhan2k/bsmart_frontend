import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { PickersDay, StaticDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatchGetAllDayOfWeeks } from '~/hooks';
import styles from './styles';
import { OptionPayload } from '~/models';
import globalStyles from '~/styles';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import DayOfWeekCell from './DayOfWeekCell';

function getDaysOfMonth(monthIndex: number): ConfigTimeSlotPayload[] {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, monthIndex, 1);
  const lastDayOfMonth = new Date(currentYear, monthIndex + 1, 0);

  // Determine the start and end dates for the displayed calendar grid
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay()); // Start from previous Sunday

  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(endDate.getDate() + (6 - lastDayOfMonth.getDay())); // End at next Saturday

  const days: ConfigTimeSlotPayload[] = [];

  // Loop through each day within the calendar grid
  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const dayOfMonth = date.getDate();
    const isCurrentMonth = date >= firstDayOfMonth && date <= lastDayOfMonth;

    days.push({
      id: dayOfMonth,
      data: date,
      label: `${date.getDate()}`,
      isCurrentMonth,
      date: {
        d: date.getDate(),
        m: date.getMonth(),
        y: date.getFullYear(),
      },
    });
  }

  return days;
}

export interface TimeSlotPayload {
  id: number;
  date: Date;
  slots: OptionPayload[];
}

interface ConfigTimeSlotPayload {
  id: number;
  data: Date;
  label: string;
  isCurrentMonth: boolean;
  date: {
    d: number;
    m: number;
    y: number;
  };
}

interface Props {
  data: TimeSlotPayload[];
}

export default function MonthSchedule({ data }: Props) {
  const initMonth: ConfigTimeSlotPayload[] = getDaysOfMonth(
    new Date().getMonth()
  );

  const { dayOfWeeks } = useDispatchGetAllDayOfWeeks();
  const [dayOfMonths, setDayOfMonths] =
    useState<ConfigTimeSlotPayload[]>(initMonth);
  const [selectedDay, setSelectedDay] = useState<Dayjs | null>(dayjs());

  const handleChangeSelectedDay = (value: Dayjs | null) => {
    if (value) {
      setSelectedDay(value);
      const params = getDaysOfMonth(value.month());
      setDayOfMonths(params);
    }
  };

  const checkDayIsContainTimeSlot = (day: Dayjs) => {
    let result = false;
    data.map((item) => {
      if (
        day.get('date') === item.date.getDate() &&
        day.get('month') === item.date.getMonth() &&
        day.get('year') === item.date.getFullYear()
      ) {
        result = true;
      }
      return false;
    });
    return result;
  };

  console.log(data);

  if (!data) return null;

  return (
    <Stack sx={styles.view1}>
      <Stack sx={styles.view4}>
        <StaticDatePicker
          renderDay={(day, selected, prop) => {
            const isTimeSlot = checkDayIsContainTimeSlot(day);
            return (
              <PickersDay
                sx={{
                  transition: 'all 500ms ease',
                  background: isTimeSlot ? Color.tertiary : Color.transparent,
                  borderRadius: isTimeSlot ? MetricSize.small_5 : 1000,
                }}
                {...prop}
              >
                <Typography
                  sx={{
                    ...globalStyles.textLowSmallLight,
                    color:
                      isTimeSlot || prop.selected ? Color.white : Color.black,
                  }}
                >
                  {day.date()}
                </Typography>
              </PickersDay>
            );
          }}
          renderInput={() => <div />}
          onChange={handleChangeSelectedDay}
          value={selectedDay}
        />
      </Stack>
      <Stack
        sx={{
          flexGrow: 1,
          overflowX: 'auto',
        }}
      >
        <Stack sx={styles.view2}>
          {dayOfWeeks.map((item) => (
            <DayOfWeekCell key={item.id} name={item.name} />
          ))}
          <Stack
            sx={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              borderRight: '1px solid #ddd',
              borderBottom: '1px solid #ddd',
            }}
          >
            {dayOfMonths.map((item, index) => {
              let slots: OptionPayload[] = [];

              data.map((timeSlot) => {
                if (
                  item.date.d === timeSlot.date.getDate() &&
                  item.date.m === timeSlot.date.getMonth() &&
                  item.date.y === timeSlot.date.getFullYear()
                ) {
                  slots = timeSlot.slots;
                }
                return null;
              });

              const isTimeSlot = slots?.length !== 0;

              return (
                <Stack
                  sx={{
                    ...styles.view3,
                    // eslint-disable-next-line no-nested-ternary
                    background: item.isCurrentMonth
                      ? isTimeSlot
                        ? `${Color.tertiary}22`
                        : Color.white
                      : Color.white2,
                  }}
                  key={index}
                >
                  <Stack
                    sx={{
                      flex: 1,
                      borderLeft: '1px solid #ddd',
                      borderTop: '1px solid #ddd',

                      padding: 1,
                      color: item.isCurrentMonth ? 'black' : 'grey',
                      height: undefined,
                      aspectRatio: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: FontSize.small_14,
                        fontFamily: FontFamily.regular,
                      }}
                    >
                      {item.label}
                    </Typography>
                    {slots.length !== 0 &&
                      slots.map((subItem) => (
                        <Stack
                          key={subItem.id}
                          sx={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 1,
                          }}
                        >
                          <Stack
                            sx={{
                              width: '5px',
                              height: '5px',
                              borderRadius: 1000,
                              background: Color.tertiary,
                            }}
                          />
                          <Typography
                            sx={{
                              marginLeft: 1,
                              fontSize: '10px',
                              fontFamily: FontFamily.bold,
                            }}
                          >{`Slot ${subItem.id}`}</Typography>
                          <Typography
                            sx={{
                              marginLeft: 1,
                              fontSize: '10px',
                              fontFamily: FontFamily.light,
                            }}
                          >{` ${subItem.label}`}</Typography>
                        </Stack>
                      ))}
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
