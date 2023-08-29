import { Box, Grid, Skeleton, Stack, Typography } from '@mui/material';
import Icon, { IconName } from '~/components/atoms/Icon';
import { ClassStatusList } from '~/constants';
import { useGetManagedClassDetails } from '~/hooks/class/useGetManagedClassDetails';
import { formatISODateStringToDisplayDate } from '~/utils/date';
import { formatMoney } from '~/utils/money';
import sx, {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_ITEM_LABEL,
  SX_FORM_LABEL,
} from './style';

interface DisplayListProps {
  id: number;
  iconName: IconName;
  label: string;
  value: string | number;
  size: number;
}

interface ClassDetailsBasicInfoProps {
  idClass: number;
  scrollRef: any;
}

export default function ClassDetailsBasicInfo({
  idClass,
  scrollRef,
}: ClassDetailsBasicInfoProps) {
  const { classDetails, isLoading } = useGetManagedClassDetails(idClass);

  const classStatusLabel = classDetails
    ? ClassStatusList.find((item) => item.value === classDetails.status)
        ?.label ?? ''
    : '';
  const classStatusDesc = classDetails
    ? ClassStatusList.find((item) => item.value === classDetails.status)
        ?.content ?? ''
    : '';

  const title0: DisplayListProps[] = [
    {
      id: 0,
      iconName: 'tagIcon',
      label: 'Mã lớp học',
      value: classDetails ? classDetails.code : '',
      size: 6,
    },
    {
      id: 3,
      iconName: 'tagIcon',
      label: 'Trạng thái',
      value: `${classStatusLabel} - ${classStatusDesc}`,
      size: 6,
    },
    {
      id: 1,
      iconName: 'calendarMonth',
      label: 'Ngày bắt đầu',
      value: classDetails
        ? formatISODateStringToDisplayDate(classDetails.startDate)
        : '',
      size: 6,
    },
    {
      id: 2,
      iconName: 'calendarMonth',
      label: 'Ngày kết thúc',
      value: classDetails
        ? formatISODateStringToDisplayDate(classDetails.endDate)
        : '',
      size: 6,
    },
    {
      id: 4,
      iconName: 'biMoney',
      label: 'Học phí',
      value: classDetails ? formatMoney(classDetails.price) : '',
      size: 6,
    },
    {
      id: 5,
      iconName: 'visibilityIcon',
      label: 'Số buổi',
      value: classDetails ? classDetails.numberOfSlot : '',
      size: 6,
    },
    {
      id: 6,
      iconName: 'groups',
      label: 'Học sinh tối thiếu',
      value: classDetails ? classDetails.minStudent : '',
      size: 6,
    },
    {
      id: 7,
      iconName: 'groups',
      label: 'Học sinh tối đa',
      value: classDetails ? classDetails.maxStudent : '',
      size: 6,
    },
    {
      id: 8,
      iconName: 'groups',
      label: 'Học sinh hiện tại',
      value: classDetails ? classDetails.numberOfCurrentStudent : '',
      size: 6,
    },
  ];

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER} ref={scrollRef}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>Thông tin cơ bản</Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={4}
          >
            <Grid container spacing={2}>
              {title0.map((display) => (
                <Grid item xs={display.size} key={display.id}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={1.5}
                  >
                    <Box>
                      <Icon name={display.iconName} size="small_20" />
                    </Box>
                    <Stack
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="stretch"
                      sx={{ width: '100%' }}
                    >
                      <Typography sx={SX_FORM_ITEM_LABEL}>
                        {display.label}
                      </Typography>
                      {isLoading ? (
                        <Skeleton />
                      ) : (
                        <Typography sx={sx.itemValue}>
                          {display.value}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
