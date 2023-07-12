import { Stack, Typography, Box, TextField } from '@mui/material';
import { DatePicker, PickersDay } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import { useDispatchGetAllDayOfWeeks, useDispatchGetAllSlots } from '~/hooks';
import globalStyles from '~/styles';

dayjs.extend(weekOfYear);

interface Props {
  data: {
    id: number;
    link: string;
    className: string;
    slotId: number;
    dayOfWeekId: number;
    attendanceSlotId?: number;
    isPresent: boolean;
    date: string;
  }[];
}

interface DayOfWeekDataPayload {
  id: number;
  dayOfWeekName: string;
  day: string;
  slotIds: {
    id: number;
    slotName?: string;
    isPresent?: boolean;
    googleLink?: string;
    attendanceSlotId?: number;
    className?: string;
  }[];
}

export default function WeekSchedule({ data }: Props) {
  const [chooseDay, setChooseDay] = useState<Dayjs>(dayjs());
  const [dayOfWeekData, setDayOfWeekData] = useState<DayOfWeekDataPayload[]>(
    []
  );
  const { control } = useForm();
  const { dayOfWeeks } = useDispatchGetAllDayOfWeeks();
  const { slots } = useDispatchGetAllSlots();

  const handleChangeChooseDate = (value: any) => {
    setChooseDay(value);
  };

  useEffect(() => {
    setDayOfWeekData(
      dayOfWeeks.map((item, index) => ({
        id: item.id,
        day: `${chooseDay
          .set('date', chooseDay.get('date') - chooseDay.get('day') + index)
          .date()}`,
        dayOfWeekName: item.name,
        slotIds: slots.map((subItem) => ({ id: subItem.id })),
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayOfWeeks, slots]);

  useEffect(() => {
    const tmpDayOfWeek = [...dayOfWeekData];
    data.map((item) => {
      console.log('hello0', item.className);
      if (dayjs(item.date).week() === chooseDay.week()) {
        dayOfWeekData.map((subItem, dayOfWeekIndex) => {
          console.log('hello1', item.className);

          if (item.dayOfWeekId === subItem.id) {
            console.log('hello2', item.className);

            subItem.slotIds.map((slot, slotIndex) => {
              if (slot.id === item.slotId) {
                console.log('hello3', item.className, slot.id);

                const tmpTmpDayOfWeek = tmpDayOfWeek[dayOfWeekIndex];
                const finalSlot = slots.find(
                  (subSlot) => subSlot.id === slot.id
                );
                tmpTmpDayOfWeek.slotIds[slotIndex] = {
                  id: slot.id,
                  attendanceSlotId: item.attendanceSlotId,
                  googleLink: item.link,
                  isPresent: item.isPresent,
                  slotName: `${finalSlot?.startTime} - ${finalSlot?.endTime}`,
                  className: item.className,
                };
                setDayOfWeekData(tmpDayOfWeek);
              }
              return null;
            });
          }
          return null;
        });
      }
      return null;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chooseDay]);

  return (
    <Stack>
      <Stack sx={{ alignItems: 'flex-start' }}>
        <Box
          sx={{
            width: '300px',
            background: Color.white,
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
          flexDirection: 'row',
        }}
        marginTop={1}
      >
        <Stack
          sx={{
            width: '100px',
            justifyContent: 'space-around',
            marginTop: '60px',
          }}
        >
          {slots.map((item, index) => {
            return (
              <Stack
                sx={{
                  width: '100px',
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 2,
                }}
                key={index}
              >
                <Typography
                  sx={{
                    ...globalStyles.textSmallLabel,
                  }}
                >
                  {item.name.toUpperCase()}
                </Typography>
                <Typography
                  sx={{
                    ...globalStyles.textLowSmallLight,
                  }}
                >
                  {`${item.startTime} - ${item.endTime}`}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
        <Stack sx={{ flexDirection: 'row', flexGrow: 1 }}>
          {dayOfWeekData.map((item, index) => {
            return (
              <Stack
                sx={{
                  flex: 1,
                }}
                key={index}
              >
                <Stack
                  sx={{
                    height: '60px',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    sx={globalStyles.textLowSmallLight}
                  >{`${item.dayOfWeekName}`}</Typography>
                  <Typography sx={globalStyles.textSmallLabel}>
                    {`${item.day}`}
                  </Typography>
                </Stack>
                {item.slotIds.map((subItem, idx) => {
                  return (
                    <Stack
                      sx={{
                        border: '1px solid grey',
                        borderRadius: MetricSize.small_10,
                        height: '175px',
                      }}
                      key={idx}
                    >
                      {subItem.slotName && (
                        <Stack
                          sx={{
                            height: '100%',
                            margin: MetricSize.small_5,
                            padding: 2,
                            borderRadius: MetricSize.small_10,
                            background: `${Color.tertiary}33`,
                            justifyContent: 'space-between',
                          }}
                        >
                          <Stack>
                            <Typography
                              sx={{
                                color: Color.black,
                                fontSize: FontSize.small_18,
                                fontFamily: FontFamily.bold,
                              }}
                            >
                              PRJ123
                            </Typography>
                            <Typography
                              sx={{
                                color: Color.black,
                                fontSize: FontSize.small_14,
                                fontFamily: FontFamily.light,
                              }}
                            >
                              8AM - 9AM
                            </Typography>
                            <Typography
                              sx={{
                                color: Color.red,
                                fontSize: FontSize.small_14,
                                fontFamily: FontFamily.bold,
                              }}
                            >
                              Đã diểm danh
                            </Typography>
                          </Stack>
                          <Button
                            sx={{
                              fontSize: '10px',
                            }}
                            variant="contained"
                            color="primary"
                          >
                            Link Meet
                          </Button>
                          <Button
                            sx={{
                              marginTop: 1,
                              fontSize: '10px',
                            }}
                            size="small"
                            variant="contained"
                            color="secondary"
                          >
                            Điểm danh
                          </Button>
                        </Stack>
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
  );
}
