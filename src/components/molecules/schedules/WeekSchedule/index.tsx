import { Stack, Typography, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import { useDispatchGetAllDayOfWeeks, useDispatchGetAllSlots } from '~/hooks';
import globalStyles from '~/styles';

interface Props {
  data: {
    id: number;
    link: string;
    className: string;
    slotId: number;
    dayOfWeekId: number;
    isPresent: boolean;
    date: string;
  }[];
}

export default function WeekSchedule({ data }: Props) {
  const { control } = useForm();
  const { dayOfWeeks } = useDispatchGetAllDayOfWeeks();
  const { slots } = useDispatchGetAllSlots();

  return (
    <Stack>
      <Stack sx={{ alignItems: 'flex-start' }}>
        <Box
          sx={{
            width: '300px',
            background: Color.white,
          }}
        >
          <FormInput
            variant="dropdown"
            control={control}
            name="week"
            placeholder="Chọn tuần học"
            data={[
              {
                id: 0,
                label: '7/7/2023 - 14/7/2023',
                value: '0',
              },
            ]}
          />
        </Box>
      </Stack>
      <Stack
        sx={{
          padding: 3,
          background: Color.white,
          borderRadius: MetricSize.small_5,
        }}
        marginTop={1}
      >
        <Stack sx={{ flexDirection: 'row' }}>
          <Stack sx={{ flex: 3 }} />
          {dayOfWeeks.map((item, index) => {
            return (
              <Stack
                sx={{
                  flex: 4,
                  textAlign: 'center',
                  borderLeft: index !== 0 ? '1px solid #ddd' : 'none',
                  marginBottom: 2,
                }}
                key={index}
              >
                <Typography
                  sx={{
                    ...globalStyles.textLowSmallLight,
                    fontSize: '10px',
                  }}
                >
                  {item.name.toUpperCase()}
                </Typography>
                <Typography
                  sx={{
                    ...globalStyles.textSmallLabel,
                    fontSize: FontSize.small_18,
                  }}
                >
                  2
                </Typography>
              </Stack>
            );
          })}
        </Stack>
        {slots.map((item, index) => {
          return (
            <Stack key={index} sx={{ flexDirection: 'row' }}>
              <Stack
                sx={{
                  flex: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={globalStyles.textSmallLabel}
                >{`Slot ${item.id}`}</Typography>
                <Typography sx={globalStyles.textLowSmallLight}>
                  {`${item.startTime} - ${item.endTime}`}
                </Typography>
              </Stack>
              {dayOfWeeks.map((subItem, idx) => {
                return (
                  <Stack
                    sx={{
                      flex: 4,
                      border: '1px solid #ddd',
                      borderRadius: MetricSize.small_10,
                      height: undefined,
                      aspectRatio: 1,
                    }}
                    key={idx}
                  >
                    <Stack
                      sx={{
                        margin: MetricSize.small_5,
                        padding: 2,
                        borderRadius: MetricSize.small_10,
                        background: `${Color.tertiary}33`,
                        flex: 1,
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
                      <Button variant="contained" color="primary">
                        Meet
                      </Button>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
