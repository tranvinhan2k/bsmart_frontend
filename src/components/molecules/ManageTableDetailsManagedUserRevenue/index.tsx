import { CircularProgress, Grid, Stack, Typography } from '@mui/material';
import Icon, { IconName } from '~/components/atoms/Icon';
import { useGetManagedUserRevenue } from '~/hooks/transaction/useGetManagedUserRevenue';
import { formatMoney } from '~/utils/money';
import sx from './style';

interface DisplayListProps {
  id: number;
  iconName: IconName;
  label: string;
  value: string | number;
  size: number;
}

interface ManageTableDetailsManagedUserRevenueProps {
  rowId: number | undefined;
  userRole: 'TEACHER' | 'STUDENT';
}
export default function ManageTableDetailsManagedUserRevenue({
  rowId = 0,
  userRole,
}: ManageTableDetailsManagedUserRevenueProps) {
  const { managedUserRevenue, isLoading } = useGetManagedUserRevenue(rowId);

  const displayListMentor: DisplayListProps[] = [
    {
      id: 0,
      iconName: 'coPresent',
      label: 'Khóa học đã bán',
      value: managedUserRevenue ? managedUserRevenue.numOfCourse : 0,
      size: 6,
    },
    {
      id: 1,
      iconName: 'coPresent',
      label: 'Lớp học đã bán',
      value: managedUserRevenue ? managedUserRevenue.numOfClass : 0,
      size: 6,
    },
    {
      id: 2,
      iconName: 'visibilityIcon',
      label: 'Số học sinh',
      value: managedUserRevenue ? managedUserRevenue.numOfStudent : 0,
      size: 6,
    },
    {
      id: 3,
      iconName: 'promo',
      label: 'Tiền mã giới thiệu',
      value: managedUserRevenue ? managedUserRevenue.promotion : 0,
      size: 6,
    },
    {
      id: 4,
      iconName: 'biMoney',
      label: 'Doanh thu',
      value: managedUserRevenue ? formatMoney(managedUserRevenue.revenue) : 0,
      size: 6,
    },
    {
      id: 5,
      iconName: 'biMoney',
      label: 'Tiền nhận được từ người dùng',
      value: managedUserRevenue
        ? formatMoney(managedUserRevenue.systemIncome)
        : 0,
      size: 6,
    },
  ];
  const displayListStudent: DisplayListProps[] = [
    {
      id: 0,
      iconName: 'coPresent',
      label: 'Khóa họ đang có',
      value: managedUserRevenue ? managedUserRevenue.numOfCourse : 0,
      size: 6,
    },
    {
      id: 1,
      iconName: 'coPresent',
      label: 'Lớp học đang có',
      value: managedUserRevenue ? managedUserRevenue.numOfClass : 0,
      size: 6,
    },
    {
      id: 3,
      iconName: 'promo',
      label: 'Tiền mã giới thiệu',
      value: managedUserRevenue ? managedUserRevenue.promotion : 0,
      size: 6,
    },
    {
      id: 4,
      iconName: 'biMoney',
      label: 'Doanh thu',
      value: managedUserRevenue ? formatMoney(managedUserRevenue.revenue) : 0,
      size: 6,
    },
    {
      id: 5,
      iconName: 'biMoney',
      label: 'Tiền nhận được từ người dùng',
      value: managedUserRevenue
        ? formatMoney(managedUserRevenue.systemIncome)
        : 0,
      size: 6,
    },
  ];

  return (
    <>
      <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
        {userRole === 'TEACHER' && 'Doanh thu giảng viên'}
        {userRole === 'STUDENT' && 'Doanh thu học sinh'}
      </Typography>
      {isLoading ? (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          mt={2}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <Grid container>
          {userRole === 'TEACHER' &&
            displayListMentor.map((display) => (
              <Grid item xs={6} key={display.id}>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={1.5}
                  key={display.id}
                  mt={2}
                  p={1}
                >
                  <Icon name={display.iconName} size="small_20" />
                  <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Typography sx={sx.itemLabel}>{display.label}</Typography>
                    <Typography sx={sx.itemValue}>{display.value}</Typography>
                  </Stack>
                </Stack>
              </Grid>
            ))}
          {userRole === 'STUDENT' &&
            displayListStudent.map((display) => (
              <Grid item xs={6} key={display.id}>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={1.5}
                  key={display.id}
                  mt={2}
                  p={1}
                >
                  <Icon name={display.iconName} size="small_20" />
                  <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Typography sx={sx.itemLabel}>{display.label}</Typography>
                    <Typography sx={sx.itemValue}>{display.value}</Typography>
                  </Stack>
                </Stack>
              </Grid>
            ))}
        </Grid>
      )}
    </>
  );
}
