import { Stack, Typography, Box, TextField, Tooltip } from '@mui/material';
import { DatePicker, PickersDay } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useNavigate } from 'react-router-dom';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import { useDispatchGetAllDayOfWeeks, useDispatchGetAllSlots } from '~/hooks';
import globalStyles from '~/styles';
import { WeekTimeSlotPayload } from '~/models/type';

dayjs.extend(weekOfYear);

interface Props {
  data: WeekTimeSlotPayload[];
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
  const navigate = useNavigate();
  const [chooseDay, setChooseDay] = useState<Dayjs>(dayjs());
  const [dayOfWeekData, setDayOfWeekData] = useState<DayOfWeekDataPayload[]>(
    []
  );
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
  }, [dayOfWeeks, slots, chooseDay]);

  useEffect(() => {
    const tmpDayOfWeek = [...dayOfWeekData];
    data.map((item) => {
      if (dayjs(item.date).week() === chooseDay.week()) {
        dayOfWeekData.map((subItem, dayOfWeekIndex) => {
          if (item.dayOfWeekId === subItem.id) {
            subItem.slotIds.map((slot, slotIndex) => {
              if (slot.id === item.slotId) {
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
  }, [chooseDay, dayOfWeekData]);

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
          flexDirection: 'row',
          overflowX: 'auto',
        }}
        marginTop={1}
      >
        <Stack
          sx={{
            width: '80px',
            justifyContent: 'space-around',
            marginTop: '60px',
          }}
        >
          {slots.map((item, index) => {
            return (
              <Stack
                sx={{
                  textAlign: 'center',
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                }}
                key={index}
              >
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontFamily: FontFamily.regular,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FontFamily.bold,
                    }}
                  >
                    {item.name.toUpperCase()}
                  </span>
                  {/* {` ${item.startTime} - ${item.endTime}`} */}
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
                        borderRight: '0.5px solid grey',
                        borderLeft: index === 0 ? '0.5px solid grey' : 'none',
                        borderBottom:
                          idx === item.slotIds.length - 1
                            ? '0.5px solid grey'
                            : 'none',
                        borderTop: '0.5px solid grey',
                        minHeight: '30px',
                        minWidth: '150px',
                      }}
                      key={idx}
                    >
                      {subItem.slotName && (
                        <Stack
                          sx={{
                            margin: MetricSize.small_5,
                            padding: 2,
                            flex: 1,
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
                              onClick={() => navigate(subItem.googleLink || '')}
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
                            >
                              Điểm danh
                            </Button>
                          </Stack>
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
