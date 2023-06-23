import { useState } from 'react';
import { UseControllerReturn, useForm } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {
  useQueryGetAllDayInWeeks,
  useQueryGetAllSlots,
  useYupValidationResolver,
} from '~/hooks';
import { OptionPayload } from '~/models';
import { defaultValueTimetable } from '~/form/defaultValues';
import { validationSchemaTimeTable } from '~/form/validation';
// eslint-disable-next-line import/no-cycle
import FormInput from '.';
import { TIME_TABLE_FIELDS } from '~/form/schema';
import Button from '../Button';
import Icon from '../Icon';
import { Color, FontFamily, FontSize } from '~/assets/variables';
import toast from '~/utils/toast';

interface TimeTableInputProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}
function TimeTableInput({ controller, placeholder }: TimeTableInputProps) {
  const {
    field: { value, onChange: controllerOnChange, onBlur, ref },
    fieldState: { invalid, error },
  } = controller;
  const resolverTimeTable = useYupValidationResolver(validationSchemaTimeTable);
  const timetableHookForm = useForm({
    defaultValues: defaultValueTimetable,
    resolver: resolverTimeTable,
  });
  const onSubmit = (data: any) => {
    const isExisted = Boolean(
      value.find(
        (scheduleItem: any) =>
          scheduleItem.slot.id === data.slot.id &&
          scheduleItem.dayInWeek.id === data.dayInWeek.id
      )
    );
    if (!isExisted) {
      controllerOnChange([
        ...(value || []),
        {
          slot: data.slot,
          dayInWeek: data.dayInWeek,
        },
      ]);
      timetableHookForm.reset();
    } else {
      toast.notifyErrorToast(
        'Khung giờ này đã được chọn, hãy chọn khung giờ khác'
      );
    }
  };

  const handleDeleteItem = (item: any) => {
    const deletedItem = value.filter(
      (scheduleItem: any) =>
        !(
          scheduleItem.slot.id === item.slot.id &&
          scheduleItem.dayInWeek.id === item.dayInWeek.id
        )
    );
    controllerOnChange(
      deletedItem.map((scheduleItem: any) => ({
        dayInWeek: scheduleItem.dayInWeek,
        slot: scheduleItem.slotId,
      }))
    );
  };

  const { slots } = useQueryGetAllSlots();
  const { dayInWeeks } = useQueryGetAllDayInWeeks();
  const slotOptions: OptionPayload[] | undefined = slots?.map((slot) => ({
    id: slot.id,
    label: `${slot.startTime} - ${slot.endTime}`,
    value: `${slot.id}`,
  }));
  const dayInWeekOptions: OptionPayload[] | undefined = dayInWeeks?.map(
    (dayInWeek) => ({
      id: dayInWeek.id,
      label: dayInWeek.name,
      value: `${dayInWeek.id}`,
    })
  );
  return (
    <Stack>
      <Stack>
        {Array.isArray(value) &&
          value.map((item) => {
            return (
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: '5px',
                  background: Color.grey3,
                }}
                key={`${item.dayInWeek.id} ${item.slot.id}`}
                marginY={1}
                padding={1}
              >
                <Typography
                  sx={{
                    fontSize: FontSize.small_18,
                    fontFamily: FontFamily.bold,
                  }}
                >
                  {item.dayInWeek.label}
                </Typography>
                <Typography>{item.slot.label}</Typography>
                <IconButton onClick={() => handleDeleteItem(item)}>
                  <Icon name="close" size="small" color="black" />
                </IconButton>
              </Stack>
            );
          })}
      </Stack>
      <Grid container paddingBottom={2} spacing={1}>
        <Grid item xs={12} md={4}>
          {slots && (
            <FormInput
              variant="dropdown"
              name={TIME_TABLE_FIELDS.slot}
              control={timetableHookForm.control}
              data={slotOptions}
              placeholder="Khung giờ học"
            />
          )}
        </Grid>
        <Grid item md={4}>
          {dayInWeeks && (
            <FormInput
              variant="dropdown"
              name={TIME_TABLE_FIELDS.dayInWeek}
              control={timetableHookForm.control}
              data={dayInWeekOptions}
              placeholder="Ngày trong tuần"
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Stack
            sx={{
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Button
              onClick={timetableHookForm.handleSubmit(onSubmit)}
              customVariant="horizonForm"
            >
              Thêm giờ học
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
export default TimeTableInput;
