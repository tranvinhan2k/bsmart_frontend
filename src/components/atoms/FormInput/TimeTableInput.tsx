import { UseControllerReturn, useForm } from 'react-hook-form';
import { Grid, FormHelperText } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {
  useDispatchGetAllDayOfWeeks,
  useDispatchGetAllSlots,
  useYupValidationResolver,
} from '~/hooks';
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
          scheduleItem.slot?.id === data.slot?.id &&
          scheduleItem.dayOfWeek?.id === data.dayOfWeek?.id
      )
    );
    if (!isExisted) {
      controllerOnChange([
        ...(value || []),
        {
          slot: data.slot,
          dayOfWeek: data.dayOfWeek,
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
          scheduleItem.slot?.id === item.slot?.id &&
          scheduleItem.dayOfWeek?.id === item.dayOfWeek?.id
        )
    );
    controllerOnChange(
      deletedItem.map((scheduleItem: any) => ({
        dayOfWeek: scheduleItem.dayOfWeek,
        slot: scheduleItem.slotId,
      }))
    );
  };

  const { optionSlots: slotOptions } = useDispatchGetAllSlots();
  const { optionDayOfWeeks: dayOfWeekOptions } = useDispatchGetAllDayOfWeeks();

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
                key={`${item.dayOfWeek?.id} ${item.slot?.id}`}
                marginY={1}
                padding={1}
              >
                <Typography
                  sx={{
                    fontSize: FontSize.small_18,
                    fontFamily: FontFamily.bold,
                  }}
                >
                  {item.dayOfWeek?.label}
                </Typography>
                <Typography>{item.slot?.label}</Typography>
                <IconButton onClick={() => handleDeleteItem(item)}>
                  <Icon name="close" size="small" color="black" />
                </IconButton>
              </Stack>
            );
          })}
      </Stack>
      <Grid container spacing={1}>
        <Grid item xs={12} md={5}>
          {slotOptions && (
            <FormInput
              variant="dropdown"
              name={TIME_TABLE_FIELDS.slot}
              control={timetableHookForm.control}
              data={slotOptions}
              placeholder="Khung giờ học"
            />
          )}
        </Grid>
        <Grid item xs={12} md={5}>
          {dayOfWeekOptions && (
            <FormInput
              variant="dropdown"
              name={TIME_TABLE_FIELDS.dayOfWeek}
              control={timetableHookForm.control}
              data={dayOfWeekOptions}
              placeholder="Ngày trong tuần"
            />
          )}
        </Grid>
        <Grid item xs={12} md={2}>
          <Stack>
            <Button
              onClick={timetableHookForm.handleSubmit(onSubmit)}
              variant="contained"
              color="secondary"
              sx={{ height: '36px' }}
            >
              <Icon name="add" color="white" size="small_20" />
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {invalid && <FormHelperText error>{`${error?.message}`}</FormHelperText>}
    </Stack>
  );
}
export default TimeTableInput;
